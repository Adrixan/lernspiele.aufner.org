import type { Challenge, ChallengeProgress, CurriculumProgress, Chapter } from '@venomous-snake/shared-types';
export declare class ProgressionManager {
    private progress;
    constructor(savedProgress?: CurriculumProgress);
    isUnlocked(challenge: Challenge): boolean;
    markCompleted(challenge: Challenge, timeMs: number, hintsUsed: number, code: string): void;
    recordAttempt(challengeId: string, code: string): void;
    getProgress(): CurriculumProgress;
    getChallengeProgress(challengeId: string): ChallengeProgress | undefined;
    getChapterCompletion(chapter: Chapter): {
        completed: number;
        total: number;
        percentage: number;
    };
    unlockFloor(floorId: string): void;
    toJSON(): CurriculumProgress;
}
//# sourceMappingURL=ProgressionManager.d.ts.map