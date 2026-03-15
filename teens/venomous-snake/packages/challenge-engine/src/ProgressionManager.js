export class ProgressionManager {
    progress;
    constructor(savedProgress) {
        this.progress = savedProgress ?? {
            challenges: {},
            currentChapter: 1,
            totalXp: 0,
            completedChallenges: 0,
            unlockedFloors: ['lobby'],
        };
    }
    isUnlocked(challenge) {
        return challenge.prerequisites.every((prereqId) => {
            const prereqProgress = this.progress.challenges[prereqId];
            return prereqProgress?.completed === true;
        });
    }
    markCompleted(challenge, timeMs, hintsUsed, code) {
        const existing = this.progress.challenges[challenge.id];
        const attempts = (existing?.attempts ?? 0) + 1;
        const bestTime = existing?.bestTime !== undefined
            ? Math.min(existing.bestTime, timeMs)
            : timeMs;
        this.progress.challenges[challenge.id] = {
            challengeId: challenge.id,
            completed: true,
            bestTime,
            attempts,
            hintsUsed: (existing?.hintsUsed ?? 0) + hintsUsed,
            completedAt: new Date().toISOString(),
            lastCode: code,
        };
        if (existing?.completed !== true) {
            this.progress.totalXp += challenge.xpReward;
            this.progress.completedChallenges += 1;
        }
    }
    recordAttempt(challengeId, code) {
        const existing = this.progress.challenges[challengeId];
        this.progress.challenges[challengeId] = {
            challengeId,
            completed: existing?.completed ?? false,
            ...(existing?.bestTime !== undefined ? { bestTime: existing.bestTime } : {}),
            attempts: (existing?.attempts ?? 0) + 1,
            hintsUsed: existing?.hintsUsed ?? 0,
            ...(existing?.completedAt !== undefined ? { completedAt: existing.completedAt } : {}),
            ...(existing?.lastCode !== undefined ? { lastCode: code } : { lastCode: code }),
        };
    }
    getProgress() {
        return { ...this.progress };
    }
    getChallengeProgress(challengeId) {
        return this.progress.challenges[challengeId];
    }
    getChapterCompletion(chapter) {
        const total = chapter.challenges.length;
        const completed = chapter.challenges.filter((id) => this.progress.challenges[id]?.completed === true).length;
        return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
    }
    unlockFloor(floorId) {
        if (!this.progress.unlockedFloors.includes(floorId)) {
            this.progress.unlockedFloors.push(floorId);
        }
    }
    toJSON() {
        return structuredClone(this.progress);
    }
}
//# sourceMappingURL=ProgressionManager.js.map