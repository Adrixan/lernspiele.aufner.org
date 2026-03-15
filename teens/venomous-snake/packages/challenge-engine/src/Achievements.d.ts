export type AchievementTrigger = {
    type: 'challenge_complete';
    challengeId: string;
} | {
    type: 'chapter_complete';
    chapter: number;
} | {
    type: 'first_try';
    challengeId: string;
} | {
    type: 'no_hints';
    challengeId: string;
} | {
    type: 'speed_run';
    challengeId: string;
    maxTimeMs: number;
} | {
    type: 'total_challenges';
    count: number;
} | {
    type: 'total_xp';
    amount: number;
} | {
    type: 'streak';
    count: number;
} | {
    type: 'floor_unlock';
    floor: string;
};
export interface Achievement {
    id: string;
    nameKey: string;
    descriptionKey: string;
    icon: string;
    trigger: AchievementTrigger;
    xpReward: number;
    secret: boolean;
}
export declare const ACHIEVEMENTS: Achievement[];
export declare class AchievementManager {
    private unlocked;
    constructor(unlockedAchievements?: string[]);
    /** Checks an event against all achievements; returns newly unlocked ones. */
    check(event: AchievementTrigger): Achievement[];
    private matchesTrigger;
    isUnlocked(achievementId: string): boolean;
    getAll(): Achievement[];
    getUnlocked(): Achievement[];
    toJSON(): string[];
}
//# sourceMappingURL=Achievements.d.ts.map