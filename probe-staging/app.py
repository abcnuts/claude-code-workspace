"""Crew web page: three boxes, one button, a report — and before/after compare.

Passcode-gated (shared crew passcode, cookie). Daily run limit as an accident
brake. Manual corrections are append-only (see probe/db.py).
"""
import html
import json
import os
import threading

from dotenv import load_dotenv
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse

from probe import db
from probe.engine import competitor_tally, run_probe
from probe.matching import normalize

load_dotenv()

PASSCODE = os.environ.get("PROBE_PASSCODE", "change-me")
DAILY_RUN_LIMIT = int(os.environ.get("DAILY_RUN_LIMIT", "50"))

app = FastAPI(title="Guild Visibility Probe")
_run_lock = threading.Lock()  # one probe at a time keeps cost + rate limits sane

STYLE = """
<style>
 body{font-family:-apple-system,system-ui,sans-serif;background:#f4f3ee;color:#1c2420;
      max-width:780px;margin:0 auto;padding:24px;line-height:1.5}
 h1{font-size:22px} h2{font-size:17px;margin-top:28px}
 .card{background:#fff;border:1px solid #d8d5c8;border-radius:8px;padding:18px;margin:14px 0}
 .score{font-size:34px;font-weight:800;color:#24513B}
 .muted{color:#6b7268;font-size:13px}
 input,select,button{font-size:16px;padding:9px 12px;border:1px solid #b9b5a5;border-radius:6px}
 button{background:#24513B;color:#fff;border:none;cursor:pointer}
 table{border-collapse:collapse;width:100%} td,th{padding:6px 10px;border-bottom:1px solid #e3e0d4;text-align:left}
 details{margin:8px 0} summary{cursor:pointer}
 .hit{color:#24513B;font-weight:700} .miss{color:#a33f36;font-weight:700}
 .invalid{background:#fbecea;border-color:#e0b4ae}
 a{color:#24513B}
 .footnote{border-top:1px solid #d8d5c8;margin-top:22px;padding-top:10px;font-size:12px;color:#6b7268}
</style>
"""


def _authed(request: Request) -> bool:
    return request.cookies.get("probe_pass") == PASSCODE


def _login_page(msg=""):
    return HTMLResponse(f"""{STYLE}<h1>Guild Visibility Probe</h1>
    <div class="card"><form method="post" action="/login">
    <p>Crew passcode:</p><input type="password" name="passcode" autofocus>
    <button>Enter</button><p class="muted">{html.escape(msg)}</p></form></div>""")


@app.post("/login")
def login(passcode: str = Form(...)):
    resp = RedirectResponse("/", status_code=303)
    if passcode == PASSCODE:
        resp.set_cookie("probe_pass", passcode, httponly=True, max_age=60 * 60 * 24 * 30)
    return resp


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    if not _authed(request):
        return _login_page()
    conn = db.connect()
    from probe.engine import load_questions
    trades = "".join(f'<option value="{t}">{t}</option>' for t in sorted(load_questions()))
    rows = ""
    for r in db.list_runs(conn):
        run, samples, overrides = db.get_run(conn, r["id"])
        orig, corrected, n, _ = db.score(run, samples, overrides)
        shown = corrected if corrected != orig else orig
        rows += (f"<tr><td><a href='/run/{r['id']}'>#{r['id']}</a></td>"
                 f"<td>{html.escape(r['business'])}</td><td>{html.escape(r['town'])}</td>"
                 f"<td>{shown} / {n}</td><td>{r['status']}</td>"
                 f"<td class='muted'>{r['created_at'][:10]}</td></tr>")
    return HTMLResponse(f"""{STYLE}<h1>Guild Visibility Probe</h1>
    <div class="card"><form method="post" action="/run">
      <p><input name="business" placeholder="Business name" required style="width:60%"></p>
      <p><select name="trade">{trades}</select>
         <input name="town" placeholder="Town, ST" required></p>
      <button>Run the probe (10 asks, ~2 min)</button>
      <p class="muted">Re-running a saved business automatically reuses its baseline
      question and settings, so before/after stays apples-to-apples.</p>
    </form></div>
    <h2>Saved runs</h2>
    <div class="card"><table><tr><th>Run</th><th>Business</th><th>Town</th>
    <th>Score</th><th>Status</th><th>Date</th></tr>{rows or '<tr><td colspan=6 class=muted>none yet</td></tr>'}</table>
    <p class="muted">Compare any two runs of the same business from a run's page.</p></div>""")


@app.post("/run")
def start_run(request: Request, business: str = Form(...), trade: str = Form(...), town: str = Form(...)):
    if not _authed(request):
        return _login_page()
    conn = db.connect()
    if db.runs_today(conn) >= DAILY_RUN_LIMIT:
        return HTMLResponse(f"{STYLE}<div class='card invalid'>Daily run limit "
                            f"({DAILY_RUN_LIMIT}) reached — accident brake. Try tomorrow "
                            f"or raise DAILY_RUN_LIMIT.</div>", status_code=429)
    if "," not in town:
        return HTMLResponse(f"{STYLE}<div class='card invalid'>Include the state — "
                            f"e.g. <b>Beaumont, TX</b>. <a href='/'>Back</a></div>", status_code=400)
    with _run_lock:
        run_id = run_probe(business.strip(), trade, town.strip())
    return RedirectResponse(f"/run/{run_id}", status_code=303)


@app.get("/run/{run_id}", response_class=HTMLResponse)
def run_page(request: Request, run_id: int):
    if not _authed(request):
        return _login_page()
    conn = db.connect()
    run, samples, overrides = db.get_run(conn, run_id)
    if not run:
        return HTMLResponse(f"{STYLE}<p>No such run.</p>", status_code=404)
    orig, corrected, n, no_rec = db.score(run, samples, overrides)

    tally = "".join(f"<tr><td>{c}x</td><td>{html.escape(name)}</td></tr>"
                    for name, c in competitor_tally(samples)[:15])
    answers = ""
    for s in samples:
        o = overrides.get(s["id"])
        eff = o["corrected_hit"] if o else s["target_hit"]
        badge = "<span class='hit'>NAMED</span>" if eff == 1 else "<span class='miss'>not named</span>"
        if s["error"]:
            badge = f"<span class='miss'>error: {html.escape(s['error'][:80])}</span>"
        note = f" <span class='muted'>(corrected: {html.escape(o['note'] or '')})</span>" if o else ""
        flip = 0 if eff == 1 else 1
        answers += f"""<details><summary>Ask {s['idx']}: {badge}{note}</summary>
        <p style="white-space:pre-wrap">{html.escape(s['raw_text'] or '')}</p>
        <form method="post" action="/override/{s['id']}" style="margin:6px 0">
          <input type="hidden" name="run_id" value="{run['id']}">
          <input type="hidden" name="corrected_hit" value="{flip}">
          <input name="note" placeholder="why? (e.g. name variant missed)" required>
          <button>Mark as {'MISS' if eff == 1 else 'HIT'}</button>
        </form></details>"""

    others = db.list_runs(conn, business_norm=run["business_norm"])
    compare_opts = "".join(
        f'<option value="{o["id"]}">#{o["id"]} — {o["created_at"][:10]}</option>'
        for o in others if o["id"] != run_id and o["status"] == "valid")
    corrected_line = (f"<p>Corrected score: <b>{corrected} of {n}</b> "
                      f"<span class='muted'>(original {orig})</span></p>"
                      if corrected != orig else "")
    invalid = "<div class='card invalid'>INVALID RUN — a sample failed. Re-run the whole probe; partial runs are never shown to customers.</div>" if run["status"] == "invalid" else ""
    return HTMLResponse(f"""{STYLE}<p><a href="/">← all runs</a></p>
    <h1>{html.escape(run['business'])} — {html.escape(run['town'])}</h1>
    {invalid}
    <div class="card"><div class="score">Named in {corrected if corrected != orig else orig} of {n} asks</div>
    {corrected_line}
    {'<p class="muted">' + str(no_rec) + ' ask(s) gave no recommendation at all (common for clinics) — counted separately, not as a miss.</p>' if no_rec else ''}
    <p class="muted">Question: “{html.escape(run['question'])}” · {run['created_at'][:10]} · run #{run['id']}</p></div>
    <h2>Who showed up</h2><div class="card"><table>{tally or '<tr><td class=muted>nobody named</td></tr>'}</table></div>
    <h2>Raw answers (the receipts)</h2><div class="card">{answers}</div>
    {'<h2>Before / after</h2><div class="card"><form action="/compare" method="get">'
     f'<input type="hidden" name="a" value="{run_id}">'
     f'<select name="b">{compare_opts}</select> <button>Compare</button></form></div>' if compare_opts else ''}
    <p class="footnote">Method: sampled {n}x via ChatGPT ({html.escape(run['model'])}) with web search.
    AI answers vary run to run; appearance rate across repeated asks is the honest measure.
    No ranking is ever guaranteed.</p>""")


@app.post("/override/{sample_id}")
def override(request: Request, sample_id: int, run_id: int = Form(...),
             corrected_hit: int = Form(...), note: str = Form(...)):
    if not _authed(request):
        return _login_page()
    conn = db.connect()
    db.add_override(conn, sample_id, corrected_hit, note.strip())
    return RedirectResponse(f"/run/{run_id}", status_code=303)


@app.get("/compare", response_class=HTMLResponse)
def compare(request: Request, a: int, b: int):
    if not _authed(request):
        return _login_page()
    conn = db.connect()
    run_a, s_a, o_a = db.get_run(conn, a)
    run_b, s_b, o_b = db.get_run(conn, b)
    if not run_a or not run_b:
        return HTMLResponse(f"{STYLE}<p>Missing run.</p>", status_code=404)
    if run_a["business_norm"] != run_b["business_norm"]:
        return HTMLResponse(f"{STYLE}<div class='card invalid'>Different businesses — compare is apples-to-apples only.</div>", status_code=400)
    # Chronological order: before on the left.
    if run_a["created_at"] > run_b["created_at"]:
        run_a, s_a, o_a, run_b, s_b, o_b = run_b, s_b, o_b, run_a, s_a, o_a
    _, ca, na, _ = db.score(run_a, s_a, o_a)
    _, cb, nb, _ = db.score(run_b, s_b, o_b)
    model_note = ("" if run_a["model"] == run_b["model"] else
                  f"<p class='muted'>Note: model changed between runs ({run_a['model']} → {run_b['model']}).</p>")
    return HTMLResponse(f"""{STYLE}<p><a href="/run/{run_b['id']}">← back</a></p>
    <h1>{html.escape(run_a['business'])} — before / after</h1>
    <div class="card" style="display:flex;gap:30px;text-align:center">
      <div style="flex:1"><p class="muted">BEFORE · {run_a['created_at'][:10]}</p>
        <div class="score">{ca} / {na}</div></div>
      <div style="flex:1"><p class="muted">AFTER · {run_b['created_at'][:10]}</p>
        <div class="score">{cb} / {nb}</div></div>
    </div>{model_note}
    <p class="footnote">Question both times: “{html.escape(run_a['question'])}”.
    Sampled via ChatGPT with web search. Print or screenshot this page — this is the deliverable.</p>""")
