export class ChallengeRunner {
    interpreter;
    constructor(interpreter) {
        this.interpreter = interpreter;
    }
    async runChallenge(challenge, studentCode) {
        const startTime = performance.now();
        const testResults = [];
        for (const testCase of challenge.testCases) {
            const result = await this.runTestCase(testCase, studentCode);
            testResults.push(result);
        }
        return {
            challengeId: challenge.id,
            allPassed: testResults.every((r) => r.passed),
            testResults,
            totalTimeMs: performance.now() - startTime,
        };
    }
    async runTestCase(testCase, code) {
        const startTime = performance.now();
        try {
            if (testCase.input !== undefined) {
                this.interpreter.provideInput(testCase.input);
            }
            const finalCode = this.applySetup(testCase, code);
            const result = await this.interpreter.execute(finalCode);
            const executionTimeMs = performance.now() - startTime;
            if (testCase.expectsError !== undefined) {
                const passed = result.error?.type === testCase.expectsError;
                const actualErrorType = result.error?.type ?? 'no error';
                return {
                    testCase,
                    passed,
                    ...(result.error !== undefined ? { actualOutput: result.error.message } : {}),
                    ...(passed
                        ? {}
                        : { error: `Expected ${testCase.expectsError} but got ${actualErrorType}` }),
                    executionTimeMs,
                };
            }
            const actualOutput = result.output
                .filter((o) => o.type === 'stdout')
                .map((o) => o.text)
                .join('');
            const normalizedActual = actualOutput.trim();
            const normalizedExpected = testCase.expectedOutput.trim();
            const passed = normalizedActual === normalizedExpected;
            return {
                testCase,
                passed,
                actualOutput: normalizedActual,
                ...(passed
                    ? {}
                    : { error: `Expected:\n${normalizedExpected}\n\nGot:\n${normalizedActual}` }),
                executionTimeMs,
            };
        }
        catch (err) {
            return {
                testCase,
                passed: false,
                error: err instanceof Error ? err.message : String(err),
                executionTimeMs: performance.now() - startTime,
            };
        }
    }
    /** Apply setup overrides by replacing matching variable assignments in the student code */
    applySetup(testCase, code) {
        if (!testCase.setup)
            return code;
        let result = code;
        for (const setupLine of testCase.setup.split('\n')) {
            const match = setupLine.match(/^(\w+)\s*=/);
            if (match) {
                const pattern = new RegExp(`^${match[1]}\\s*=.*$`, 'm');
                if (pattern.test(result)) {
                    result = result.replace(pattern, setupLine);
                }
                else {
                    result = `${setupLine}\n${result}`;
                }
            }
        }
        return result;
    }
}
//# sourceMappingURL=ChallengeRunner.js.map