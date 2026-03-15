/**
 * ProceduralAudio — generates placeholder sounds using the Web Audio API.
 * All buffers are rendered once via OfflineAudioContext and cached.
 * Every public method is browser-safe (guarded by the typeof window check).
 */
export declare class ProceduralAudio {
    private static readonly cache;
    private static render;
    /** Short click/tap — white noise burst through HPF. */
    static generateFootstep(): Promise<AudioBuffer | null>;
    /** Electronic whoosh up — sawtooth sweep from 150 Hz → 1400 Hz. */
    static generateTerminalOpen(): Promise<AudioBuffer | null>;
    /** Reverse whoosh — sawtooth sweep from 1400 Hz → 150 Hz. */
    static generateTerminalClose(): Promise<AudioBuffer | null>;
    /** Soft click — brief filtered noise. */
    static generateKeypress(): Promise<AudioBuffer | null>;
    /** Two-step processing beep — square wave at 440 Hz then 880 Hz. */
    static generateCodeSubmit(): Promise<AudioBuffer | null>;
    /** Ascending chime — C5, E5, G5 with harmonic overtone. */
    static generateSuccess(): Promise<AudioBuffer | null>;
    /** Descending buzz — sawtooth sweep downward with LPF close. */
    static generateFailure(): Promise<AudioBuffer | null>;
    /** Fanfare — 5 ascending notes: C5, E5, G5, B5, C6. */
    static generateAchievement(): Promise<AudioBuffer | null>;
    /** Mechanical hum + elevator ding at the end. */
    static generateElevator(): Promise<AudioBuffer | null>;
    /** Short blip for typewriter effect. */
    static generateDialogBlip(): Promise<AudioBuffer | null>;
    /** Electronic chirp — square wave frequency sweep with bandpass. */
    static generateCipherGreeting(): Promise<AudioBuffer | null>;
    /**
     * Low-frequency drone — layered saws + sines with per-layer pitch LFO and
     * a slowly sweeping lowpass filter for organic movement.
     * Designed to loop seamlessly (6 s buffer).
     */
    static generateAmbientHum(): Promise<AudioBuffer | null>;
    /**
     * Cyberpunk noir background music — deep sub drone, sawtooth bass line,
     * soft kick, swung hi-hats, atmospheric pad and noise sweep accents.
     *
     * 16-second loopable buffer at 90 BPM (6 bars of 4/4).
     * Structure: bars 1-3 (section A) → bars 4-6 (section B with 8th-note fills).
     * Evokes Blade Runner / Deus Ex atmosphere.
     */
    static generateCyberpunkBeat(): Promise<AudioBuffer | null>;
    /** Pre-generate every buffer. Should be called after the first user gesture. */
    static preloadAll(): Promise<void>;
}
//# sourceMappingURL=ProceduralAudio.d.ts.map