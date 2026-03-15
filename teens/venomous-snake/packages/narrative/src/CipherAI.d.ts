export type CipherMood = 'neutral' | 'excited' | 'concerned' | 'amused' | 'impressed' | 'thinking';
export type CipherContext = 'idle' | 'challenge_start' | 'challenge_hint' | 'challenge_success' | 'challenge_fail' | 'exploration' | 'story' | 'greeting';
export declare class CipherAI {
    private mood;
    private playerName;
    setPlayerName(name: string): void;
    getMood(): CipherMood;
    getLine(context: CipherContext, data?: Record<string, string>): string;
    wrapHint(rawHint: string): string;
    explainError(errorType: string, errorMessage: string): string;
    getReaction(passed: boolean, attempts: number, hintsUsed: number): string;
    getIdleChatter(): string;
    getCodingTip(concepts: string[]): string;
}
//# sourceMappingURL=CipherAI.d.ts.map