#!/usr/bin/env bash
# SessionStart hook — Claude Code workspace (Brandon Packard)
#
# 1. Exports MYTHOS protocol env vars for the session.
# 2. Prints session context (newest handoff/plan/journal) into Claude's context.
# 3. Caches the MYTHOS protocol folder map (best effort, short timeout).
# 4. Installs dependencies — cloud sessions only, and only if a manifest exists.
#
# Every step is best-effort. This script must never fail the session: exit 0.
set -uo pipefail
cat >/dev/null 2>&1 || true   # consume the hook's JSON on stdin

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
cd "$ROOT" 2>/dev/null || exit 0

MYTHOS_SUPABASE_PROJECT_ID="rjcoeoropwvqzvinopze"
MYTHOS_PROTOCOL_API="https://${MYTHOS_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/get-protocol"
MYTHOS_DRIVE_ROOT_ID="13PUllMRFm6BejY3vlINDTN7oXV5VM42L"
CACHE_DIR="$ROOT/.claude/cache"
CACHE_FILE="$CACHE_DIR/mythos-protocol.json"
mkdir -p "$CACHE_DIR" 2>/dev/null || true

# --- 1. Env vars for the rest of the session --------------------------------
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    echo "export MYTHOS_SUPABASE_PROJECT_ID=\"$MYTHOS_SUPABASE_PROJECT_ID\""
    echo "export MYTHOS_PROTOCOL_API=\"$MYTHOS_PROTOCOL_API\""
    echo "export MYTHOS_DRIVE_ROOT_ID=\"$MYTHOS_DRIVE_ROOT_ID\""
    echo "export MYTHOS_PROTOCOL_CACHE=\"$CACHE_FILE\""
  } >> "$CLAUDE_ENV_FILE" 2>/dev/null || true
fi

# --- 2. Session context (stdout is injected into Claude's context) ----------
newest() {  # newest by date-prefixed filename, not mtime (fresh clones share mtimes)
  ls -1 "$1"/*.md 2>/dev/null | sort | tail -1
}
branch="$(git branch --show-current 2>/dev/null || echo '?')"
sha="$(git rev-parse --short HEAD 2>/dev/null || echo '?')"
echo "## Workspace session context"
echo "- Branch: ${branch} @ ${sha}"
hs="$(ls -1 handoffs/*.md 2>/dev/null | sort -r | head -3 | tr '\n' ' ')"; p="$(newest plans)"; j="$(newest journal)"
[ -n "$hs" ] && echo "- Newest handoffs (highest date = canonical, read it first): ${hs% }"
[ -n "$p" ] && echo "- Newest plan: $p"
[ -n "$j" ] && echo "- Newest journal: $j"

# --- 3. MYTHOS protocol map (best effort) -----------------------------------
if command -v curl >/dev/null 2>&1; then
  tmp="$(mktemp)"; errf="$(mktemp)"
  if curl -sS --fail --max-time 8 "${MYTHOS_PROTOCOL_API}?action=full" -o "$tmp" 2>"$errf" && [ -s "$tmp" ]; then
    mv "$tmp" "$CACHE_FILE"
    n="$(jq -r 'if type=="array" then length elif (type=="object" and has("folders")) then (.folders|length) elif type=="object" then (keys|length) else "?" end' "$CACHE_FILE" 2>/dev/null || echo '?')"
    echo "- MYTHOS protocol map: cached at .claude/cache/mythos-protocol.json (${n} entries). Still run 'scripts/mythos-protocol.sh lookup NAME' before every Drive write."
  else
    err="$(head -c 160 "$errf" 2>/dev/null | tr -d '\n')"
    echo "- MYTHOS protocol API: UNREACHABLE (${err:-no response}). Likely causes: Supabase project paused (check with Supabase MCP get_project; restore if INACTIVE) or host not on this environment's network allowlist. If restore fails with PaymentRequired, the Supabase org has unpaid invoices — only Brandon can clear that. Do NOT guess Drive folder IDs."
    rm -f "$tmp"
  fi
  rm -f "$errf"
fi

# --- 4. Dependencies (cloud sessions only) ----------------------------------
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  if [ -f package.json ]; then
    if [ -d node_modules ]; then
      echo "- npm dependencies: present"
    elif command -v npm >/dev/null 2>&1; then
      if PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-audit --no-fund --loglevel=error >/dev/null 2>&1; then
        echo "- npm install: done"
      else
        echo "- npm install: FAILED — run 'npm install' manually and read the error"
      fi
    fi
  fi
  if [ -f requirements.txt ] && command -v python3 >/dev/null 2>&1; then
    if PIP_BREAK_SYSTEM_PACKAGES=1 python3 -m pip install -q -r requirements.txt >/dev/null 2>&1; then
      echo "- pip install: done"
    else
      echo "- pip install: FAILED — run 'python3 -m pip install -r requirements.txt' manually"
    fi
  fi
fi

echo "- Startup checklist: (1) read the newest handoff; (2) check agent_messages in Supabase for pending messages; (3) look up folder IDs via scripts/mythos-protocol.sh before any Drive write."
exit 0
