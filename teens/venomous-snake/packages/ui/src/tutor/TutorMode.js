import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { challengeMap, chapters } from '@venomous-snake/challenges';
import { HackingTerminal } from '../terminal/HackingTerminal';
import { useTutorProgress } from './useTutorProgress';
import './tutor.css';
/** Convert keys like "chapters.ch01.title" to "chapters:ch01.title" for i18next namespace resolution */
function nsKey(key) {
    const dot = key.indexOf('.');
    if (dot === -1)
        return key;
    return key.substring(0, dot) + ':' + key.substring(dot + 1);
}
export function TutorMode({ onBack }) {
    const { t } = useTranslation(['ui', 'chapters', 'challenges']);
    const { progress, isCompleted, completeChallenge, setCurrentChapter, setCurrentChallenge, resetProgress, completedCount, } = useTutorProgress();
    const [activeChallengeId, setActiveChallengeId] = useState(progress.currentChallengeId);
    const [selectedChapter, setSelectedChapter] = useState(progress.currentChapterId);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const totalChallenges = useMemo(() => chapters.reduce((sum, ch) => sum + ch.challenges.length, 0), []);
    const isChapterUnlocked = useCallback((chapter) => {
        if (chapter.id === 1)
            return true;
        const prevChapter = chapters.find((c) => c.id === chapter.id - 1);
        if (!prevChapter)
            return true;
        return prevChapter.challenges.every((cId) => isCompleted(cId));
    }, [isCompleted]);
    const currentChapter = useMemo(() => chapters.find((c) => c.id === selectedChapter) ?? chapters[0], [selectedChapter]);
    const activeChallenge = useMemo(() => (activeChallengeId !== null ? (challengeMap[activeChallengeId] ?? null) : null), [activeChallengeId]);
    const handleSelectChapter = useCallback((chapterId) => {
        setSelectedChapter(chapterId);
        setCurrentChapter(chapterId);
    }, [setCurrentChapter]);
    const handleSelectChallenge = useCallback((challengeId) => {
        setActiveChallengeId(challengeId);
        setCurrentChallenge(challengeId);
    }, [setCurrentChallenge]);
    const handleChallengeSuccess = useCallback((challengeId, _xpEarned) => {
        completeChallenge(challengeId);
    }, [completeChallenge]);
    const handleCloseTerminal = useCallback(() => {
        setActiveChallengeId(null);
        setCurrentChallenge(null);
    }, [setCurrentChallenge]);
    const handleNextChallenge = useCallback(() => {
        if (!currentChapter || !activeChallengeId)
            return;
        const currentIdx = currentChapter.challenges.indexOf(activeChallengeId);
        if (currentIdx < currentChapter.challenges.length - 1) {
            const nextId = currentChapter.challenges[currentIdx + 1];
            if (nextId !== undefined) {
                handleSelectChallenge(nextId);
            }
        }
        else {
            // Move to next chapter's first challenge
            const nextChapter = chapters.find((c) => c.id === currentChapter.id + 1);
            if (nextChapter && isChapterUnlocked(nextChapter)) {
                const firstChallenge = nextChapter.challenges[0];
                if (firstChallenge !== undefined) {
                    handleSelectChapter(nextChapter.id);
                    handleSelectChallenge(firstChallenge);
                }
            }
        }
    }, [
        currentChapter,
        activeChallengeId,
        handleSelectChallenge,
        handleSelectChapter,
        isChapterUnlocked,
    ]);
    const handleResetProgress = useCallback(() => {
        resetProgress();
        setSelectedChapter(1);
        setActiveChallengeId(null);
        setShowResetConfirm(false);
    }, [resetProgress]);
    // Full-screen terminal when a challenge is active
    if (activeChallenge !== null && activeChallengeId !== null) {
        return (_jsxs("div", { className: "tutor-terminal-wrapper", children: [_jsxs("div", { className: "tutor-terminal-header", children: [_jsxs("button", { className: "tutor-btn tutor-btn-back", onClick: handleCloseTerminal, children: ["\u2190 ", t('ui:tutorial.back_to_menu', 'Back')] }), _jsxs("span", { className: "tutor-terminal-title", children: ["CH", String(activeChallenge.chapter).padStart(2, '0'), ".", String(activeChallenge.order).padStart(2, '0'), " \u2014 ", t(nsKey(activeChallenge.titleKey))] }), isCompleted(activeChallengeId) && (_jsxs("button", { className: "tutor-btn tutor-btn-next", onClick: handleNextChallenge, children: [t('ui:tutorial.next_challenge', 'Next Challenge'), " \u2192"] }))] }), _jsx("div", { className: "tutor-terminal-content", children: _jsx(HackingTerminal, { challengeId: activeChallengeId, onClose: handleCloseTerminal, onChallengeSuccess: handleChallengeSuccess }, activeChallengeId) })] }));
    }
    // Challenge browser view
    return (_jsxs("div", { className: "tutor-container", children: [_jsxs("div", { className: "tutor-header", children: [_jsxs("button", { className: "tutor-btn tutor-btn-back", onClick: onBack, children: ["\u2190 ", t('ui:tutorial.back_to_menu', 'Back to Menu')] }), _jsxs("div", { className: "tutor-header-title", children: [_jsx("h1", { children: t('ui:tutorial.title', 'PYTHON TUTORIAL') }), _jsx("p", { children: t('ui:tutorial.subtitle', 'Learn Python step by step') })] }), _jsxs("div", { className: "tutor-header-progress", children: [_jsxs("span", { className: "tutor-progress-text", children: [t('ui:tutorial.progress', 'Progress'), ": ", completedCount, "/", totalChallenges] }), _jsx("div", { className: "tutor-progress-bar", children: _jsx("div", { className: "tutor-progress-fill", style: { width: `${(completedCount / totalChallenges) * 100}%` } }) })] })] }), _jsxs("div", { className: "tutor-body", children: [_jsxs("nav", { className: "tutor-sidebar", "aria-label": "Chapters", children: [chapters.map((chapter) => {
                                const unlocked = isChapterUnlocked(chapter);
                                const chCompleted = chapter.challenges.filter((cId) => isCompleted(cId)).length;
                                const isActive = chapter.id === selectedChapter;
                                return (_jsxs("button", { className: `tutor-chapter-btn ${isActive ? 'active' : ''} ${!unlocked ? 'locked' : ''}`, onClick: () => unlocked && handleSelectChapter(chapter.id), disabled: !unlocked, "aria-current": isActive ? 'true' : undefined, children: [_jsx("span", { className: "tutor-chapter-num", children: unlocked ? String(chapter.id).padStart(2, '0') : '🔒' }), _jsxs("span", { className: "tutor-chapter-info", children: [_jsx("span", { className: "tutor-chapter-name", children: t(nsKey(chapter.titleKey)) }), _jsxs("span", { className: "tutor-chapter-progress", children: [chCompleted, "/", chapter.challenges.length] })] }), chCompleted === chapter.challenges.length && unlocked && (_jsx("span", { className: "tutor-chapter-check", children: "\u2713" }))] }, chapter.id));
                            }), _jsx("div", { className: "tutor-sidebar-spacer" }), _jsx("button", { className: "tutor-btn tutor-btn-reset", onClick: () => setShowResetConfirm(true), children: t('ui:tutorial.reset_progress', 'Reset Progress') })] }), _jsx("main", { className: "tutor-challenges", children: currentChapter && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "tutor-challenges-header", children: [_jsxs("h2", { children: [t('ui:tutorial.chapter', 'Chapter'), " ", currentChapter.id, ":", ' ', t(nsKey(currentChapter.titleKey))] }), _jsx("p", { className: "tutor-challenges-desc", children: t(nsKey(currentChapter.descriptionKey)) })] }), _jsx("div", { className: "tutor-challenge-list", children: currentChapter.challenges.map((challengeId, index) => {
                                        const challenge = challengeMap[challengeId];
                                        if (!challenge)
                                            return null;
                                        const completed = isCompleted(challengeId);
                                        const prevCompleted = index === 0 || isCompleted(currentChapter.challenges[index - 1] ?? '');
                                        return (_jsxs("button", { className: `tutor-challenge-card ${completed ? 'completed' : ''} ${!prevCompleted ? 'locked' : ''}`, onClick: () => prevCompleted && handleSelectChallenge(challengeId), disabled: !prevCompleted, children: [_jsx("span", { className: "tutor-challenge-status", children: completed ? '✓' : prevCompleted ? '▶' : '○' }), _jsxs("span", { className: "tutor-challenge-info", children: [_jsxs("span", { className: "tutor-challenge-title", children: [String(challenge.order).padStart(2, '0'), ". ", t(nsKey(challenge.titleKey))] }), _jsxs("span", { className: "tutor-challenge-meta", children: [challenge.difficulty, " \u00B7 +", challenge.xpReward, " XP"] })] })] }, challengeId));
                                    }) })] })) })] }), showResetConfirm && (_jsx("div", { className: "tutor-modal-backdrop", onClick: () => setShowResetConfirm(false), children: _jsxs("div", { className: "tutor-modal", onClick: (e) => e.stopPropagation(), children: [_jsx("p", { children: t('ui:tutorial.reset_confirm', 'Are you sure? This will clear all tutorial progress.') }), _jsxs("div", { className: "tutor-modal-actions", children: [_jsx("button", { className: "tutor-btn", onClick: () => setShowResetConfirm(false), children: "Cancel" }), _jsx("button", { className: "tutor-btn tutor-btn-danger", onClick: handleResetProgress, children: "Reset" })] })] }) }))] }));
}
//# sourceMappingURL=TutorMode.js.map