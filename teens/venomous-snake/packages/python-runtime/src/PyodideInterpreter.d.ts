import type { PythonInterpreter, PythonOutput, ExecutionResult } from './types';
/**
 * Real CPython interpreter running via Pyodide (WASM).
 *
 * Features:
 * - Base64-encoded code injection (safe for any user code including triple-quotes)
 * - Pre-queued input() support for challenge test cases
 * - Isolated namespace per execution (no state leakage between runs)
 * - Execution queue prevents concurrent Python state corruption
 * - Configurable execution timeout
 */
export declare class PyodideInterpreter implements PythonInterpreter {
    private pyodide;
    private ready;
    private outputCallbacks;
    private inputCallbacks;
    private inputQueue;
    private version;
    private readonly timeoutMs;
    private executionQueue;
    constructor(timeoutMs?: number);
    initialize(): Promise<void>;
    isReady(): boolean;
    execute(code: string): Promise<ExecutionResult>;
    private executeInternal;
    provideInput(value: string): void;
    onOutput(callback: (output: PythonOutput) => void): () => void;
    onInputRequest(callback: (prompt: string) => void): () => void;
    terminate(): Promise<void>;
    getVersion(): string;
    private parseError;
}
//# sourceMappingURL=PyodideInterpreter.d.ts.map