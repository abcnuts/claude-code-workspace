#!/bin/bash
# ============================================
# Claude Code Workspace Setup Script
# For: Brandon Packard
# Created: 2026-03-07
# ============================================

set -e

WORKSPACE="$HOME/claude-code-workspace"

echo "🔧 Setting up Claude Code workspace at $WORKSPACE"

# 1. Create the workspace folder
mkdir -p "$WORKSPACE"
cd "$WORKSPACE"

# 2. Initialize git
if [ ! -d ".git" ]; then
  git init
  echo "✅ Git initialized"
else
  echo "⏭️  Git already initialized"
fi

# 3. Create directory structure
mkdir -p .claude
mkdir -p projects
mkdir -p scratch
mkdir -p outputs
mkdir -p scripts

echo "✅ Directory structure created"

# 4. Create .claude/settings.json
cat > .claude/settings.json << 'SETTINGS'
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(node:*)",
      "Bash(python*:*)",
      "Bash(pip:*)",
      "Bash(git:*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(mkdir:*)",
      "Bash(cp:*)",
      "Bash(mv:*)",
      "Bash(find:*)",
      "Bash(grep:*)",
      "Bash(echo:*)",
      "Bash(touch:*)",
      "Bash(chmod:*)"
    ],
    "deny": []
  }
}
SETTINGS
echo "✅ Claude Code settings created"

# 5. Create CLAUDE.md (project instructions Claude Code reads automatically)
cat > CLAUDE.md << 'CLAUDEMD'
# Claude Code Workspace — Brandon Packard

## Who You're Working With
- Brandon has ADHD — be direct, systematic, no abstract discussion
- He wants truth over comfort — no people-pleasing
- He's built 80+ systems but hasn't deployed — help him SHIP, not build more
- Reduce cognitive load — don't delegate decisions back to him

## Workspace Layout
- `projects/` — Active projects (each gets its own subfolder)
- `scratch/` — Quick experiments, throwaway code, proofs of concept
- `outputs/` — Final deliverables, exports, generated files
- `scripts/` — Reusable utility scripts

## Working Principles
1. **Ship over perfect** — working > polished
2. **One project at a time** — finish before starting
3. **Commit often** — small atomic commits with clear messages
4. **Document decisions** — leave breadcrumbs in commit messages and READMEs

## Tech Stack Preferences
- Python for scripting/automation
- Node.js for web/API work
- Keep dependencies minimal
- Prefer standard library when possible

## Git Conventions
- Branch naming: `feature/description`, `fix/description`, `experiment/description`
- Commit style: imperative mood, under 72 chars ("Add user auth endpoint", not "Added stuff")
CLAUDEMD
echo "✅ CLAUDE.md created"

# 6. Create .gitignore
cat > .gitignore << 'GITIGNORE'
# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Environment
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build artifacts
dist/
build/
*.egg-info/

# Logs
*.log
npm-debug.log*

# Scratch outputs (keep the folder, ignore contents)
scratch/*
!scratch/.gitkeep

# Outputs (keep the folder, ignore contents)
outputs/*
!outputs/.gitkeep
GITIGNORE
echo "✅ .gitignore created"

# 7. Create .gitkeep files to preserve empty dirs
touch scratch/.gitkeep
touch outputs/.gitkeep
touch projects/.gitkeep
touch scripts/.gitkeep

# 8. Initial commit
git add -A
git commit -m "Initialize claude-code-workspace

Structured workspace for Claude Code with:
- Project scaffolding (projects/, scratch/, outputs/, scripts/)
- CLAUDE.md with working principles and preferences
- .claude/settings.json with sensible permissions
- .gitignore for clean repos"

echo ""
echo "============================================"
echo "✅ Workspace ready at: $WORKSPACE"
echo ""
echo "To start using it:"
echo "  cd ~/claude-code-workspace"
echo "  claude"
echo ""
echo "To start a new project:"
echo "  cd ~/claude-code-workspace/projects"
echo "  mkdir my-project && cd my-project"
echo "  claude"
echo "============================================"
