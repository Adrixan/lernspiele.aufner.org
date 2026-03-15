/**
 * Simple timer for tracking challenge elapsed time.
 * Supports pause/resume and provides millisecond precision.
 */
export declare class ChallengeTimer {
    private startTime;
    private pausedTime;
    private pauseStart;
    private paused;
    start(): void;
    pause(): void;
    resume(): void;
    /** Stops the timer and returns elapsed milliseconds (0 if not started). */
    stop(): number;
    reset(): void;
    getElapsedMs(): number;
    isRunning(): boolean;
}
//# sourceMappingURL=ChallengeTimer.d.ts.map