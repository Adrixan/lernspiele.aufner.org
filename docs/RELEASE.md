# Release workflow

The release manifest (`release-manifest.json`) is the authoritative inventory of all 27 public game routes and their source repositories. The root `index.html` remains the curated presentation; a validator fails when its links differ from the manifest.

## Local release

Run `npm run release` from this repository. It fetches each source repository's current GitHub default branch, builds in disposable Git worktrees (leaving adjacent checkouts untouched), runs checks and dependency audits, assembles the site, checks all 27 game entry points and bundled HTML/JS/CSS/JSON for Google Fonts references, creates a server-side backup, deploys, and verifies SHA-256 checksums.

Other commands:
- `npm run release:dry-run`: fetch sources and report their exact revisions without installing or deploying.
- `npm run release:build`: build and validate into `.scratch/release/site/<release-id>` without touching production.
- Set `RELEASE_AUDIT_STRICT=0` only to explicitly continue past npm audit findings. This does not remediate them; default behavior is to stop on an audit failure.

Each finished release writes `release-info.json` with exact source commit hashes. Temporary worktrees, staging output, and archives are kept under `.scratch/release/` and ignored by Git.

## GitHub Actions setup

The `Release Lernspiele` workflow can be started manually or through the `game-release` repository-dispatch event. Configure these Actions secrets:
- `LERNSPIELE_DEPLOY_TOKEN`: GitHub token with read access to all four source repositories.
- `LERNSPIELE_SSH_KEY`: private deployment key for the hosting account.
- `LERNSPIELE_KNOWN_HOSTS`: pinned `known_hosts` line for the configured SSH hostname.
- `LERNSPIELE_SSH_HOST`: host name covered by the known-hosts entry.
- `LERNSPIELE_SSH_USER`: Plesk SSH account username.

The SSH account must have a writable home directory, `bash`, `tar`, `sha256sum`, and the existing `~/lernspiele.aufner.org/` document root. The workflow does not deploy unless the production audit gates, tests, builds, and path validation all pass.
