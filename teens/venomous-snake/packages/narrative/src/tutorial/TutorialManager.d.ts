import type { TutorialStep, TutorialTrigger } from './tutorial-steps';
export declare class TutorialManager {
    private state;
    constructor();
    /** True if the tutorial has been fully skipped by the player */
    isSkipped(): boolean;
    /** True if a specific step has already been completed */
    isStepCompleted(stepId: string): boolean;
    /** True if every step has been completed */
    isFullyCompleted(): boolean;
    /** Mark a step as done and persist. */
    completeStep(stepId: string): void;
    /** Skip the entire tutorial. Persisted so it does not reappear on reload. */
    skipTutorial(): void;
    /** Reset tutorial progress (used for New Game or debug). */
    reset(): void;
    /**
     * Get the next pending step for a given trigger, or `undefined` if none.
     * Returns `undefined` when the tutorial is skipped.
     */
    getNextStep(trigger: TutorialTrigger): TutorialStep | undefined;
    /** All steps that have been completed so far (ordered). */
    getCompletedSteps(): TutorialStep[];
}
//# sourceMappingURL=TutorialManager.d.ts.map