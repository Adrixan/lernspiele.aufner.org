import { useState, useCallback, useMemo } from 'react';
const STORAGE_KEY = 'vs-tutor-progress';
function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw !== null) {
            const parsed = JSON.parse(raw);
            if (typeof parsed === 'object' && parsed !== null) {
                const p = parsed;
                return {
                    completedChallenges: Array.isArray(p['completedChallenges'])
                        ? p['completedChallenges']
                        : [],
                    currentChapterId: typeof p['currentChapterId'] === 'number' ? p['currentChapterId'] : 1,
                    currentChallengeId: typeof p['currentChallengeId'] === 'string' ? p['currentChallengeId'] : null,
                };
            }
        }
    }
    catch {
        // ignore
    }
    return { completedChallenges: [], currentChapterId: 1, currentChallengeId: null };
}
function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    catch {
        // ignore
    }
}
export function useTutorProgress() {
    const [progress, setProgress] = useState(loadProgress);
    const isCompleted = useCallback((challengeId) => progress.completedChallenges.includes(challengeId), [progress.completedChallenges]);
    const completeChallenge = useCallback((challengeId) => {
        setProgress((prev) => {
            if (prev.completedChallenges.includes(challengeId))
                return prev;
            const next = {
                ...prev,
                completedChallenges: [...prev.completedChallenges, challengeId],
            };
            saveProgress(next);
            return next;
        });
    }, []);
    const setCurrentChapter = useCallback((chapterId) => {
        setProgress((prev) => {
            const next = { ...prev, currentChapterId: chapterId };
            saveProgress(next);
            return next;
        });
    }, []);
    const setCurrentChallenge = useCallback((challengeId) => {
        setProgress((prev) => {
            const next = { ...prev, currentChallengeId: challengeId };
            saveProgress(next);
            return next;
        });
    }, []);
    const resetProgress = useCallback(() => {
        const initial = {
            completedChallenges: [],
            currentChapterId: 1,
            currentChallengeId: null,
        };
        saveProgress(initial);
        setProgress(initial);
    }, []);
    const completedCount = useMemo(() => progress.completedChallenges.length, [progress.completedChallenges]);
    return {
        progress,
        isCompleted,
        completeChallenge,
        setCurrentChapter,
        setCurrentChallenge,
        resetProgress,
        completedCount,
    };
}
//# sourceMappingURL=useTutorProgress.js.map