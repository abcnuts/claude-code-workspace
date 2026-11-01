#!/usr/bin/env bash
# MYTHOS protocol API wrapper. No auth required. Call BEFORE every Google Drive write.
#
# Usage:
#   scripts/mythos-protocol.sh lookup FOLDER_NAME            # full lookup record
#   scripts/mythos-protocol.sh id FOLDER_NAME                # prints only google_drive_id
#   scripts/mythos-protocol.sh folders                       # all canonical folders
#   scripts/mythos-protocol.sh rules                         # all enforced rules
#   scripts/mythos-protocol.sh full                          # full protocol dump
#   scripts/mythos-protocol.sh check_duplicate DRIVE_ID      # is this ID a known duplicate?
#   scripts/mythos-protocol.sh register NAME PATH DRIVE_ID   # register a subfolder you created
#
# Env: MYTHOS_PROTOCOL_API (override endpoint), MYTHOS_PROTOCOL_TIMEOUT (seconds, default 15)
set -euo pipefail

API="${MYTHOS_PROTOCOL_API:-https://rjcoeoropwvqzvinopze.supabase.co/functions/v1/get-protocol}"
TIMEOUT="${MYTHOS_PROTOCOL_TIMEOUT:-15}"

usage() { sed -n '2,13p' "$0" >&2; exit 2; }

hint() {
  cat >&2 <<'MSG'
mythos-protocol: request failed.
  - "CONNECT tunnel failed, response 403": this cloud environment's network policy does not allow
    rjcoeoropwvqzvinopze.supabase.co. Add it under Allowed domains in the environment settings.
  - timeout / 5xx: the Supabase project may be paused (INACTIVE). Check with the Supabase MCP
    get_project and restore it; then retry. If restore fails with PaymentRequired, the Supabase
    org has unpaid invoices — only Brandon can clear that.
  Never guess a folder ID to work around this.
MSG
}

call() {  # call GET_ARGS... (curl args after the URL)
  local out
  if ! out="$(curl -sS --fail --max-time "$TIMEOUT" "$@" 2>&1)"; then
    printf '%s\n' "$out" >&2
    hint
    return 1
  fi
  printf '%s\n' "$out"
}

cmd="${1:-}"; [ $# -gt 0 ] && shift
case "$cmd" in
  lookup)
    [ $# -eq 1 ] || usage
    call -G "$API" --data-urlencode "action=lookup" --data-urlencode "folder=$1" ;;
  id)
    [ $# -eq 1 ] || usage
    res="$(call -G "$API" --data-urlencode "action=lookup" --data-urlencode "folder=$1")"
    id="$(printf '%s' "$res" | jq -r '[.. | objects | .google_drive_id? // empty] | first // empty' 2>/dev/null || true)"
    if [ -z "$id" ]; then
      echo "mythos-protocol: no google_drive_id in response for '$1'. Raw response:" >&2
      printf '%s\n' "$res" >&2
      exit 1
    fi
    printf '%s\n' "$id" ;;
  folders|rules|full)
    [ $# -eq 0 ] || usage
    call -G "$API" --data-urlencode "action=$cmd" ;;
  check_duplicate)
    [ $# -eq 1 ] || usage
    call -G "$API" --data-urlencode "action=check_duplicate" --data-urlencode "drive_id=$1" ;;
  register)
    [ $# -eq 3 ] || usage
    body="$(jq -cn --arg n "$1" --arg p "$2" --arg i "$3" '{folder_name:$n, folder_path:$p, google_drive_id:$i}')"
    call -X POST "${API}?action=register" -H 'content-type: application/json' --data "$body" ;;
  -h|--help|help|"")
    usage ;;
  *)
    echo "mythos-protocol: unknown command '$cmd'" >&2; usage ;;
esac
