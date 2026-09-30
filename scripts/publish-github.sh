#!/usr/bin/env bash
# Publish `main` to the public GitHub repo WITHOUT docs/.
#
# The Gitea repo (origin, private) is the source of truth and keeps docs/ (the
# owner's reference PDFs; one carries the postal address). GitHub gets the same
# history with docs/ removed from every commit. The rewrite is deterministic
# (same authors, dates, messages; only the tree changes), so re-running it gives
# the same SHAs and each publish is a plain fast-forward on GitHub.
#
#   scripts/publish-github.sh           # normal publish
#   FORCE=1 scripts/publish-github.sh   # overwrite GitHub's history (first publish)
#
# Never `git push` main to GitHub directly: .githooks/pre-push refuses it.
set -euo pipefail

GITHUB_URL=${GITHUB_URL:-https://github.com/javicebrian/javi-cv-site.git}
root=$(git rev-parse --show-toplevel)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

git -C "$root" diff --quiet HEAD -- || echo "note: uncommitted changes are not published" >&2

git clone -q --no-local --single-branch --branch main "$root" "$tmp/repo"
cd "$tmp/repo"
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f \
  --index-filter 'git rm -r -q --cached --ignore-unmatch docs' --prune-empty -- main >/dev/null

# Belt and braces: refuse if any commit still has docs/.
leaks=$(git rev-list main | while read -r c; do git ls-tree -d --name-only "$c" docs; done | head -1)
[ -z "$leaks" ] || { echo "✗ docs/ still present after filtering; not pushing" >&2; exit 1; }

echo "publishing $(git rev-parse --short main) (source $(git -C "$root" rev-parse --short main)) → $GITHUB_URL"
git push ${FORCE:+--force} "$GITHUB_URL" main:main
