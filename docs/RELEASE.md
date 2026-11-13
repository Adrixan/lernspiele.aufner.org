# Release workflow

The release manifest (`release-manifest.json`) is the authoritative inventory of public game routes and source repositories. The root `index.html` remains the curated presentation; a validator fails when its links differ from the manifest.

## Local release

Run `npm run release` from this repository. It fetches each source repository's current GitHub default branch, builds in disposable Git worktrees (leaving adjacent checkouts untouched), runs checks and dependency audits, assembles the site, checks every manifest game entry point and bundled HTML/JS/CSS/JSON for Google Fonts references, creates a server-side backup, deploys, and verifies SHA-256 checksums and live game URLs.

Other commands:
- `npm run release:dry-run`: fetch sources and report their exact revisions without installing or deploying.
- `npm run release:build`: build and validate into `.scratch/release/site/<release-id>` without touching production.
- Each source's `audit` command is the gate. Sources with accepted advisories (`audit-exceptions.json`) run their own `npm run audit`, which fails on anything not accepted there.
- Set `RELEASE_AUDIT_STRICT=0` only to explicitly continue past npm audit findings. This does not remediate them; default behavior is to stop on an audit failure.

Every page carries a small Ko-fi support footer (`https://ko-fi.com/prof_aufner`): a short sentence and the official Ko-fi logo as the link (`img/kofi_logo.svg` from Ko-fi's brand asset kit, self-hosted and unmodified). The landing page has it in its own footer; for games the release appends `scripts/support-footer.mjs` markup to every HTML page directly in the game folder (styles in `css/support-footer.css`, no inline styles, no Ko-fi scripts or widgets) and fails when an entry page lacks it. New games get it automatically. A game whose screen is a fixed full-viewport app sets `"supportFooter": "in-app"` in the manifest and renders the link itself (Venomous Snake: main menu); the release fails when its build does not contain the URL. The link is voluntary and addressed to adults (Prof. Aufner rule: never pushed at minors).

Each finished release writes `release-info.json` with exact source commit hashes. Temporary worktrees, staging output, and archives are kept under `.scratch/release/` and ignored by Git.

Buchstabenfährte and its English edition Themetrail come from one repository (`buchstabenfaehrte`) as two manifest sources with different build commands: `/teens/buchstabenfaehrte/` (`npm run build`, `dist`) and `/teens/themetrail/` (`npm run build:en`, `dist-en`).

Sudoku (`sudoku-grove`, public) is listed at `/teens/sudoku/` with its learning pages (`info.html`, `techniken.html`, `programmieren.html`) in the same folder.

The Knots of Alderwick (repository `Adrixan/knots-of-alderwick` since 2026-11-08; the old `Adrixan/Cast-Game` is archived and no longer built) is listed at `/teens/knots-of-alderwick/` since 2026-11-09. The game is English-language and retains its own visual design; it is not presented as an installable or offline-capable PWA. Its Archive cases carry sources with a verified flag; the game marks unverified evidence (none at present).

Renamed routes keep their old URL through `redirects` in the manifest (`path`, `to` = a game path, `title`, `lang`): the release writes a static page at the old path (meta refresh, canonical link, plain link and the support footer; no script, so strict CSPs hold), deploys it like a route (replacing the old build there) and checks it live. Saves survive a rename because localStorage belongs to the origin. Current redirect: `/teens/cast-game/` to `/teens/knots-of-alderwick/`.

## GitHub Actions setup

The `Release Lernspiele` workflow can be started manually or through the `game-release` repository-dispatch event. Configure these Actions secrets:
- `LERNSPIELE_DEPLOY_TOKEN`: GitHub token with read access to all source repositories in `release-manifest.json` (currently six; the workflow clones each of them).
- `LERNSPIELE_SSH_KEY`: private deployment key for the hosting account.
- `LERNSPIELE_KNOWN_HOSTS`: pinned `known_hosts` line for the configured SSH hostname.
- `LERNSPIELE_SSH_HOST`: host name covered by the known-hosts entry.
- `LERNSPIELE_SSH_USER`: Plesk SSH account username.

For automatic release notifications, configure `LERNSPIELE_DISPATCH_TOKEN` in each source repository that has a notify workflow (trainer-engine, Venomous Snake, Pascal, LinguaFusion, sudoku-grove; sudoku-grove notifies only after its CI passed on `main`). It needs permission to dispatch events to `Adrixan/lernspiele.aufner.org` (typically a fine-grained token with Actions read/write permission). Without this secret, source pushes succeed and log that automatic deployment was skipped; run the site workflow manually instead.

The SSH account must have a writable home directory, `bash`, `tar`, `sha256sum`, and the existing `~/lernspiele.aufner.org/` document root. The workflow does not deploy unless the production audit gates, tests, builds, and path validation all pass.
