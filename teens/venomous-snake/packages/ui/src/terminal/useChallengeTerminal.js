import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { challengeMap } from '@venomous-snake/challenges';
import { ChallengeRunner, HintEngine } from '@venomous-snake/challenge-engine';
import { getSharedInterpreter, initializeSharedInterpreter } from '@venomous-snake/python-runtime';
export function useChallengeTerminal(challengeId) {
    const challenge = useMemo(() => (challengeId !== null ? (challengeMap[challengeId] ?? null) : null), [challengeId]);
    const [outputs, setOutputs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState(null);
    const [hints, setHints] = useState([]);
    const [challengeResult, setChallengeResult] = useState(null);
    const interpreterRef = useRef(getSharedInterpreter());
    const runnerRef = useRef(new ChallengeRunner(interpreterRef.current));
    const hintEngineRef = useRef(new HintEngine());
    useEffect(() => {
        const interpreter = interpreterRef.current;
        // Start async initialization (Pyodide WASM loading)
        initializeSharedInterpreter().catch(() => undefined);
        const unsubOutput = interpreter.onOutput((output) => {
            setOutputs((prev) => [...prev, output]);
        });
        return () => {
            unsubOutput();
        };
    }, []);
    // Reset evaluation state when challenge changes
    useEffect(() => {
        setOutputs([]);
        setResult(null);
        setHints([]);
        setChallengeResult(null);
    }, [challengeId]);
    const ensureReady = useCallback(async () => {
        await initializeSharedInterpreter();
    }, []);
    const runCode = useCallback(async (code) => {
        await ensureReady();
        setIsRunning(true);
        setOutputs([]);
        try {
            const execResult = await interpreterRef.current.execute(code);
            if (execResult.error !== undefined) {
                const errText = execResult.error.traceback ?? `${execResult.error.type}: ${execResult.error.message}`;
                setOutputs((prev) => [...prev, { type: 'stderr', text: errText }]);
            }
        }
        finally {
            setIsRunning(false);
        }
    }, [ensureReady]);
    const submitCode = useCallback(async (code) => {
        if (challenge === null) {
            await runCode(code);
            return;
        }
        await ensureReady();
        setIsRunning(true);
        setOutputs([]);
        setResult(null);
        setHints([]);
        try {
            const runner = runnerRef.current;
            const cResult = await runner.runChallenge(challenge, code);
            setChallengeResult(cResult);
            const outputLines = cResult.testResults
                .map((tr) => {
                const mark = tr.passed ? '✓' : '✗';
                return tr.passed
                    ? `${mark} ${tr.testCase.description}`
                    : `${mark} ${tr.testCase.description}\n  ${tr.error ?? ''}`;
            })
                .join('\n');
            if (cResult.allPassed) {
                setOutputs((prev) => [
                    ...prev,
                    {
                        type: 'stdout',
                        text: `✓ All ${cResult.testResults.length} test(s) passed!\n`,
                    },
                ]);
                setResult({ passed: true, output: outputLines, error: undefined });
            }
            else {
                const firstFailed = cResult.testResults.find((t) => !t.passed);
                const failCount = cResult.testResults.filter((t) => !t.passed).length;
                const hintResult = hintEngineRef.current.getHint(challenge);
                const newHints = hintResult !== null ? [hintResult.hint] : [];
                setHints(newHints);
                setOutputs((prev) => [
                    ...prev,
                    {
                        type: 'stderr',
                        text: `✗ ${failCount} test(s) failed\n${firstFailed?.error ?? ''}\n`,
                    },
                ]);
                setResult({ passed: false, output: outputLines, error: firstFailed?.error });
            }
        }
        finally {
            setIsRunning(false);
        }
    }, [challenge, runCode, ensureReady]);
    const resetState = useCallback(() => {
        setOutputs([]);
        setResult(null);
        setHints([]);
        setChallengeResult(null);
    }, []);
    return {
        challenge,
        outputs,
        isRunning,
        result,
        hints,
        challengeResult,
        submitCode,
        runCode,
        resetState,
        interpreter: interpreterRef.current,
    };
}
//# sourceMappingURL=useChallengeTerminal.js.map