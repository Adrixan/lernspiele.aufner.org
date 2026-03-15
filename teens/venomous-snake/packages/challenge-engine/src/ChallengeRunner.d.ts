import type { Challenge, TestCase, PythonInterpreter } from '@venomous-snake/shared-types';
export interface TestResult {
    testCase: TestCase;
    passed: boolean;
    actualOutput?: string;
    error?: string;
    executionTimeMs: number;
}
export interface ChallengeResult {
    challengeId: string;
    allPassed: boolean;
    testResults: TestResult[];
    totalTimeMs: number;
}
export declare class ChallengeRunner {
    private interpreter;
    constructor(interpreter: PythonInterpreter);
    runChallenge(challenge: Challenge, studentCode: string): Promise<ChallengeResult>;
    private runTestCase;
    /** Apply setup overrides by replacing matching variable assignments in the student code */
    private applySetup;
}
//# sourceMappingURL=ChallengeRunner.d.ts.map