# Session handoff: lernspiele.aufner.org

Last updated: 2026-11-15

## Done
- Existing one-command release pipeline: `npm run release` fetches latest default-branch commits into disposable worktrees, runs checks/builds, assembles and validates games, backs up, deploys, and verifies SHA-256 checksums. Dry-run: `npm run release:dry-run`; local build without deploy: `npm run release:build`.
- Published and deployed self-hosted font fixes for In Memoriam Pascal and LinguaFusion. Their independent styles are retained. LinguaFusion's PWA base, icon, scope, and start URL are relative for its `/teens/linguafusion/` path.
- Full production release `20261020210602-1568379` completed. Verified checksum list remotely; all 27 live game routes return HTTP 200 and HTML responses contain no Google Fonts references.
- Font changes pushed to `Adrixan/in-memoriam-pascal` (`3622744`) and `Adrixan/LinguaFusion` (`b668484`); local Pascal.js submodule modification remains untouched.
- Push-dispatch notification workflows are published on all source repos: trainer-engine `2fa106d`, Venomous Snake `24722de`, Pascal `8137b7c`, LinguaFusion `894c575`.
- Site pipeline merged to `main` as `e7b8a89`; dispatch-token setup docs merged as `3c2f65e`; post-deploy HTTP route checks merged as `41c9b74`.
- Verified cloud-session commit b5b6aad (landing page restyle "Bioluminescent Night", SW scope fixes for 24 trainer games, manifests/icons, lang=de).
- Fast-forward merged into `main` and pushed (94be920..b5b6aad).
- Deployed b5b6aad to production on 2026-10-16:
  - Host: SSH alias `aufner.org` (user hosting164940, chrooted Plesk shell, nginx). Docroot: `~/lernspiele.aufner.org/`. No rsync on server; deploy is `git archive | ssh ... tar -x` overlay.
  - Deploy script: `.scratch/deploy.sh` (git-ignored). Steps: drift check vs previous deployed rev, server-side backup, overlay upload, md5 verify of all deployed files.
  - Backup: `~/lernspiele-backup-20261016-b5b6aad.tar.gz` on the server (outside docroot, 1029 entries), restores the 94be920 state.
  - Verified: 914/914 files match HEAD by md5; live URLs return 200 with correct MIME types; live landing page loads with no console errors and no external requests.
- Jumphost `m11x` was not needed in the end; on 2026-10-14 aufner.org refused all connections (port 22 and 443) for 20+ min, likely hoster maintenance.
- Added Cast-Game to the catalog and release pipeline. Site `main` is `88b2b7f`; manifest has 5 sources and 28 paths, including `/teens/cast-game/`. Card identifies the English-language game and says the historical Archive summaries are not independently verified; no PWA/offline claims.
- Fixed release deploy script upload-stdin and checksum path handling; HTTP verification uses a browser user agent. Manifest/catalog validation is data-driven.
- Dependency audits fixed and pushed: trainer-engine Zod 4.6.7 (`0df1232`); Venomous Snake body-parser 1.20.9 (`45e3964`); Pascal serialize-javascript 7.1.4 (`3daac4b`); LinguaFusion fast-uri 3.1.9 and serialize-javascript 7.1.4 (`ec6f228`). All fresh-install audits and configured source checks passed. Later handoff-only commits are also merged to main.
- Cast-Game passed clean install, audit, typecheck, 26 tests and production build. Browser-tested nested route launch, save/load persistence and mobile layout with no JS errors. Full local release validated 28 entries, 32 HTML files and no Google Fonts references.
- Production release `20261024112255-2338698` succeeded on 2026-10-24. All 754 deployed files matched SHA-256; all 28 game routes returned HTTP 200. Backup: `~/lernspiele-backup-20261024112255-2338698.tar.gz`.

- Production release `20261027104933-3010359` on 2026-10-27 shipped trainer-engine v2.0.0 (`4e6f2c0`, canonical exercise ids, progress reset); other sources changed only in handoff files. 754 files matched SHA-256, all 28 routes HTTP 200, live `teens/technik` serves the new ids. Backup: `~/lernspiele-backup-20261027104933-3010359.tar.gz`. Automatic dispatch from trainer-engine was skipped (no `LERNSPIELE_DISPATCH_TOKEN`), so this was a machine-run release.

- 2026-10-27: removed `.kilocode/`, `.gitignore`, `.gitmodules` and empty `daz/` from the production docroot (copies in `~/lernspiele-backup-20261027104933-3010359.tar.gz`); only `favicon.ico` remains outside the release (kept: browsers request it). Added `teens/religion-evangelisch` and `teens/religion-islam` to the manifest and landing page (merged `87d75e7`; Catholic card renamed "Katholische Religion"); release `20261027111236-3022732`: 788 files match SHA-256, all 30 routes HTTP 200. `game-list.md` updated locally (git-ignored).

## Open points
- Cast-Game's own handoff estimates 1.86 h and lists source verification and broader accessibility review as pending; current product decision supersedes the former 15 h target. User approved publishing with an explicit Archive verification notice. Consider source review/accessibility work in a future game-quality task.
- Hosted GitHub Actions secrets remain unconfigured, but machine-run release is independent. Setup is documented in `docs/RELEASE.md`.
- No licence files shipped next to the self-hosted fonts in `fonts/`.
- Service-worker install was verified only by a Node simulation (`.scratch/sw-sim.mjs`); not yet in a real browser on the live site. Workbox SWs (Pascal, LinguaFusion, venomous-snake) not exercised.
- Local exit state: site `main` is synchronized with `origin/main`; the only untracked site file is this local `.agents/session-handoff.md`. Existing Venomous Snake edits (`.serena/project.yml`, `nx.json`) and Pascal.js submodule modification remain untouched. Temporary remediation worktrees have been removed. Release artifact and browser-test evidence remain in ignored `.scratch/`.

## 2026-10-28 dependency unpinning check
- Applied the no-exact-pins policy: nothing to change. The root `package.json` (release scripts) declares no dependencies and there is no lockfile; `teens/venomous-snake/package.json` is a deployed build snapshot with caret ranges only and no lockfile; `teens/in-memoriam-pascal/external/pascal.js/` is a vendored third-party copy and stays untouched. No commit. Not in scope: `.github/workflows/release.yml` uses `actions/checkout@v4`, `actions/setup-node@v4`, `pnpm/action-setup@v4` (major tags); check whether newer majors exist.

## Housekeeping 2026-11-01
- `.scratch/` removed. Releases and deploys run through `scripts/release-site.mjs`; the old `.scratch/deploy.sh` and `.scratch/sw-sim.mjs` are gone.

## 2026-11-01 production release `20261101072332-216473`
- Sources: trainer-engine `1705319`, venomous-snake `a64cb56`, in-memoriam-pascal `bf7f714`, linguafusion `72f0e6f`, cast-game `4b2093b`. 785 files match SHA-256, all 30 routes HTTP 200. Backup: `~/lernspiele-backup-20261101072332-216473.tar.gz`.
- First attempt stopped at the audit gate, production untouched. Fixed in the sources with overrides for minimatch (GHSA-g3hv-75wg-m249) and glob (GHSA-3g3m-2fjr-6pw4), not with `RELEASE_AUDIT_STRICT=0`.
- Manifest: Pascal and LinguaFusion now run their own `npm run audit`, because raw `npm audit` cannot honour the accepted deepmerge exception.
- This release was the first to ship the Node 24, Vite 8 and TypeScript 6 upgrades of the other games. Beyond their test suites only HTTP routes were checked live; venomous-snake was checked in a browser.
- One legacy file remains in the docroot (`favicon.ico`, kept on purpose per the 2026-10-27 note).

## 2026-11-01 production release `20261101101744-252581`
- Venomous Snake `95ead96` (dormant features, ast writing rules, XP fix); the other sources unchanged since `20261101072332-216473`. 785 files match SHA-256, all 30 routes HTTP 200. Backup: `~/lernspiele-backup-20261101101744-252581.tar.gz`.

## 2026-11-01 production release `20261101110425-290099`
- Venomous Snake `d984548` (full German translation); the other sources unchanged. Backup: `~/lernspiele-backup-20261101110425-290099.tar.gz`.

## 2026-11-03 Sudoku added
- New source `sudoku-grove` (`../sudoku-grove`, public `Adrixan/sudoku-grove`) and route `teens/sudoku`; landing card added, teens badge corrected to 23 (merge `4b85f50`). Releases `20261103204544-117624` and `20261103205921-190890` (sudoku-grove `1cdaa43`): 817 files match, all 31 routes HTTP 200.
- Standing order (Peter): publish after every verified change of a game repo.

## 2026-11-04 Ko-fi support link (prepared, NOT deployed)
- Task from Peter via the Greeter: Ko-fi link (https://ko-fi.com/prof_aufner, from prof.aufner.org) on lernspiele, all games, lernmaterial and all materials, default for all releases.
- Branch `feat/kofi-support-link` pushed in lernspiele.aufner.org (b2e77ea), lernmaterial.aufner.org (da4aabe), venomous-snake (34ee456). Not merged to main: releases build from default branches.
- Mechanism: `scripts/support-footer.mjs` (identical in both site repos) injects the line at release time, inside `<footer class="footer">` or as a band, styles in `/css/support-footer.css`; release fails if a page lacks it. Venomous Snake is a fixed full-screen app: link in its main menu, manifest `supportFooter: "in-app"`, release checks the bundle.
- Verified: snake lint/type-check/test/build, lernmaterial tests and `release:build`, lernspiele injection on a copy of release 20261103205921-190890 with screenshots (desktop and mobile).
- Blocked on Peter: go/no-go, given § 46 SchUG open item (ask the Direktion about personal links on school materials) and Prof. Aufner rule 4 (Ko-fi never pushed at minors; text addresses adults). Kids games (kids/*) also get the line unless Peter excludes them.
- On go: merge the three branches (--no-ff), `npm run release` in lernspiele.aufner.org and lernmaterial.aufner.org (one SSH attempt, fallback DEPLOY_VIA=m11x).
- DEPLOYED 2026-11-04 on Peter's go ("Deploy everywhere", kids games included, § 46 SchUG question accepted by him): merged to main (venomous-snake 63aa115, lernspiele 6227477, lernmaterial 1eecac8). lernspiele release 20261104063004-309030 (818 files match, 31 routes HTTP 200, backup ~/lernspiele-backup-20261104063004-309030.tar.gz); lernmaterial release 1eecac8 (all deploy checks ok). Live curl check: link on landing pages, kids/mathematik, sudoku, cast-game, zaehlen-denken-wahrnehmen, snake bundle; /css/support-footer.css 200 on both hosts.
- 2026-11-04 later: on Peter's request the text link became the official Ko-fi logo (`kofi_logo.svg` from Ko-fi brand asset kit v2, self-hosted, unmodified, 22 px high, alt text with link name and new-tab hint). Live: lernspiele release 20261104064840-316540 (820 files, 31 routes 200), lernmaterial fa024e2; snake precaches the logo.

## 2026-11-05 prof.aufner.org link on every page (task from Peter via the Greeter)
- Shared footer (`scripts/support-footer.mjs`, `css/support-footer.css`) now starts with "Ein Angebot von Prof. Aufner" linking `PROF_URL` = https://prof.aufner.org/ (canonical URL from `~/code/prof.aufner.org/index.html`), new tab, `rel="noopener"`, visually hidden "(öffnet in neuem Tab)" (`.support-sr`); then the Ko-fi line. `assertSupportFooter()` requires both URLs; in-app games (Venomous Snake) must bundle both. Landing `index.html` line and `css/site.css` updated by hand (marked pages get no injected stylesheet).
- Both files are byte-identical with lernmaterial.aufner.org (sha256 cfece2d5… / d9138081…), which adopted them in its release a929c85. Change them in both repos together.
- Venomous Snake main menu: `e47ab91`, merge `d612724` (DE "Ein Angebot von", EN "Brought to you by").
- Merges: lernspiele `78d6f27`. Release `20261105042700-768200`: 820 files match SHA-256, all 31 routes HTTP 200, backup `~/lernspiele-backup-20261105042700-768200.tar.gz`. Local browser check of the built site: link visible and not covered on all 32 pages at 1280 and 390 px (only LinguaFusion's first-start tutorial modal overlays it); live curl confirms the link on landing, kids/mathematik, teens/technik, sudoku, cast-game, Pascal, LinguaFusion and the Snake bundle.
- Ko-fi was already on every page since 2026-11-04; nothing missing.
- (Resolved 2026-11-14: `AGENTS.md` now holds the project rules.)
- Known limit: Pascal and LinguaFusion show a cached start page via their service workers until their next own release (same as for Ko-fi).

## Exit 2026-11-05 (stopped by the Greeter)
- Trajectory: status check, then Peter's task via the Greeter (prof.aufner.org link plus Ko-fi everywhere); done and live, see section above. Nothing in progress; `main` synced with `origin/main`, no open branches.
- Open decisions (Peter): both decided 2026-11-14 (D29 A, D38 A), see the last section.
- Next steps (from open points): font licence files in `fonts/`; check newer major versions of the `@v4` actions in `.github/workflows/release.yml`; live browser test of the service workers; Cast-Game source and accessibility review; `LERNSPIELE_DISPATCH_TOKEN` for automatic releases.

## 2026-11-07: relicensed to PolyForm Noncommercial 1.0.0
- Peter's order: only he may make money from the games. `LICENSE` (deployed at the site root by `rootFiles`) is the verbatim PolyForm Noncommercial 1.0.0 text with two Required Notice lines; `package.json` license `PolyForm-Noncommercial-1.0.0`. New `README.md` (root `.md` files stay ignored, `!/README.md` is the only exception) records code PolyForm NC, landing-page content CC BY-NC-SA 4.0, contributions only with a written agreement, and that versions before 2026-11-07 stay AGPL-3.0 for those who received them.
- Added the missing OFL texts for the self-hosted fonts in `fonts/` (deployed with the `fonts` root entry).
- The committed game builds under `kids/` and `teens/` still show the old AGPL footers until the next `npm run release`, which rebuilds them from the relicensed source repos. Not released by this session: the coordinator releases once at the end.
- Checked: `node --check` on both scripts, `npm run release:dry-run` (all sources resolved to their relicense merges).

## 2026-11-13 Buchstabenfährte and Themetrail added
- New repository `Adrixan/buchstabenfaehrte` (currently private) as two manifest sources: `buchstabenfaehrte` (`npm run build`, `dist`, route `teens/buchstabenfaehrte`) and `themetrail` (`npm run build:en`, `dist-en`, route `teens/themetrail`, English edition). Two landing cards, teens count 25. Merges `9942232` and `ee7775a`.
- Release `20261113141526-786462`: 872 files match, all 33 routes HTTP 200, backup `~/lernspiele-backup-20261113141526-786462.tar.gz`. Live curl check of both routes (title, CSP, sw.js, manifest) ok.
- The first name "Wortfährte" was dropped before any release (taken by another publisher's app).

## 2026-11-14 Peter's decisions D29 A and D38 A (via the Greeter and the Code dispatcher)
- D29 A: `AGENTS.md` created from the rules of this handoff and `docs/RELEASE.md`, `CLAUDE.md` = `@AGENTS.md`, `.gitignore` exceptions for both. Release stays manual (`npm run release` only); `release.yml` stays unused with its `@v4` actions, no Actions secrets, no `LERNSPIELE_DISPATCH_TOKEN`. Recorded as a standing rule in `AGENTS.md`; the item is closed and only reopens when Peter asks for automatic releases (then options B: deploy keys, C: per-repo dispatch token).
- D38 A: all 13 remote branches (ccr-7c0ffc3c-bl6eh2, chore/drop-copilot-kilo, chore/knots-of-alderwick-repo, chore/relicense-polyform-nc, chore/track-agent-state, docs/release-token-setup, feat/add-cast-game-release, feat/multi-game-release-pipeline, feat/post-deploy-route-checks, feat/religion-apps, feat/sudoku, fix/release-browser-user-agent, fix/use-source-audit-gates) and the 5 local ones deleted after `git ls-remote` showed each head as an ancestor of remote `main` `e2c5ee2`; no open PRs. Remote now has only `main`.
- No release: none of the changed files is deployed (the release copies an explicit `rootFiles` list).
- Remaining open points (unchanged, not decided): live browser test of the service workers; Knots of Alderwick source and accessibility review.

## Exit 2026-11-14
- Trajectory: took over D29 A and D38 A from the Code dispatcher; both done, merged to `main`, pushed. Nothing in progress, nothing needs Peter.

## 2026-11-15 web-modernize (Modern Web Guidance, timer run)
- Trajectory: Peter's standing order (2026-11-11), started by the `web-modernize` timer. `legacy-scan --json` on `index.html`, `css/`, `js/`, `fonts/`, `scripts/` returned 0 findings (scanner sanity-checked with a scratch `max-height` accordion, which it flagged). `kids/` and `teens/` are game builds and belong to the game repos' sessions.
- Nothing changed: no branch, no commit, no release (brief rule 5). This handoff paragraph is the only working-tree change and is left uncommitted on purpose.
- Report: `~/sync/ai/web-modernize/2026-11-15/lernspiele.aufner.org.md`.
- Open points unchanged: live browser test of the service workers; Knots of Alderwick source and accessibility review.

## 2026-11-15 production release `20261115044055-2297153` and theme decision (Peter via the Greeter)
- Peter's decisions in the Greeter menu: "Release lernspiele now" and "Keep dark default".
- Release: knots-of-alderwick `05a2373` (scrollbar contrast, CSP `frame-ancestors` moved to `public/.htaccess`) and venomous-snake `b48240a` (interactive input, Pyodide advisory docs), both merged to `main` beforehand; other sources trainer-engine `9fd426c`, Pascal `3b660fe`, LinguaFusion `82cc5df`, sudoku-grove `85f91a4`, buchstabenfaehrte/themetrail `4760be8`. 873 files match SHA-256, all 33 routes and 1 redirect HTTP 200, backup `~/lernspiele-backup-20261115044055-2297153.tar.gz`; `favicon.ico` stays as the one extra docroot file.
- The release ran past the 10 min background limit of the agent shell and was killed in the `finally` worktree cleanup, after deploy and live verification had passed; leftover worktrees were removed by hand. Next time run it with a longer limit (it took about 9 min).
- Live check (curl, desktop User-Agent): `release-info.json` lists the revisions above; knots CSS has the new scrollbar colours; the meta CSP is in place; `/teens/knots-of-alderwick/.htaccess` answers 403.
- Problem for knots-of-alderwick, needs Peter: Plesk's nginx serves the static files directly (`server: nginx`, no CSP header in the response), so the `.htaccess` header never reaches the browser and `frame-ancestors` is not enforced. No loss against before (the meta CSP never enforced it either). Fix options: Plesk "Additional nginx directives" for the domain (`add_header Content-Security-Policy ... always;` scoped to `/teens/knots-of-alderwick/`), or switch off "serve static files directly by nginx" so Apache applies `.htaccess`. Both are Plesk panel settings; afterwards the knots-of-alderwick session should correct its commit note and handoff ("Apache mod_headers").
- Theme: dark default stays (rule added under Catalog in `AGENTS.md`). The proposals in buchstabenfaehrte (merge `64db024`) and sudoku-grove (merge `a2662e2`) are closed in their `.agents/to-do.md` and recorded in their `AGENTS.md`; this repo had no proposal. Both web-modernize reports in `~/sync/ai/web-modernize/2026-11-15/` got a "Decision" section.
- Not touched: sudoku-grove's open Dependabot branch `vite-8.3.7` (not part of this task).

## Exit 2026-11-15
- Trajectory: took over Peter's two Greeter decisions from the brief; both done, `main` pushed in all three repos.
- Open decision for Peter: the nginx CSP header for knots-of-alderwick (above).
- Open points unchanged: live browser test of the service workers; Knots of Alderwick source and accessibility review.
