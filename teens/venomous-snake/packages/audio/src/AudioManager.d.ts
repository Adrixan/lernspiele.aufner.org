export type AudioCategory = 'music' | 'sfx' | 'ui' | 'ambient';
export interface AudioTrack {
    id: string;
    category: AudioCategory;
    src: string | string[];
    loop?: boolean;
    volume?: number;
    fadeInMs?: number;
    fadeOutMs?: number;
}
export declare class AudioManager {
    private readonly howls;
    private readonly tracks;
    private readonly volumes;
    private masterVolume;
    private muted;
    private currentMusicId;
    private currentMusicHowl;
    constructor();
    /**
     * Preload a batch of tracks. Missing audio files are handled gracefully —
     * a warning is logged but the promise still resolves so the game can continue.
     */
    preload(tracks: AudioTrack[]): Promise<void>;
    play(trackId: string): void;
    stop(trackId: string): void;
    pause(trackId: string): void;
    resume(trackId: string): void;
    playMusic(trackId: string, fadeMs?: number): void;
    stopMusic(fadeMs?: number): void;
    setMasterVolume(volume: number): void;
    getMasterVolume(): number;
    setCategoryVolume(category: AudioCategory, volume: number): void;
    getCategoryVolume(category: AudioCategory): number;
    mute(): void;
    unmute(): void;
    isMuted(): boolean;
    destroy(): void;
    /** Effective per-howl volume = category volume × relative track volume. */
    private computeVolume;
}
//# sourceMappingURL=AudioManager.d.ts.map