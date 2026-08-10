#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dist_dir="$repo_root/dist"

mkdir -p "$dist_dir/icons"
cp "$repo_root/playbooks/guild-command-center.html" "$dist_dir/index.html"
cp "$repo_root/pwa/manifest.webmanifest" "$dist_dir/manifest.webmanifest"
cp "$repo_root/pwa/sw.js" "$dist_dir/sw.js"
cp "$repo_root/pwa/_headers" "$dist_dir/_headers"
cp "$repo_root/pwa/icons/icon-192.png" "$dist_dir/icons/icon-192.png"
cp "$repo_root/pwa/icons/icon-512.png" "$dist_dir/icons/icon-512.png"
cp "$repo_root/pwa/icons/icon-maskable-512.png" "$dist_dir/icons/icon-maskable-512.png"

cmp -s "$repo_root/playbooks/guild-command-center.html" "$dist_dir/index.html"
echo "Built Guild Command Center PWA in $dist_dir"

