export interface LevelThreshold {
    level: number;
    xpRequired: number;
    title: string;
    titleKey: string;
}
export declare const LEVEL_THRESHOLDS: LevelThreshold[];
export declare class XPSystem {
    /** Returns the highest level threshold the player has reached. */
    getLevelForXP(xp: number): LevelThreshold;
    /** Returns how far the player is between the current level and the next. */
    getProgressToNextLevel(xp: number): {
        current: number;
        needed: number;
        percentage: number;
    };
    /**
     * Calculates the XP reward for completing a challenge, applying bonuses for
     * first-try completions, hint-free runs, and speed.
     */
    calculateXPReward(baseXP: number, attempts: number, hintsUsed: number, timeMs: number): number;
}
//# sourceMappingURL=XPSystem.d.ts.map