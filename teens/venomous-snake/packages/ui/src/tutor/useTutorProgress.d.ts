export interface TutorProgress {
    completedChallenges: string[];
    currentChapterId: number;
    currentChallengeId: string | null;
}
export interface UseTutorProgressReturn {
    progress: TutorProgress;
    isCompleted: (challengeId: string) => boolean;
    completeChallenge: (challengeId: string) => void;
    setCurrentChapter: (chapterId: number) => void;
    setCurrentChallenge: (challengeId: string | null) => void;
    resetProgress: () => void;
    completedCount: number;
}
export declare function useTutorProgress(): UseTutorProgressReturn;
//# sourceMappingURL=useTutorProgress.d.ts.map