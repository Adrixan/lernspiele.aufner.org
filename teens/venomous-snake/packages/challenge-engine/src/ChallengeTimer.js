/**
 * Simple timer for tracking challenge elapsed time.
 * Supports pause/resume and provides millisecond precision.
 */
export class ChallengeTimer {
    startTime = null;
    pausedTime = 0;
    pauseStart = null;
    paused = false;
    start() {
        this.startTime = Date.now();
        this.pausedTime = 0;
        this.pauseStart = null;
        this.paused = false;
    }
    pause() {
        if (this.paused || this.startTime === null)
            return;
        this.paused = true;
        this.pauseStart = Date.now();
    }
    resume() {
        if (!this.paused || this.pauseStart === null)
            return;
        this.pausedTime += Date.now() - this.pauseStart;
        this.pauseStart = null;
        this.paused = false;
    }
    /** Stops the timer and returns elapsed milliseconds (0 if not started). */
    stop() {
        const elapsed = this.getElapsedMs();
        this.reset();
        return elapsed;
    }
    reset() {
        this.startTime = null;
        this.pausedTime = 0;
        this.pauseStart = null;
        this.paused = false;
    }
    getElapsedMs() {
        if (this.startTime === null)
            return 0;
        const now = Date.now();
        const currentPause = this.pauseStart !== null ? now - this.pauseStart : 0;
        return now - this.startTime - this.pausedTime - currentPause;
    }
    isRunning() {
        return this.startTime !== null && !this.paused;
    }
}
//# sourceMappingURL=ChallengeTimer.js.map