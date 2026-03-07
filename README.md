# Claude Code Workspace

Structured workspace setup for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Brandon Packard.

## Quick Start

```bash
curl -sL https://raw.githubusercontent.com/abcnuts/claude-code-workspace/main/setup.sh | bash
```

Or clone and run manually:

```bash
git clone https://github.com/abcnuts/claude-code-workspace.git
cd claude-code-workspace
chmod +x setup.sh
./setup.sh
```

## What It Sets Up

| Directory | Purpose |
|-----------|---------|
| `projects/` | Active projects (each gets its own subfolder) |
| `scratch/` | Quick experiments, throwaway code |
| `outputs/` | Final deliverables, exports |
| `scripts/` | Reusable utility scripts |
| `.claude/` | Claude Code settings and permissions |

## Key Files

- **`CLAUDE.md`** — Project instructions that Claude Code reads automatically on startup
- **`.claude/settings.json`** — Pre-configured tool permissions (git, npm, python, etc.)
- **`.gitignore`** — Clean repo defaults (node_modules, .env, __pycache__, etc.)

## Working Principles

1. **Ship over perfect** — working > polished
2. **One project at a time** — finish before starting
3. **Commit often** — small atomic commits with clear messages
4. **Document decisions** — leave breadcrumbs in commit messages and READMEs
