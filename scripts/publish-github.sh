#!/usr/bin/env bash
# Publish `main` to the public GitHub repo WITHOUT the private paths below.
#
# The Gitea repo (origin, private) is the source of truth. GitHub gets the same
# history with these removed from every commit:
#   docs/      the owner's reference PDFs (one carries the postal address)
#   AGENTS.md  agent/decision docs, which describe this host's infrastructure
#   CLAUDE.md  (internal IP, Gitea host, pm2 and dashboard paths)
# README.md is the public-facing doc and must stay free of host details. The rewrite is deterministic
# (same authors, dates, messages; only the tree changes), so re-running it gives
# the same SHAs and each publish is a plain fast-forward on GitHub.
#
#   scripts/publish-github.sh           # normal publish
#   FORCE=1 scripts/publish-github.sh   # overwrite GitHub's history (first publish)
#   DRY_RUN=1 KEEP=dir scripts/publish-github.sh  # filter + check only; leave the result in dir
#
# Never `git push` main to GitHub directly: .githooks/pre-push refuses it.
set -euo pipefail

PRIVATE_PATHS='docs AGENTS.md CLAUDE.md' # keep in step with .githooks/pre-push

GITHUB_URL=${GITHUB_URL:-https://github.com/javicebrian/javi-cv-site.git}
root=$(git rev-parse --show-toplevel)
tmp=${KEEP:-$(mktemp -d)}
[ -n "${KEEP:-}" ] || trap 'rm -rf "$tmp"' EXIT

git -C "$root" diff --quiet HEAD -- || echo "note: uncommitted changes are not published" >&2

git clone -q --no-local --single-branch --branch main "$root" "$tmp/repo"
cd "$tmp/repo"
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f \
  --index-filter "git rm -r -q --cached --ignore-unmatch $PRIVATE_PATHS" --prune-empty -- main >/dev/null

# Belt and braces: refuse if any commit still has a private path.
# shellcheck disable=SC2086
leaks=$(git rev-list main | while read -r c; do git ls-tree --name-only "$c" -- $PRIVATE_PATHS; done | head -1)
[ -z "$leaks" ] || { echo "✗ $leaks still present after filtering; not pushing" >&2; exit 1; }

if [ -n "${DRY_RUN:-}" ]; then
  echo "dry run: would publish $(git rev-parse --short main) (source $(git -C "$root" rev-parse --short main)); filtered repo in $tmp/repo"
  exit 0
fi
echo "publishing $(git rev-parse --short main) (source $(git -C "$root" rev-parse --short main)) → $GITHUB_URL"
git push ${FORCE:+--force} "$GITHUB_URL" main:main
