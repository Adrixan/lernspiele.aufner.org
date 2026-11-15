# lernspiele.aufner.org: agent rules
Landing page (`index.html`, `css/`, `js/`, `fonts/`, `img/`) and release pipeline of https://lernspiele.aufner.org/, the learning games of Prof. Aufner. The games are built from their own repositories; this repo only assembles, checks and deploys them. Details: `docs/RELEASE.md`. Current state and history: `.agents/session-handoff.md`.

## Release and deploy
- Release only with `npm run release` (fetches each source's GitHub default branch into disposable worktrees, runs checks, tests, audits and builds, assembles, validates, backs up on the server, deploys, verifies SHA-256 checksums and all live routes). Never deploy by hand (`scp`, `rsync`, `git archive | ssh`).
- `npm run release:dry-run` reports the exact source revisions; `npm run release:build` builds and validates into `.scratch/release/site/<release-id>` without touching production.
- Releases build from the default branches of the source repos: merge a game change to its `main` before releasing it.
- Standing order (Peter, 2026-11-03): publish after every verified, pushed change of a game repo or of this repo, without asking.
- Release stays manual (Peter, 2026-11-14, D29 A): `.github/workflows/release.yml` stays as it is and unused; do not upgrade its `@v4` actions, configure its Actions secrets or create `LERNSPIELE_DISPATCH_TOKEN` (or any other token) until Peter asks for automatic releases. The source repos' notify workflows log "skipped" without the token; that is expected.
- Audit gate: each source's `audit` command decides. Fix findings in the source repo (overrides, upgrades); accepted advisories live in that repo's `audit-exceptions.json` and its own `npm run audit`. `RELEASE_AUDIT_STRICT=0` only with Peter's explicit go.
- Host `aufner.org` (Netcup Plesk, chrooted, SSH alias `aufner.org`, docroot `~/lernspiele.aufner.org/`): the host bans source IPs after AI-crawler user agents, so never fetch the live site with agent fetch tools, Lighthouse or accessibility scanners; live checks only through the release script (browser user agent) or `curl -A` with a desktop browser user agent. One SSH attempt before a release; the script has no jumphost switch, so on a refused connection stop and report instead of retrying in a loop.
- After a release record the release id, file count, route count and backup name (`~/lernspiele-backup-<release-id>.tar.gz`) in `.agents/session-handoff.md`.

## Catalog
- `release-manifest.json` is the authoritative inventory of sources, routes and redirects; the landing page `index.html` is the curated presentation, and the release fails when its links differ from the manifest. A new game needs a manifest source and route plus a landing card (and the badge count).
- Renamed routes keep their old URL through `redirects` in the manifest.
- Every page carries the shared footer: "Ein Angebot von Prof. Aufner" (https://prof.aufner.org/) and the Ko-fi logo link (https://ko-fi.com/prof_aufner). The release injects it (`scripts/support-footer.mjs`, `css/support-footer.css`) and fails when an entry page lacks it; full-screen apps set `"supportFooter": "in-app"` and render both links themselves. Both files are byte-identical with `~/code/lernmaterial.aufner.org`: change them in both repos together.
- Theme (Peter, 2026-11-15): dark stays the default for every visitor; only a toggle choice in `lernspiele-theme` (`js/site.js`, shared with the games on this origin) switches to light; never follow the system colour scheme. Drop web-modernize `dark-mode-toggle` findings that propose a system default.
- Prof. Aufner rules apply (audience 10 to 18): Ko-fi is addressed to adults and never pushed at minors; no tracking, no external requests (fonts are self-hosted, the release fails on Google Fonts references).

## Licence
- Code PolyForm Noncommercial 1.0.0 since 2026-11-07 (Peter: only he makes money from the games); landing-page content CC BY-NC-SA 4.0; contributions only with a written agreement. Third-party parts keep their licences (OFL texts in `fonts/`, Ko-fi brand asset).

## Repository
- Root `*.md` files are git-ignored except `README.md`, `AGENTS.md` and `CLAUDE.md`; `.agents/session-handoff.md` is tracked.
- `.scratch/` holds release worktrees, staging output and test evidence (ignored).
- Git: feature branch, `git merge --no-ff` into `main`, push. Merged branches are deleted locally and on `origin` once their commits are verified in `origin/main` (Peter, 2026-11-14, D38 A).
- `release-site.mjs` and `support-footer.mjs`: check with `node --check` and `npm run release:dry-run` (or `release:build`) before committing changes.
