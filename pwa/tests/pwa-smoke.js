/* End-to-end PWA, offline, persistence, and guarded-restore proof. */
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const DIST = path.join(ROOT, "dist");
const results = [];
function check(name, ok, detail) {
  results.push((ok ? "PASS" : "FAIL") + "  " + name + (detail ? "  (" + detail + ")" : ""));
  if (!ok) process.exitCode = 1;
}
function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".webmanifest")) return "application/manifest+json";
  if (file.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}
function launchOptions() {
  const candidates = [
    "/opt/pw-browsers/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  ];
  const executablePath = candidates.find((candidate) => fs.existsSync(candidate));
  return executablePath ? { executablePath } : {};
}

(async () => {
  execFileSync("bash", [path.join(ROOT, "scripts", "build-guild-pwa.sh")], { cwd: ROOT, stdio: "pipe" });
  check("build output is byte-identical to canonical HTML", fs.readFileSync(path.join(DIST, "index.html")).equals(fs.readFileSync(path.join(ROOT, "playbooks", "guild-command-center.html"))));

  const manifest = JSON.parse(fs.readFileSync(path.join(DIST, "manifest.webmanifest"), "utf8"));
  check("manifest names the Guild Command Center", manifest.name === "Guild Command Center" && manifest.short_name === "Guild");
  check("manifest launches standalone at root", manifest.display === "standalone" && manifest.start_url === "/" && manifest.scope === "/");
  check("manifest has 192, 512, and maskable icons", manifest.icons.some((i) => i.sizes === "192x192") && manifest.icons.some((i) => i.sizes === "512x512" && i.purpose === "any") && manifest.icons.some((i) => i.purpose === "maskable"));
  for (const icon of manifest.icons) check("manifest icon exists: " + icon.src, fs.existsSync(path.join(DIST, icon.src.replace(/^\//, ""))));
  const headers = fs.readFileSync(path.join(DIST, "_headers"), "utf8");
  check("deployment headers deny framing and external connections", headers.includes("X-Frame-Options: DENY") && headers.includes("connect-src 'self'") && headers.includes("frame-ancestors 'none'"));
  check("service worker and HTML use no-cache release headers", headers.includes("/sw.js") && headers.includes("no-cache, no-store, must-revalidate"));

  const server = http.createServer((req, res) => {
    const rawPath = new URL(req.url, "http://localhost").pathname;
    const relative = rawPath === "/" ? "index.html" : decodeURIComponent(rawPath.replace(/^\/+/, ""));
    const file = path.resolve(DIST, relative);
    if (!file.startsWith(DIST + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end("not found"); return;
    }
    res.writeHead(200, { "Content-Type": contentType(file), "Cache-Control": "no-cache" });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch(launchOptions());
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const external = [];
  page.on("request", (request) => { if (!request.url().startsWith(origin)) external.push(request.url()); });
  await page.goto(origin, { waitUntil: "networkidle" });
  check("live app links its manifest", await page.locator('link[rel="manifest"]').getAttribute("href") === "manifest.webmanifest");
  check("live app exposes install guidance", await page.locator("#installBtn").count() === 1 && (await page.locator("#installHelp").textContent()).includes("Add to Home Screen"));
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 10000 });
  check("service worker controls the live app", await page.evaluate(() => !!navigator.serviceWorker.controller));
  check("offline-ready state is visible", await page.locator("#installDot").evaluate((el) => el.classList.contains("ready")));

  const validCSV = [
    "door_number,timestamp,business_name,trade,price_cohort,owner_present,demo_shown,demo_result,outcome,sit_down_booked,objection_element,notes,callback_date",
    '1,2026-08-09 10:00,"<img src=x onerror=window.pwned=1>",plumber,$497,yes,yes,absent,callback set,yes,water,"line one,\nline two",2026-08-12',
    "2,2026-08-09 10:10,Second Shop,hvac,$997,not applicable,no,not run,no answer,no,unread,,"
  ].join("\r\n") + "\r\n";
  await page.click('#tabbar button[data-view="log"]');
  await page.setInputFiles("#importFile", { name: "backup.csv", mimeType: "text/csv", buffer: Buffer.from(validCSV) });
  await page.waitForFunction(() => document.getElementById("restorePanel").classList.contains("show"));
  check("valid restore is previewed before mutation", (await page.locator("#restoreSummary").textContent()).includes("2 validated doors") && (await page.locator("#topProgress").textContent()) === "0 / 20");
  await page.click("#restoreConfirm");
  check("confirmed restore replaces the working log", (await page.locator("#topProgress").textContent()) === "2 / 20");
  await page.click('#tabbar button[data-view="results"]');
  check("restored business text cannot inject HTML", await page.locator("#callbackCard img").count() === 0 && await page.evaluate(() => !window.pwned));

  await page.click('#tabbar button[data-view="log"]');
  const duplicateCSV = validCSV.replace("2,2026-08-09", "1,2026-08-09");
  await page.setInputFiles("#importFile", { name: "duplicate.csv", mimeType: "text/csv", buffer: Buffer.from(duplicateCSV) });
  await page.waitForFunction(() => document.getElementById("msg").textContent.includes("Restore blocked"));
  check("duplicate restore is rejected without changing data", (await page.locator("#msg").textContent()).includes("appears more than once") && (await page.locator("#topProgress").textContent()) === "2 / 20");
  const wrongCohortCSV = validCSV.replace("Second Shop,hvac,$997", "Second Shop,hvac,$497");
  await page.setInputFiles("#importFile", { name: "wrong-cohort.csv", mimeType: "text/csv", buffer: Buffer.from(wrongCohortCSV) });
  await page.waitForFunction(() => document.getElementById("msg").textContent.includes("wrong locked price cohort"));
  check("wrong locked cohort is rejected", (await page.locator("#topProgress").textContent()) === "2 / 20");

  await page.close();
  const reopened = await context.newPage();
  await reopened.goto(origin, { waitUntil: "networkidle" });
  check("data persists after app close and reopen", (await reopened.locator("#topProgress").textContent()) === "2 / 20");
  await context.setOffline(true);
  await reopened.reload({ waitUntil: "domcontentloaded" });
  check("app reopens offline with data intact", (await reopened.title()) === "Guild Command Center" && (await reopened.locator("#topProgress").textContent()) === "2 / 20");
  check("offline state is visible", (await reopened.locator("#installStatus").textContent()).includes("Offline"));
  check("live app made zero external requests", external.length === 0, external.join(", ") || "none");

  await context.close();
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  console.log(results.join("\n"));
  console.log(results.filter((r) => r.startsWith("FAIL")).length + " failures / " + results.length + " checks");
})().catch((error) => {
  console.error("PWA SMOKE CRASH:", error);
  process.exit(1);
});

