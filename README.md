# Claude Code Workspace

Structured workspace for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Brandon Packard.
Cloud sessions and local clones both start from the same versioned config.

## Quick Start

```bash
curl -sL https://raw.githubusercontent.com/abcnuts/claude-code-workspace/main/setup.sh | bash
```

Or clone and run manually:

```bash
git clone https://github.com/abcnuts/claude-code-workspace.git
cd claude-code-workspace
./setup.sh
```

`setup.sh` is idempotent: it clones or fast-forwards the repo, verifies the
toolchain, and checks that the MYTHOS protocol API is reachable. It never
overwrites files that are versioned here.

## What's In The Repo

| Path | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions Claude Code reads on startup: operating context, MYTHOS protocol, layout, conventions |
| `.claude/settings.json` | Tool permissions and the SessionStart hook registration |
| `.claude/hooks/session-start.sh` | Prints the newest handoff/plan into context, caches the MYTHOS folder map, installs deps in cloud sessions |
| `scripts/mythos-protocol.sh` | Wrapper for the MYTHOS protocol API (`lookup`, `id`, `folders`, `rules`, `full`, `check_duplicate`, `register`) |
| `handoffs/` | Agent-to-agent handoffs — the newest one is the canonical project state |
| `journal/` | Session debriefs and research sweeps |
| `plans/` | Dated plans with gates |
| `playbooks/` | Operational playbooks and field tools |
| `projects/` | Active code projects (one subfolder each) |
| `scratch/`, `outputs/` | Experiments and generated deliverables (gitignored) |
| `.gitignore` | Clean defaults: node_modules, .env, caches, scratch/outputs contents |

## MYTHOS Protocol

Supabase project `rjcoeoropwvqzvinopze` is the source of truth for Google
Drive folder IDs and agent rules. Before any Drive write:

```bash
scripts/mythos-protocol.sh id TOOLS        # → the canonical google_drive_id
scripts/mythos-protocol.sh rules           # → all enforced rules
```

Full rules and file routing are in `CLAUDE.md`.

## Working Principles

1. **Ship over perfect** — working > polished
2. **One project at a time** — finish before starting
3. **Commit often** — small atomic commits with clear messages
4. **Document decisions** — every substantive session ends with a new handoff
