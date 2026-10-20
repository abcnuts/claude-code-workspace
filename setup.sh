#!/usr/bin/env bash
# ============================================
# Claude Code Workspace Setup Script
# For: Brandon Packard
# Created: 2026-03-07 · Revised: 2026-10-20
#
# Clones (or updates) the workspace repo and verifies the local toolchain.
# CLAUDE.md, .claude/settings.json, the SessionStart hook, .gitignore and the
# protocol helper are versioned IN the repo — this script never overwrites them.
# Safe to run repeatedly.
#
#   curl -sL https://raw.githubusercontent.com/abcnuts/claude-code-workspace/main/setup.sh | bash
#   WORKSPACE=/custom/path ./setup.sh
# ============================================
set -euo pipefail

WORKSPACE="${WORKSPACE:-$HOME/claude-code-workspace}"
REPO_URL="${REPO_URL:-https://github.com/abcnuts/claude-code-workspace.git}"

echo "🔧 Claude Code workspace → $WORKSPACE"

# 1. Clone or update
if [ -d "$WORKSPACE/.git" ]; then
  cd "$WORKSPACE"
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "$REPO_URL"
    echo "✅ Added origin remote"
  fi
  if git fetch origin main 2>/dev/null; then
    if git merge-base --is-ancestor HEAD origin/main 2>/dev/null; then
      git pull --ff-only origin main >/dev/null && echo "✅ Repo updated (fast-forward to origin/main)"
    else
      echo "⚠️  Local history has diverged from origin/main — not touching it. Reconcile manually:"
      echo "    cd $WORKSPACE && git log --oneline --graph HEAD origin/main | head -20"
    fi
  else
    echo "⚠️  Could not fetch origin/main (offline?). Continuing with local copy."
  fi
elif [ -e "$WORKSPACE" ]; then
  echo "❌ $WORKSPACE exists but is not a git repo. Move it aside or run with WORKSPACE=/other/path." >&2
  exit 1
else
  git clone "$REPO_URL" "$WORKSPACE"
  cd "$WORKSPACE"
  echo "✅ Repo cloned"
fi

# 2. Scaffold (idempotent; contents of scratch/ and outputs/ are gitignored)
mkdir -p projects scratch outputs scripts .claude/hooks .claude/cache
chmod +x scripts/*.sh .claude/hooks/*.sh 2>/dev/null || true
echo "✅ Directory structure verified"

# 3. Toolchain check
echo "🔍 Toolchain:"
for t in git node npm python3 jq curl claude; do
  if command -v "$t" >/dev/null 2>&1; then
    v="$("$t" --version 2>&1 | head -1)"
    printf "   %-8s %s\n" "$t" "$v"
  else
    printf "   %-8s MISSING\n" "$t"
  fi
done
command -v jq >/dev/null 2>&1 || echo "   ⚠️  jq is required by scripts/mythos-protocol.sh (brew install jq / apt install jq)"

# 4. MYTHOS protocol API reachability (no auth; best effort)
API="https://rjcoeoropwvqzvinopze.supabase.co/functions/v1/get-protocol"
if curl -sS --fail --max-time 8 "$API?action=rules" >/dev/null 2>&1; then
  echo "✅ MYTHOS protocol API reachable"
else
  echo "⚠️  MYTHOS protocol API unreachable — Supabase project rjcoeoropwvqzvinopze may be paused (INACTIVE)."
  echo "    Restore it in the Supabase dashboard before any agent does Drive work."
fi

echo ""
echo "============================================"
echo "✅ Workspace ready at: $WORKSPACE"
echo ""
echo "  cd $WORKSPACE && claude"
echo ""
echo "New project:  mkdir projects/<name> && cd projects/<name> && claude"
echo "Folder ID:    scripts/mythos-protocol.sh id TOOLS"
echo "============================================"
