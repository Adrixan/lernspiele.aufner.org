import type { Challenge, PythonOutput, PythonInterpreter } from '@venomous-snake/shared-types';
import type { ChallengeResult } from '@venomous-snake/challenge-engine';
export interface SubmitResult {
    passed: boolean;
    output: string;
    error: string | undefined;
}
export interface UseChallengeTerminalReturn {
    challenge: Challenge | null;
    outputs: PythonOutput[];
    isRunning: boolean;
    result: SubmitResult | null;
    hints: string[];
    challengeResult: ChallengeResult | null;
    submitCode: (code: string) => Promise<void>;
    runCode: (code: string) => Promise<void>;
    resetState: () => void;
    interpreter: PythonInterpreter;
}
export declare function useChallengeTerminal(challengeId: string | null): UseChallengeTerminalReturn;
//# sourceMappingURL=useChallengeTerminal.d.ts.map