export type TutorialTrigger = 'game_start' | 'first_terminal' | 'first_challenge' | 'first_success';
export interface TutorialStep {
    id: string;
    trigger: TutorialTrigger;
    /** i18n key for CIPHER's dialog line (story namespace) */
    cipherDialog: string;
    /** CSS selector or logical area name to spotlight */
    highlightElement?: string;
    /** What the player needs to do to advance past this step */
    requiredAction?: string;
}
export declare const TUTORIAL_STEPS: TutorialStep[];
//# sourceMappingURL=tutorial-steps.d.ts.map