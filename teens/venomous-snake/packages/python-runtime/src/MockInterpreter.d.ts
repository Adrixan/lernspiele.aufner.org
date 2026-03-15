import type { PythonInterpreter, PythonOutput, ExecutionResult } from './types';
export declare class MockInterpreter implements PythonInterpreter {
    private ready;
    private outputCallbacks;
    private inputCallbacks;
    private queuedResults;
    private inputQueue;
    private readonly mockVersion;
    private readonly evaluator;
    /** Queue a specific ExecutionResult to be returned on the next execute() call. */
    queueResult(result: ExecutionResult): void;
    initialize(): Promise<void>;
    isReady(): boolean;
    execute(code: string): Promise<ExecutionResult>;
    provideInput(value: string): void;
    onOutput(callback: (output: PythonOutput) => void): () => void;
    onInputRequest(callback: (prompt: string) => void): () => void;
    terminate(): Promise<void>;
    getVersion(): string;
}
//# sourceMappingURL=MockInterpreter.d.ts.map