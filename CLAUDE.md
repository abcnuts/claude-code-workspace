# Claude Code Workspace — Brandon Packard

Read this file, then read the **newest file in `handoffs/`** — it is the
canonical state of the active project and supersedes everything older.
Do not re-litigate decisions it marks as locked.

## Who you're working with

- Brandon has ADHD — be direct, systematic, no abstract discussion.
- Truth over comfort. No people-pleasing.
- He has built 80+ systems and shipped few. Help him SHIP, not build more.
- Reduce cognitive load. Don't delegate decisions back to him. If you can
  decide it yourself: stop, decide, execute.

## Session start checklist (every session, before any work)

1. Read the newest `handoffs/*.md` (files are date-prefixed; highest date wins).
   It names the project, locked decisions, blockers, and re-entry points.
2. Check `agent_messages` in Supabase (project `rjcoeoropwvqzvinopze`) for
   unhandled messages addressed to you. Inspect the table's columns with
   `list_tables` the first time if unsure of the schema.
3. If the task touches Google Drive, load the folder map first:
   `scripts/mythos-protocol.sh full`.
4. If the Supabase project reports `INACTIVE` (paused), say so and restore it
   (Supabase MCP `restore_project`) before relying on anything in it.
   SQL timeouts against it mean "paused", not "broken". If restore fails with
   `PaymentRequired`, the Supabase org has unpaid invoices — tell Brandon;
   nothing else unblocks it.

The SessionStart hook (`.claude/hooks/session-start.sh`) prints items 1 and 3
into context automatically and says whether the protocol API was reachable.

## MYTHOS protocol (Google Drive + Supabase) — non-negotiable

Supabase is the source of truth. Not your memory, not cached folder IDs, not
Drive folder names. Six duplicate root folders already exist because agents
guessed. You will not add to that number.

- **Supabase project:** `rjcoeoropwvqzvinopze`
- **Protocol API (no auth):**
  `https://rjcoeoropwvqzvinopze.supabase.co/functions/v1/get-protocol`
- **Wrapper:** `scripts/mythos-protocol.sh <lookup NAME | id NAME | folders |
  rules | full | check_duplicate ID | register NAME PATH ID>`
- **MYTHOS Drive root:** `13PUllMRFm6BejY3vlINDTN7oXV5VM42L` — never create
  folders directly under it.

Rules:

1. Before writing to Drive: `?action=lookup&folder=NAME` and use ONLY the
   returned `google_drive_id`. Every time. No hardcoded IDs. No guessing.
2. Never create root-level folders. If a folder isn't in the registry, ask
   Brandon. Do not create it yourself.
3. Never create a folder without checking both `folder_registry` and
   `duplicate_folders` first. If it exists, use the canonical version.
4. If you create a subfolder, register it immediately: POST `?action=register`
   with `{folder_name, folder_path, google_drive_id}`.
5. If you find an unregistered folder, flag it: insert into `duplicate_folders`
   with `status='pending_review'`.
6. Never delete folders or files without Brandon's explicit approval. Move to
   deprecated instead.

File routing (every file has exactly one destination):

| Content | Folder |
|---|---|
| Agent-to-agent handoffs | HANDOFFS |
| MCP servers, tool configs, integration docs | TOOLS |
| Protocols, operating rules, system commands | COMMAND |
| Product files, deliverables | PRODUCTS |
| Announcements | ANNOUNCEMENTS |
| Laws, governance docs | LAWS |
| Skills, capability definitions | SKILLS |
| Active project work | Active-Projects |
| Source material, research | Source-Material |

Key tables: `folder_registry` (canonical IDs — query before every Drive
write), `agent_protocol` (`WHERE enforced = true`), `duplicate_folders`,
`mcp_servers`, `agent_messages`.

```sql
SELECT google_drive_id FROM folder_registry WHERE folder_name = 'TOOLS' AND is_canonical = true;
SELECT rule_key, rule_value FROM agent_protocol WHERE enforced = true;
SELECT * FROM duplicate_folders WHERE google_drive_id = 'YOUR_ID';
```

## Workspace layout

| Path | Purpose |
|---|---|
| `handoffs/` | Agent-to-agent handoffs. Newest = canonical state. Frontmatter: `date, type, project, status, from, supersedes` |
| `journal/` | Session debriefs, research sweeps, skill-mining registers |
| `plans/` | Dated plans with owners and pass/fail gates |
| `playbooks/` | Operational playbooks and field tools (md, html, csv) |
| `projects/` | Active code projects, one subfolder each |
| `scratch/` | Throwaway experiments (gitignored) |
| `outputs/` | Generated deliverables (gitignored) |
| `scripts/` | Reusable utility scripts (`mythos-protocol.sh` lives here) |
| `.claude/` | Settings, permissions, hooks. `.claude/cache/` is gitignored |

Dated files are named `YYYY-MM-DD-slug.md` with YAML frontmatter.

## Working principles

1. **Ship over perfect** — working beats polished.
2. **One project at a time** — finish before starting.
3. **Commit often** — small atomic commits with clear messages.
4. **Document decisions** — end every substantive session with a new handoff
   in `handoffs/` whose frontmatter `supersedes:` names the previous one.

## Git conventions

- Cloud sessions work on the branch they are assigned (`claude/...`); local
  branches use `feature/`, `fix/`, `experiment/`.
- Commit style: imperative mood, under 72 chars ("Add user auth endpoint").
- Open draft PRs against `main`. Brandon merges.
- Never commit `.env`, API keys, or anything under `scratch/` or `outputs/`.

## Tech stack

Python for scripting and automation, Node.js for web and API work. Minimal
dependencies; standard library first.

## Cloud session facts (learned the hard way, still true)

- Cloud Claude authenticates to GitHub as `abcnuts`. It cannot create repos
  and cannot reach `brandonwadepackard-cell` repos. Codex on Brandon's Mac
  holds his personal credentials and owns the probe repo.
- Network egress from cloud sessions is allowlisted per environment. A proxy
  403 means the host is not allowed — report it, do not retry or mock around
  it. The Supabase host must be on the allowlist for the protocol API to work.
- Handoffs between cloud Claude and Codex travel through Brandon and this repo.
