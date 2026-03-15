import { MiniPythonEvaluator } from './MiniPythonEvaluator';
export class MockInterpreter {
    ready = false;
    outputCallbacks = new Set();
    inputCallbacks = new Set();
    queuedResults = [];
    inputQueue = [];
    mockVersion = 'Python 3.12.0 (mock)';
    evaluator = new MiniPythonEvaluator();
    /** Queue a specific ExecutionResult to be returned on the next execute() call. */
    queueResult(result) {
        this.queuedResults.push(result);
    }
    async initialize() {
        await new Promise((resolve) => setTimeout(resolve, 10));
        this.ready = true;
    }
    isReady() {
        return this.ready;
    }
    async execute(code) {
        const startTime = Date.now();
        // Return queued result if available (used for test injection)
        const queued = this.queuedResults.shift();
        if (queued !== undefined) {
            queued.output.forEach((o) => this.outputCallbacks.forEach((cb) => cb(o)));
            return queued;
        }
        // Queue any pending input for the evaluator
        for (const inp of this.inputQueue) {
            this.evaluator.queueInput(inp);
        }
        this.inputQueue = [];
        // Execute using the mini Python evaluator
        const result = this.evaluator.execute(code);
        const output = [];
        if (result.stdout) {
            // Split into per-print-statement outputs (each ends with \n)
            const parts = result.stdout.split('\n');
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (part === undefined || (part === '' && i === parts.length - 1))
                    continue;
                const text = part + '\n';
                const out = { type: 'stdout', text };
                output.push(out);
                this.outputCallbacks.forEach((cb) => cb(out));
            }
        }
        if (!result.success && result.error) {
            const errText = `${result.error.type}: ${result.error.message}`;
            const errOut = { type: 'stderr', text: errText };
            output.push(errOut);
            this.outputCallbacks.forEach((cb) => cb(errOut));
            const error = {
                type: result.error.type,
                message: result.error.message,
                ...(result.error.line !== undefined ? { line: result.error.line } : {}),
            };
            return { success: false, output, error, executionTimeMs: Date.now() - startTime };
        }
        return { success: true, output, executionTimeMs: Date.now() - startTime };
    }
    provideInput(value) {
        this.inputQueue.push(value);
    }
    onOutput(callback) {
        this.outputCallbacks.add(callback);
        return () => {
            this.outputCallbacks.delete(callback);
        };
    }
    onInputRequest(callback) {
        this.inputCallbacks.add(callback);
        return () => {
            this.inputCallbacks.delete(callback);
        };
    }
    async terminate() {
        this.ready = false;
        this.queuedResults = [];
        this.inputQueue = [];
    }
    getVersion() {
        return this.mockVersion;
    }
}
//# sourceMappingURL=MockInterpreter.js.map