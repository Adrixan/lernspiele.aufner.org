import type { Challenge, PythonError } from '@venomous-snake/shared-types';
export interface HintResult {
    hint: string;
    tier: 1 | 2 | 3;
    source: 'error_pattern' | 'challenge_hint' | 'generic';
}
export declare class HintEngine {
    private hintsUsed;
    getHint(challenge: Challenge, error?: PythonError): HintResult | null;
    getHintsUsedCount(challengeId: string): number;
    resetHints(challengeId: string): void;
    private matchErrorPattern;
}
//# sourceMappingURL=HintEngine.d.ts.map