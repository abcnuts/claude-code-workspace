/*
 * Behavioral smoke suite for playbooks/guild-command-center.html
 *
 * Run:  npm install playwright   (Chromium required; uses /opt/pw-browsers/chromium
 *       when present, otherwise Playwright's own browser)
 *       node playbooks/tests/command-center-smoke.js
 *
 * Proves: view navigation (incl. client presentation mode), zero external
 * requests, no horizontal overflow at 390px and desktop, the full field-log
 * integrity contract (doors 1-20 unique, duplicate/out-of-range/21st-entry
 * rejection, completion lock, derived cohorts, demo-consistency locks, draft
 * + reload persistence, escaped CSV, typed-RESET gate), the owner_present /
 * sit_down_booked schema with its truth cascades, legacy-entry migration,
 * the RESULTS denominator (demos among answered owner-present conversations),
 * partial-run INVALID, both 20-door gate verdicts, client-view honesty copy,
 * tier mapping, and a customer-facing guarantee-language scan.
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const FILE = "file://" + path.resolve(__dirname, "..", "guild-command-center.html");
const CHROMIUM = "/opt/pw-browsers/chromium";
const results = [];
function check(name, ok, detail) {
  results.push((ok ? "PASS" : "FAIL") + "  " + name + (detail ? "  (" + detail + ")" : ""));
  if (!ok) process.exitCode = 1;
}

function entry(door, over) {
  const base = {
    door_number: door, timestamp: "2026-08-10 09:00", business_name: "Biz " + door,
    trade: "hvac", price_cohort: door % 2 === 1 ? "$497" : "$997",
    owner_present: "yes", demo_shown: "yes", demo_result: "absent",
    outcome: "soft no", sit_down_booked: "no", objection_element: "water",
    notes: "", callback_date: ""
  };
  return Object.assign(base, over || {});
}
function noAnswer(door) {
  return entry(door, { owner_present: "not applicable", demo_shown: "no", demo_result: "not run", outcome: "no answer", sit_down_booked: "no", objection_element: "unread" });
}
async function seed(page, entries) {
  await page.evaluate((data) => {
    localStorage.setItem("lehi-field-log-v1", JSON.stringify(data));
    localStorage.removeItem("lehi-field-log-draft-v1");
  }, entries);
  await page.reload();
}
async function nav(page, view) { await page.click(`#tabbar button[data-view="${view}"]`); }

async function saveDoor(page, o) {
  if (o.door != null) await page.fill("#door", String(o.door));
  await page.selectOption("#trade", o.trade || "plumber");
  if (o.biz) await page.fill("#biz", o.biz);
  await page.click(`#outcome button[data-v="${o.outcome || "soft no"}"]`);
  if ((o.outcome || "soft no") !== "no answer") {
    await page.click(`#ownerPresent button[data-v="${o.owner || "yes"}"]`);
    await page.click(`#demoShown button[data-v="${o.demoShown || "yes"}"]`);
    if ((o.demoShown || "yes") === "yes") await page.click(`#demoResult button[data-v="${o.demoResult || "absent"}"]`);
    await page.click(`#sitDown button[data-v="${o.sit || "no"}"]`);
  }
  await page.click(`#element button[data-v="${o.element || "water"}"]`);
  if (o.notes) await page.fill("#notes", o.notes);
  if (o.cb) await page.fill("#cb", o.cb);
  await page.click("#saveBtn");
}

(async () => {
  const launchOpts = fs.existsSync(CHROMIUM) ? { executablePath: CHROMIUM } : {};
  const browser = await chromium.launch(launchOpts);

  /* ================= MOBILE (390px) — full suite ================= */
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const external = [];
  page.on("request", (r) => { if (!r.url().startsWith("file://")) external.push(r.url()); });
  await page.goto(FILE);
  check("m: page loads with title", (await page.title()) === "Guild Command Center");

  // ---- Top status + navigation ----
  for (const id of ["topProgress","topPhase","nextMoveBtn","tabbar"]) {
    check("m: #" + id + " present", await page.locator("#" + id).count() === 1);
  }
  check("m: starts on COMMAND", await page.locator("#view-command").evaluate(v => v.classList.contains("on")));
  check("m: phase pill starts Prepare", (await page.locator("#topPhase").textContent()) === "Prepare");
  check("m: next move says START DOOR 1", (await page.locator("#nextMoveBtn").textContent()).includes("START DOOR 1"));
  check("m: COMMAND marks Prepare as current", await page.locator('.phase[data-phase="0"] .youarehere').count() === 1);
  check("m: post-close chips labeled later", (await page.locator(".chip.later").count()) === 3);

  for (const v of ["workflow","log","results","command"]) {
    await nav(page, v);
    check("m: nav to " + v.toUpperCase(), await page.locator("#view-" + v).evaluate(el => el.classList.contains("on")));
  }
  check("m: no page navigation occurred", page.url().startsWith("file://"));

  // NEXT MOVE routes to LOG when incomplete
  await page.click("#nextMoveBtn");
  check("m: NEXT MOVE routes to LOG", await page.locator("#view-log").evaluate(v => v.classList.contains("on")));

  // ---- CLIENT presentation mode ----
  await nav(page, "client");
  check("m: client view on", await page.locator("#view-client").evaluate(v => v.classList.contains("on")));
  check("m: client mode hides tabbar", await page.locator("#tabbar").evaluate(t => getComputedStyle(t).display === "none"));
  check("m: client mode hides topbar", await page.locator(".topbar").evaluate(t => getComputedStyle(t).display === "none"));
  check("m: client price maps door 1 → $497", (await page.locator("#cPrice").textContent()).includes("$497"));
  await page.selectOption("#cTrade", "pest control company");
  await page.fill("#cTown", "Lehi, Utah");
  await page.click("#cNext0");
  check("m: prompt uses trade + town", (await page.locator("#cPrompt").textContent()) === "Who should I call for a pest control company in Lehi, Utah?");
  await page.click("#cCopy");
  const copyFeedback = await page.waitForFunction(
    () => (document.getElementById("cCopyMsg").textContent || "").length > 0, null, { timeout: 5000 }
  ).then(() => true, () => false);
  check("m: copy gives feedback", copyFeedback);
  await page.click("#cNext1");
  await page.click("#cAbsent");
  const absentText = await page.locator("#cInterpBody").textContent();
  check("m: ABSENT copy says one answer proves nothing", absentText.includes("one flip of the coin") && absentText.includes("doesn't prove"));
  await page.click("#cBack3");
  await page.click("#cPresent");
  const presentText = await page.locator("#cInterpBody").textContent();
  check("m: PRESENT copy warns it doesn't always", presentText.includes("doesn't always") && presentText.includes("never proves"));
  await page.click("#cNext3"); await page.click("#cNext4");
  check("m: $497 tier lists 4 inclusions", (await page.locator("#cIncludes li").count()) === 4);
  check("m: honest line present on offer card", (await page.locator(".honest-foot").textContent()).includes("guarantee the work"));
  check("m: no cohort/experiment language in client view", !/cohort|experiment|odd door|even door/i.test(await page.locator("#view-client").innerText()));
  await page.click("#clientExit");
  check("m: client exit returns to operator", await page.locator("#view-command").evaluate(v => v.classList.contains("on")));

  // ---- Customer-facing copy scan (guarantee violations) ----
  const clientCopy = await page.locator("#view-client").innerText();
  const scrubbed = clientCopy.replace(/Anyone who guarantees a ranking is lying to you\. I guarantee the work[^"]*"/g, "");
  check("m: client copy has no guarantee violations",
    !/(we (?:will |’ll |'ll )?make (?:the )?AI|guarantee[sd]? (?:a |your )?(?:rank|placement|score|result|spot)|you will (?:show up|appear|rank)|#1 in ChatGPT)/i.test(scrubbed));

  // ---- LOG: structure ----
  await nav(page, "log");
  for (const id of ["door","trade","biz","notes","cb","cohortDisplay","outcome","ownerPresent","demoShown","demoResult","sitDown","element","saveBtn","exportBtn","resetBtn","resetConfirm","completeBanner"]) {
    check("m: log #" + id + " present", await page.locator("#" + id).count() === 1);
  }
  check("m: trades include wave-one set", (await page.locator("#trade option").allTextContents()).join("|").includes("sprinkler"));
  check("m: door bounded 1-20 in markup", await page.locator('#door[min="1"][max="20"]').count() === 1);
  check("m: no manual cohort control", (await page.locator("#cohortDisplay button").count()) === 0);
  check("m: door 1 derives $497", (await page.locator("#cohortDisplay").textContent()).includes("$497"));
  await page.fill("#door", "2");
  check("m: door 2 derives $997", (await page.locator("#cohortDisplay").textContent()).includes("$997"));
  await page.fill("#door", "1");

  // ---- Cascades ----
  check("m: owner N/A disabled by default", await page.locator('#ownerPresent button[data-v="not applicable"]').isDisabled());
  check("m: demo result locked before demoShown", await page.locator('#demoResult button[data-v="present"]').isDisabled());
  await page.click('#outcome button[data-v="no answer"]');
  check("m: no-answer forces owner N/A", await page.locator('#ownerPresent button[data-v="not applicable"]').evaluate(b => b.classList.contains("on")));
  check("m: no-answer locks owner group", await page.locator('#ownerPresent button[data-v="yes"]').isDisabled());
  check("m: no-answer forces demo no", await page.locator('#demoShown button[data-v="no"]').evaluate(b => b.classList.contains("on")));
  check("m: no-answer forces not run", await page.locator('#demoResult button[data-v="not run"]').evaluate(b => b.classList.contains("on")));
  check("m: no-answer forces sit no", await page.locator('#sitDown button[data-v="no"]').evaluate(b => b.classList.contains("on")));
  check("m: no-answer locks sit group", await page.locator('#sitDown button[data-v="yes"]').isDisabled());
  await page.click('#outcome button[data-v="soft no"]');
  check("m: leaving no-answer unlocks owner", !(await page.locator('#ownerPresent button[data-v="yes"]').isDisabled()));
  check("m: leaving no-answer clears owner N/A", await page.locator('#ownerPresent button[data-v="not applicable"]').evaluate(b => !b.classList.contains("on")));
  check("m: leaving no-answer unlocks sit", !(await page.locator('#sitDown button[data-v="yes"]').isDisabled()));
  await page.click('#demoShown button[data-v="no"]');
  check("m: demo=no forces not run", await page.locator('#demoResult button[data-v="not run"]').evaluate(b => b.classList.contains("on")));
  check("m: demo=no locks present", await page.locator('#demoResult button[data-v="present"]').isDisabled());
  await page.click('#demoShown button[data-v="yes"]');
  check("m: switch to yes clears not-run", await page.locator('#demoResult button[data-v="not run"]').evaluate(b => !b.classList.contains("on")));
  check("m: yes disables not-run", await page.locator('#demoResult button[data-v="not run"]').isDisabled());

  // ---- Validation guards ----
  await page.click('#ownerPresent button[data-v="yes"]');
  await page.click('#outcome button[data-v="soft no"]');
  await page.selectOption("#trade", "plumber");
  await page.click('#element button[data-v="water"]');
  await page.click("#saveBtn"); // demo=yes but no result picked
  check("m: yes without result rejected", (await page.locator(".msg.err").textContent()).includes("Present or Absent"));
  await page.click('#demoResult button[data-v="absent"]');
  await page.click("#saveBtn"); // sit-down not picked
  check("m: missing sit-down rejected", (await page.locator(".msg.err").textContent()).includes("Sit-down"));
  await page.fill("#door", "0");
  await page.click('#sitDown button[data-v="no"]');
  await page.click("#saveBtn");
  check("m: door 0 rejected", (await page.locator(".msg.err").textContent()).includes("1–20"));
  await page.fill("#door", "21");
  await page.click("#saveBtn");
  check("m: door 21 rejected", (await page.locator(".msg.err").textContent()).includes("1–20"));
  check("m: no entries after rejects", (await page.locator("#barLabel").textContent()).trim() === "0 / 20 doors");

  // ---- Valid save with CSV-hostile text ----
  await page.fill("#door", "1");
  await page.fill("#biz", 'Joe\'s "Plumbing", LLC');
  await page.fill("#notes", 'said "another door guy",\nburned by SEO before');
  await page.fill("#cb", "2026-08-12");
  await page.click("#saveBtn");
  check("m: door 1 saved", (await page.locator(".msg.ok").textContent()).includes("Door 1 saved"));
  check("m: progress 1/20", (await page.locator("#barLabel").textContent()).trim() === "1 / 20 doors");
  check("m: tally $497:1", (await page.locator("#cohorts").textContent()).includes("$497: 1"));
  check("m: door auto-advances to 2", (await page.inputValue("#door")) === "2");
  check("m: entry shows owner + sit in meta", (await page.locator(".entry .meta").first().textContent()).includes("owner yes"));
  check("m: top progress updates", (await page.locator("#topProgress").textContent()) === "1 / 20");

  // ---- Duplicate ----
  await saveDoor(page, { door: 1, outcome: "no answer", element: "unread" });
  check("m: duplicate door 1 rejected", (await page.locator(".msg.err").textContent()).includes("already logged"));

  // ---- Shared data: RESULTS + CLIENT see the same store ----
  await nav(page, "results");
  check("m: RESULTS counts the saved door", (await page.locator("#statGrid").textContent()).includes("1"));
  check("m: RESULTS gate incomplete", (await page.locator("#gateVerdict").textContent()).includes("INCOMPLETE"));
  await nav(page, "client");
  check("m: CLIENT price follows next door 2 → $997", (await page.locator("#cPrice").textContent()).includes("$997"));
  await page.click("#clientExit");
  await nav(page, "log");

  // ---- Persistence + draft ----
  await page.reload();
  check("m: entry persists after reload", (await page.locator("#barLabel").textContent()).trim() === "1 / 20 doors");
  await nav(page, "log");
  await page.fill("#notes", "draft-survives-reload");
  await page.waitForTimeout(100);
  await page.reload();
  await nav(page, "log");
  check("m: draft restored after reload", (await page.inputValue("#notes")) === "draft-survives-reload");

  // ---- CSV ----
  const [dl1] = await Promise.all([page.waitForEvent("download"), page.click("#exportBtn")]);
  const csv1 = fs.readFileSync(await dl1.path(), "utf8");
  check("m: csv header includes new fields in order",
    csv1.split("\r\n")[0] === "door_number,timestamp,business_name,trade,price_cohort,owner_present,demo_shown,demo_result,outcome,sit_down_booked,objection_element,notes,callback_date");
  check("m: csv escapes embedded quotes", csv1.includes('"Joe\'s ""Plumbing"", LLC"'));
  check("m: csv preserves newline in quoted note", csv1.includes('"said ""another door guy"",\nburned by SEO before"'));
  check("m: csv row carries owner+sit values", /\$497,yes,yes,absent,soft no,no/.test(csv1));

  // ---- Legacy migration (fallback-logger entries) ----
  await seed(page, [
    { door_number: 1, timestamp: "2026-08-10 08:00", business_name: "Legacy Shop", trade: "plumber", price_cohort: "$497", demo_shown: "yes", demo_result: "absent", outcome: "soft no", objection_element: "water", notes: "", callback_date: "" },
    { door_number: 2, timestamp: "2026-08-10 08:10", business_name: "", trade: "hvac", price_cohort: "$997", demo_shown: "no", demo_result: "not run", outcome: "no answer", objection_element: "unread", notes: "", callback_date: "" }
  ]);
  check("m: legacy entries still count", (await page.locator("#topProgress").textContent()) === "2 / 20");
  await nav(page, "log");
  check("m: legacy answered door shows owner —", (await page.locator(".entry .meta").allTextContents()).some(t => t.includes("owner —")));
  const [dl2] = await Promise.all([page.waitForEvent("download"), page.click("#exportBtn")]);
  const csv2 = fs.readFileSync(await dl2.path(), "utf8");
  check("m: legacy no-answer exports derived N/A", /^2,.*not applicable,no,not run,no answer,no/m.test(csv2));
  check("m: legacy answered exports empty owner", /^1,[^\n]*\$497,,yes,absent,soft no,,water/m.test(csv2));
  await nav(page, "results");
  check("m: legacy incomplete flagged in gate", (await page.locator("#gateDetail").textContent()).includes("missing owner-present"));

  // ---- Denominator correctness (partial data, no verdict) ----
  await seed(page, [
    entry(1, { owner_present: "yes", demo_shown: "yes", demo_result: "present" }),
    entry(2, { owner_present: "yes", demo_shown: "no", demo_result: "not run" }),
    entry(3, { owner_present: "no", demo_shown: "yes", demo_result: "absent" }),
    noAnswer(4)
  ]);
  await nav(page, "results");
  const demoCard = await page.locator("#demoRateCard").textContent();
  check("m: demo denominator = owner-present answered (2)", demoCard.includes("of 2 owner conversations"));
  check("m: demo numerator = 1 → 50%", demoCard.includes("50%"));
  check("m: partial run stays no-verdict", (await page.locator("#gateVerdict").textContent()).includes("no verdict"));

  // ---- Complete 20: PASS scenario ----
  const passSet = [];
  for (let d = 1; d <= 20; d++) {
    if (d <= 4) passSet.push(noAnswer(d));
    else if (d <= 14) passSet.push(entry(d, {
      owner_present: "yes",
      demo_shown: d <= 10 ? "yes" : "no",
      demo_result: d <= 10 ? (d % 2 ? "present" : "absent") : "not run",
      outcome: d === 5 ? "closed" : (d <= 8 ? "callback set" : "soft no"),
      sit_down_booked: d >= 6 && d <= 8 ? "yes" : "no"
    }));
    else passSet.push(entry(d, { owner_present: "no", demo_shown: "no", demo_result: "not run" }));
  }
  await seed(page, passSet);
  await nav(page, "results");
  check("m: complete-run gate PASS", (await page.locator("#gateVerdict").textContent()).includes("LEARN GATES MET"));
  check("m: PASS detail uses owner denominator", (await page.locator("#gateDetail").textContent()).includes("of 10 owner conversations"));
  check("m: cohort card labeled direction only", (await page.locator("#cohortCard").textContent()).includes("direction"));
  check("m: log locks at completion", await page.locator("#saveBtn").isDisabled());
  check("m: phase advances to First close", (await page.locator("#topPhase").textContent()) === "First close");
  check("m: NEXT MOVE routes to results at 20", (await page.locator("#nextMoveBtn").textContent()).includes("RESULTS"));
  await nav(page, "log");
  await page.evaluate(() => document.getElementById("f").requestSubmit());
  check("m: 21st save rejected", (await page.locator(".msg.err").textContent()).includes("Sprint complete"));
  check("m: entry count stays 20", await page.evaluate(() => JSON.parse(localStorage.getItem("lehi-field-log-v1")).length) === 20);

  // ---- Complete 20: ATTENTION scenario ----
  const missSet = [];
  for (let d = 1; d <= 20; d++) {
    if (d <= 4) missSet.push(noAnswer(d));
    else if (d <= 14) missSet.push(entry(d, {
      owner_present: "yes",
      demo_shown: d <= 6 ? "yes" : "no",
      demo_result: d <= 6 ? "absent" : "not run",
      outcome: "soft no", sit_down_booked: d === 5 ? "yes" : "no"
    }));
    else missSet.push(entry(d, { owner_present: "no", demo_shown: "no", demo_result: "not run" }));
  }
  await seed(page, missSet);
  await nav(page, "results");
  check("m: gates-not-met verdict", (await page.locator("#gateVerdict").textContent()).includes("GATES NOT MET"));
  const missDetail = await page.locator("#gateDetail").textContent();
  check("m: miss detail names demo gate", missDetail.includes("<50%"));
  check("m: miss detail names offer gate", missDetail.includes("sit-downs"));

  // ---- Reset (typed gate) from RESULTS-shared store via LOG ----
  await nav(page, "log");
  await page.click(".reset-box summary");
  check("m: reset disabled before typing", await page.locator("#resetBtn").isDisabled());
  await page.fill("#resetConfirm", "reset");
  check("m: reset disabled wrong case", await page.locator("#resetBtn").isDisabled());
  await page.fill("#resetConfirm", "RESET");
  check("m: reset armed by RESET", !(await page.locator("#resetBtn").isDisabled()));
  await page.click("#resetBtn");
  check("m: reset clears to 0/20", (await page.locator("#barLabel").textContent()).trim() === "0 / 20 doors");
  check("m: reset re-enables save", !(await page.locator("#saveBtn").isDisabled()));
  await page.reload();
  check("m: reset persists", (await page.locator("#topProgress").textContent()) === "0 / 20");

  // ---- Overflow + network (mobile) ----
  for (const v of ["command","workflow","log","results"]) {
    await nav(page, v);
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    check("m: no horizontal overflow on " + v, w <= 390, "scrollWidth=" + w);
  }
  await nav(page, "client");
  const wc = await page.evaluate(() => document.documentElement.scrollWidth);
  check("m: no horizontal overflow on client", wc <= 390, "scrollWidth=" + wc);
  check("m: zero external requests (mobile)", external.length === 0, external.join(", ") || "none");
  await ctx.close();

  /* ================= DESKTOP (1280px) ================= */
  const dctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const dpage = await dctx.newPage();
  const dexternal = [];
  dpage.on("request", (r) => { if (!r.url().startsWith("file://")) dexternal.push(r.url()); });
  await dpage.goto(FILE);
  check("d: loads at desktop", (await dpage.title()) === "Guild Command Center");
  check("d: rail is vertical at desktop", await dpage.locator("#tabbar").evaluate(t => getComputedStyle(t).flexDirection === "column"));
  for (const v of ["workflow","log","results","command"]) {
    await dpage.click(`#tabbar button[data-view="${v}"]`);
    check("d: nav to " + v, await dpage.locator("#view-" + v).evaluate(el => el.classList.contains("on")));
  }
  const dw = await dpage.evaluate(() => document.documentElement.scrollWidth);
  check("d: no horizontal overflow", dw <= 1280, "scrollWidth=" + dw);
  check("d: zero external requests (desktop)", dexternal.length === 0, dexternal.join(", ") || "none");
  await dctx.close();

  await browser.close();
  console.log(results.join("\n"));
  console.log(results.filter(r => r.startsWith("FAIL")).length + " failures / " + results.length + " checks");
})().catch(e => { console.error("SMOKE CRASH:", e); process.exit(1); });
