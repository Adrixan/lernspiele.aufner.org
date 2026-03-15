export declare class MiniPythonEvaluator {
    private executor;
    queueInput(value: string): void;
    execute(code: string): {
        stdout: string;
        success: boolean;
        error?: {
            type: string;
            message: string;
            line?: number;
        };
    };
}
//# sourceMappingURL=MiniPythonEvaluator.d.ts.map