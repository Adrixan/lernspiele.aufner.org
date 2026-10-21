#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
    cpSync,
    existsSync,
    lstatSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'release-manifest.json'), 'utf8'));
const scratchRoot = resolve(root, '.scratch', 'release');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const noDeploy = args.has('--no-deploy');
const allowedArgs = new Set(['--dry-run', '--no-deploy']);
for (const arg of args) {
    if (!allowedArgs.has(arg)) throw new Error(`Unknown argument: ${arg}`);
}

const expectedGames = [
    'kids/daz', 'kids/deutsch', 'kids/englisch', 'kids/kunst', 'kids/mathematik', 'kids/musik', 'kids/sachunterricht', 'kids/technik',
    'teens/biologie', 'teens/bko', 'teens/chemie', 'teens/deutsch', 'teens/digitale', 'teens/englisch', 'teens/geographie', 'teens/geschichte',
    'teens/in-memoriam-pascal', 'teens/kunst', 'teens/latein', 'teens/linguafusion', 'teens/mathematik', 'teens/musik', 'teens/physik', 'teens/religion',
    'teens/sport', 'teens/technik', 'teens/venomous-snake',
];
const rootFiles = ['index.html', 'css', 'js', 'fonts', 'favicon.svg', 'LICENSE'];
const worktrees = [];

function run(command, commandArgs, options = {}) {
    const capture = options.stdio === 'pipe';
    const output = { stdout: '', stderr: '' };
    const environment = { ...process.env, ...(options.env ?? {}) };
    if (options.npmCommand) {
        delete environment.NPM_CONFIG_ALLOW_SCRIPTS;
        delete environment.npm_config_allow_scripts;
    }
    return new Promise((resolvePromise, rejectPromise) => {
        const child = spawn(command, commandArgs, {
            cwd: options.cwd ?? root,
            env: environment,
            stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
        });
        if (capture) {
            child.stdout.setEncoding('utf8').on('data', (chunk) => { output.stdout += chunk; });
            child.stderr.setEncoding('utf8').on('data', (chunk) => { output.stderr += chunk; });
        }
        child.on('error', rejectPromise);
        child.on('close', (code) => {
            if (code === 0) resolvePromise(capture ? output.stdout.trim() : '');
            else rejectPromise(new Error(`${[command, ...commandArgs].join(' ')} failed with exit code ${code ?? 'unknown'}${output.stderr ? `: ${output.stderr.trim()}` : ''}`));
        });
    });
}

function checkPathWithin(base, candidate) {
    const resolvedBase = resolve(base);
    const resolvedCandidate = resolve(candidate);
    if (resolvedCandidate !== resolvedBase && !resolvedCandidate.startsWith(`${resolvedBase}${sep}`)) {
        throw new Error(`Path escapes its expected directory: ${candidate}`);
    }
    return resolvedCandidate;
}

function validateManifest() {
    if (manifest.version !== 1 || Object.keys(manifest.sources).length !== 4 || manifest.games.length !== 27) {
        throw new Error('Release manifest must define the four sources and all 27 public game paths.');
    }
    if (!/^[A-Za-z0-9._@-]+$/.test(manifest.deployment.sshHost) || !/^[A-Za-z0-9.-]+$/.test(manifest.deployment.remoteDocroot)) {
        throw new Error('Deployment host or document root contains unsupported characters.');
    }
    const paths = manifest.games.map((game) => game.path);
    if (new Set(paths).size !== paths.length || [...paths].sort().join('\n') !== [...expectedGames].sort().join('\n')) {
        throw new Error('Release manifest game paths do not exactly match the supported site catalog.');
    }
    for (const game of manifest.games) {
        if (!/^(kids|teens)\/[a-z0-9-]+$/.test(game.path) || !manifest.sources[game.source]) {
            throw new Error(`Invalid game entry: ${JSON.stringify(game)}`);
        }
    }
    for (const source of Object.values(manifest.sources)) {
        for (const command of [source.install, source.audit, ...source.checks, source.build]) {
            if (!Array.isArray(command) || command.length < 1 || command.some((part) => typeof part !== 'string')) {
                throw new Error('Every source command must be an argument array.');
            }
        }
    }
}

async function fetchLatest(sourceName, sourceConfig, worktreeRoot) {
    const sourceRepo = resolve(root, sourceConfig.path);
    if (!existsSync(join(sourceRepo, '.git'))) throw new Error(`Source repository is missing: ${sourceRepo}`);
    const remote = await run('git', ['-C', sourceRepo, 'remote', 'get-url', 'origin'], { stdio: 'pipe' });
    const normalizedRemote = remote.replace(/\.git$/, '').replace(':', '/').toLowerCase();
    const expectedRemote = `github.com/${sourceConfig.repository}`.toLowerCase();
    if (!normalizedRemote.includes(expectedRemote)) {
        throw new Error(`${sourceName} origin is ${remote}; expected ${sourceConfig.repository} on GitHub.`);
    }

    const headInfo = await run('git', ['-C', sourceRepo, 'ls-remote', '--symref', 'origin', 'HEAD'], { stdio: 'pipe' });
    const branch = headInfo.match(/^ref: refs\/heads\/([^\s]+)\s+HEAD$/m)?.[1];
    if (!branch) throw new Error(`Could not identify ${sourceName}'s GitHub default branch.`);
    await run('git', ['-C', sourceRepo, 'fetch', '--quiet', 'origin', `+refs/heads/${branch}:refs/remotes/origin/${branch}`]);
    const commit = await run('git', ['-C', sourceRepo, 'rev-parse', `refs/remotes/origin/${branch}`], { stdio: 'pipe' });
    const checkout = checkPathWithin(worktreeRoot, join(worktreeRoot, sourceName));
    mkdirSync(dirname(checkout), { recursive: true });
    await run('git', ['-C', sourceRepo, 'worktree', 'add', '--detach', checkout, commit]);
    worktrees.push({ sourceRepo, checkout });

    if (sourceConfig.submodules) {
        await run('git', ['-C', checkout, 'submodule', 'update', '--init', '--recursive']);
    }
    console.log(`${sourceName}: ${branch}@${commit.slice(0, 12)}`);
    return { checkout, branch, commit };
}

async function executeCommand(sourceName, checkout, command) {
    const [program, ...rawCommandArgs] = command;
    const commandArgs = program === 'npm' ? ['--globalconfig=/dev/null', '--userconfig=/dev/null', ...rawCommandArgs] : rawCommandArgs;
    console.log(`\n[${sourceName}] ${command.join(' ')}`);
    let priorPackageJson;
    if (program === 'npm' && rawCommandArgs[0] === 'ci') {
        const packageJsonPath = join(checkout, 'package.json');
        priorPackageJson = readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(priorPackageJson);
        packageJson.allowScripts = { ...packageJson.allowScripts, esbuild: true };
        writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
    }
    try {
        await run(program, commandArgs, { cwd: checkout, npmCommand: program === 'npm' });
    } finally {
        if (priorPackageJson !== undefined) writeFileSync(join(checkout, 'package.json'), priorPackageJson);
    }
}

function copyGame(sourceName, output, gamePath, siteDir) {
    const sourcePath = sourceName === 'trainer-engine'
        ? resolve(output, gamePath)
        : resolve(output);
    if (sourceName === 'trainer-engine') checkPathWithin(output, sourcePath);
    const destination = checkPathWithin(siteDir, join(siteDir, gamePath));
    if (!existsSync(join(sourcePath, 'index.html'))) throw new Error(`Build output has no index.html for ${gamePath}.`);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(sourcePath, destination, { recursive: true, force: true, errorOnExist: false });
}

function collectFiles(directory, prefix = '') {
    const files = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
        const stat = lstatSync(path);
        if (stat.isSymbolicLink()) throw new Error(`Symlinks are not allowed in release output: ${relativePath}`);
        if (entry.isDirectory()) files.push(...collectFiles(path, relativePath));
        else if (entry.isFile()) files.push(relativePath);
        else throw new Error(`Unsupported release artifact: ${relativePath}`);
    }
    return files;
}

function sha256(path) {
    return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function writeChecksums(siteDir) {
    const checksums = collectFiles(siteDir).sort().map((path) => `${sha256(join(siteDir, path))}  ./${path}`);
    writeFileSync(join(siteDir, 'checksums.sha256'), `${checksums.join('\n')}\n`);
}

function validateSite(siteDir) {
    const html = readFileSync(join(siteDir, 'index.html'), 'utf8');
    const linkedGames = [...html.matchAll(/href=["']\.\/(kids|teens)\/([a-z0-9-]+)\/?["']/g)]
        .map((match) => `${match[1]}/${match[2]}`);
    const expected = [...expectedGames].sort();
    const actual = [...new Set(linkedGames)].sort();
    if (actual.join('\n') !== expected.join('\n')) {
        throw new Error(`Landing-page links do not match the release catalog. Found ${actual.length} unique game links.`);
    }
    for (const game of expectedGames) {
        if (!existsSync(join(siteDir, game, 'index.html'))) throw new Error(`Missing built game: ${game}`);
    }
    const textFiles = collectFiles(siteDir).filter((path) => /\.(?:html|js|css|json|webmanifest)$/i.test(path));
    for (const path of textFiles) {
        const content = readFileSync(join(siteDir, path), 'utf8');
        if (/fonts\.(?:googleapis|gstatic)\.com/i.test(content)) {
            throw new Error(`External Google Fonts reference remains in ${path}`);
        }
    }
    const allHtml = textFiles.filter((path) => path.endsWith('.html'));
    console.log(`Validated ${expectedGames.length} game entry points and ${allHtml.length} HTML files; no Google Fonts requests.`);
}

function makeReleaseInfo(releases) {
    return {
        generatedAt: new Date().toISOString(),
        games: manifest.games.map(({ path, source }) => ({ path, source })),
        sources: Object.fromEntries(Object.entries(releases).map(([name, revision]) => [name, {
            repository: manifest.sources[name].repository,
            branch: revision.branch,
            commit: revision.commit,
        }])),
    };
}

function deployScript(releaseId) {
    const docroot = manifest.deployment.remoteDocroot;
    const remoteStage = `lernspiele-release-${releaseId}`;
    const backup = `lernspiele-backup-${releaseId}.tar.gz`;
    const routes = manifest.games.map((game) => game.path);
    const rootFilesToCopy = [...rootFiles, 'release-info.json', 'checksums.sha256'];
    return `set -euo pipefail
HOME_DIR="$HOME"
DOCROOT="$HOME_DIR/${docroot}"
STAGE="$HOME_DIR/${remoteStage}"
BACKUP="$HOME_DIR/${backup}"
test -d "$DOCROOT"
test ! -L "$DOCROOT"
test -f "$HOME_DIR/.lernspiele-upload-${releaseId}.tar"
mkdir -p "$STAGE"
tar -xf "$HOME_DIR/.lernspiele-upload-${releaseId}.tar" -C "$STAGE"
tar -czf "$BACKUP" -C "$HOME_DIR" "${docroot}"
rollback() {
  status=$?
  trap - EXIT
  if [ "$status" -ne 0 ]; then
    echo "Deploy failed; restoring backup $BACKUP" >&2
    tar -xzf "$BACKUP" -C "$HOME_DIR"
  fi
  exit "$status"
}
trap rollback EXIT
${routes.map((route) => `rm -rf "$DOCROOT/${route}"\nmkdir -p "$(dirname "$DOCROOT/${route}")"\ncp -a "$STAGE/${route}" "$DOCROOT/${route}"`).join('\n')}
${rootFilesToCopy.map((path) => `rm -rf "$DOCROOT/${path}"\ncp -a "$STAGE/${path}" "$DOCROOT/${path}"`).join('\n')}
cd "$DOCROOT"
sha256sum -c "$STAGE/checksums.sha256"
trap - EXIT
echo "Deploy verified. Backup: $BACKUP"
rm -rf "$STAGE"
rm -f "$HOME_DIR/.lernspiele-upload-${releaseId}.tar"
`;
}

async function deploy(siteDir, releaseId) {
    const archivePath = join(scratchRoot, 'site.tar.gz');
    await run('tar', ['-cf', archivePath, '-C', siteDir, '.']);
    const host = manifest.deployment.sshHost;
    const remoteDocroot = manifest.deployment.remoteDocroot;
    const upload = `.lernspiele-upload-${releaseId}.tar`;
    console.log(`\nDeploying ${releaseId} to ${manifest.deployment.sshHost}:~/${manifest.deployment.remoteDocroot}`);
    await run('scp', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=20', archivePath, `${host}:${upload}`]);
    const remoteScript = deployScript(releaseId);
    await new Promise((resolvePromise, rejectPromise) => {
        const ssh = spawn('ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=20', host, 'bash -s'], { stdio: ['pipe', 'inherit', 'inherit'] });
        ssh.on('error', rejectPromise);
        ssh.on('close', (code) => code === 0 ? resolvePromise() : rejectPromise(new Error(`SSH deploy failed with exit code ${code}.`)));
        ssh.stdin.end(`set -euo pipefail
cat > "$HOME/${upload}"
${remoteScript}`);
    });
    const remoteFiles = (await run('ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=20', host,
        `find "$HOME/${remoteDocroot}" -type f -print0 | sort -z | xargs -0 sha256sum`], { stdio: 'pipe' }));
    const remoteInventory = new Map(remoteFiles.split('\n').map((line) => {
        const match = line.match(/^([0-9a-f]{64})  (.+)$/);
        if (!match) throw new Error(`Invalid remote checksum entry: ${line}`);
        return [match[2], match[1]];
    }));
    const expectedFiles = collectFiles(siteDir);
    const missing = [];
    const mismatched = [];
    for (const file of expectedFiles) {
        const key = `${remoteDocroot}/${file}`;
        const remoteHash = remoteInventory.get(key);
        if (!remoteHash) missing.push(file);
        else if (remoteHash !== sha256(join(siteDir, file))) mismatched.push(file);
    }
    if (missing.length || mismatched.length) {
        throw new Error(`Post-deploy verification failed: ${missing.length} missing, ${mismatched.length} mismatched files. ${[...missing, ...mismatched].slice(0, 10).join(', ')}`);
    }
    const stale = [...remoteInventory.keys()].filter((path) => !expectedFiles.some((file) => path === `${remoteDocroot}/${file}`));
    console.log(`Post-deploy verification: ${expectedFiles.length} files match; ${stale.length} legacy/extraneous files remain in docroot.`);
}

async function preflightDeployment() {
    const command = `test -d "$HOME/${manifest.deployment.remoteDocroot}" && test ! -L "$HOME/${manifest.deployment.remoteDocroot}"`;
    console.log(`Checking SSH deployment target ${manifest.deployment.sshHost}.`);
    await run('ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=20', manifest.deployment.sshHost, command]);
}

async function main() {
    validateManifest();
    const releaseId = `${new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)}-${process.pid}`;
    const worktreeRoot = join(scratchRoot, 'sources', releaseId);
    const siteDir = join(scratchRoot, 'site', releaseId);
    mkdirSync(worktreeRoot, { recursive: true });
    mkdirSync(siteDir, { recursive: true });

    const releases = {};
    try {
        for (const [name, config] of Object.entries(manifest.sources)) {
            releases[name] = await fetchLatest(name, config, worktreeRoot);
        }
        if (dryRun) {
            console.log('\nDry run complete. No sources were built and production was not changed.');
            return;
        }
        if (!noDeploy) await preflightDeployment();

        for (const [name, config] of Object.entries(manifest.sources)) {
            const checkout = releases[name].checkout;
            await executeCommand(name, checkout, config.install);
            try {
                await executeCommand(name, checkout, config.audit);
            } catch (error) {
                console.warn(`Security audit warning for ${name}: ${error.message}`);
                if (process.env.RELEASE_AUDIT_STRICT !== '0') throw error;
            }
            for (const command of config.checks) await executeCommand(name, checkout, command);
            await executeCommand(name, checkout, config.build);
            const output = checkPathWithin(checkout, resolve(checkout, config.output));
            if (!existsSync(output)) throw new Error(`${name} did not create its expected build output ${config.output}.`);
            releases[name].output = output;
        }

        for (const path of rootFiles) {
            const source = resolve(root, path);
            if (!existsSync(source)) throw new Error(`Required site file is missing: ${path}`);
            const destination = checkPathWithin(siteDir, join(siteDir, path));
            mkdirSync(dirname(destination), { recursive: true });
            cpSync(source, destination, { recursive: true, force: true });
        }

        for (const game of manifest.games) {
            copyGame(game.source, releases[game.source].output, game.path, siteDir);
        }
        writeFileSync(join(siteDir, 'release-info.json'), `${JSON.stringify(makeReleaseInfo(releases), null, 2)}\n`);
        validateSite(siteDir);
        writeChecksums(siteDir);

        console.log(`\nRelease assembled at ${relative(root, siteDir)}.`);
        if (!noDeploy) await deploy(siteDir, releaseId);
        else console.log('Deployment skipped by --no-deploy.');
    } finally {
        for (const { sourceRepo, checkout } of worktrees.reverse()) {
            try {
                await run('git', ['-C', sourceRepo, 'worktree', 'remove', '--force', checkout], { stdio: 'pipe' });
            } catch (error) {
                console.warn(`Could not remove temporary worktree ${checkout}: ${error.message}`);
            }
        }
    }
}

main().catch((error) => {
    console.error(`Release failed: ${error.message}`);
    process.exitCode = 1;
});
