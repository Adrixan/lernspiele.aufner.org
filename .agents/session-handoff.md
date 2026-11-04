# Session handoff: lernspiele.aufner.org

Last updated: 2026-10-24, exit handoff

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
