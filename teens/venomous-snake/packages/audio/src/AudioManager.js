import { Howl, Howler } from 'howler';
export class AudioManager {
    howls = new Map();
    tracks = new Map();
    volumes = {
        music: 1,
        sfx: 1,
        ui: 1,
        ambient: 1,
    };
    masterVolume = 1;
    muted = false;
    currentMusicId = null;
    currentMusicHowl = null;
    constructor() {
        // Initialise Howler global volume
        Howler.volume(this.masterVolume);
    }
    // ---------------------------------------------------------------------------
    // Loading
    // ---------------------------------------------------------------------------
    /**
     * Preload a batch of tracks. Missing audio files are handled gracefully —
     * a warning is logged but the promise still resolves so the game can continue.
     */
    preload(tracks) {
        const promises = tracks.map((track) => {
            return new Promise((resolve) => {
                const src = Array.isArray(track.src) ? track.src : [track.src];
                const howl = new Howl({
                    src,
                    loop: track.loop ?? false,
                    volume: this.computeVolume(track.category, track.volume ?? 1),
                    preload: true,
                    onload: () => resolve(),
                    onloaderror: (_id, err) => {
                        console.warn(`[AudioManager] Failed to load "${track.id}":`, err);
                        resolve(); // Graceful degradation — don't crash
                    },
                });
                this.howls.set(track.id, howl);
                this.tracks.set(track.id, track);
            });
        });
        return Promise.all(promises).then(() => undefined);
    }
    // ---------------------------------------------------------------------------
    // Playback
    // ---------------------------------------------------------------------------
    play(trackId) {
        const howl = this.howls.get(trackId);
        if (!howl) {
            console.warn(`[AudioManager] play — track not found: "${trackId}"`);
            return;
        }
        howl.play();
    }
    stop(trackId) {
        this.howls.get(trackId)?.stop();
    }
    pause(trackId) {
        this.howls.get(trackId)?.pause();
    }
    resume(trackId) {
        // Howler resumes a paused sound via play()
        this.howls.get(trackId)?.play();
    }
    // ---------------------------------------------------------------------------
    // Music — crossfade between tracks
    // ---------------------------------------------------------------------------
    playMusic(trackId, fadeMs = 1000) {
        if (this.currentMusicId === trackId)
            return;
        const nextHowl = this.howls.get(trackId);
        if (!nextHowl) {
            console.warn(`[AudioManager] playMusic — track not found: "${trackId}"`);
            return;
        }
        // Fade out the current music track
        if (this.currentMusicHowl) {
            const outgoing = this.currentMusicHowl;
            outgoing.fade(outgoing.volume(), 0, fadeMs);
            setTimeout(() => outgoing.stop(), fadeMs);
        }
        const track = this.tracks.get(trackId);
        const targetVol = this.computeVolume('music', track?.volume ?? 1);
        nextHowl.volume(0);
        nextHowl.play();
        nextHowl.fade(0, targetVol, fadeMs);
        this.currentMusicId = trackId;
        this.currentMusicHowl = nextHowl;
    }
    stopMusic(fadeMs = 1000) {
        if (!this.currentMusicHowl)
            return;
        const outgoing = this.currentMusicHowl;
        outgoing.fade(outgoing.volume(), 0, fadeMs);
        setTimeout(() => outgoing.stop(), fadeMs);
        this.currentMusicId = null;
        this.currentMusicHowl = null;
    }
    // ---------------------------------------------------------------------------
    // Volume
    // ---------------------------------------------------------------------------
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        Howler.volume(this.masterVolume);
    }
    getMasterVolume() {
        return this.masterVolume;
    }
    setCategoryVolume(category, volume) {
        const clamped = Math.max(0, Math.min(1, volume));
        this.volumes[category] = clamped;
        // Update all currently loaded howls in this category
        for (const [id, howl] of this.howls) {
            const track = this.tracks.get(id);
            if (track?.category === category) {
                howl.volume(this.computeVolume(category, track.volume ?? 1));
            }
        }
    }
    getCategoryVolume(category) {
        return this.volumes[category];
    }
    // ---------------------------------------------------------------------------
    // Mute
    // ---------------------------------------------------------------------------
    mute() {
        this.muted = true;
        Howler.mute(true);
    }
    unmute() {
        this.muted = false;
        Howler.mute(false);
    }
    isMuted() {
        return this.muted;
    }
    // ---------------------------------------------------------------------------
    // Cleanup
    // ---------------------------------------------------------------------------
    destroy() {
        for (const howl of this.howls.values()) {
            howl.unload();
        }
        this.howls.clear();
        this.tracks.clear();
        this.currentMusicId = null;
        this.currentMusicHowl = null;
    }
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    /** Effective per-howl volume = category volume × relative track volume. */
    computeVolume(category, relativeVolume) {
        return this.volumes[category] * Math.max(0, Math.min(1, relativeVolume));
    }
}
//# sourceMappingURL=AudioManager.js.map