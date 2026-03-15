import { CipherAI } from '@venomous-snake/narrative';
import type { CipherContext, CipherMood } from '@venomous-snake/narrative';
interface UseCipherReturn {
    cipher: CipherAI;
    showDialog: (context: CipherContext, data?: Record<string, string>) => void;
    showHint: (hint: string) => void;
    showErrorExplanation: (errorType: string, errorMessage: string) => void;
    dismissDialog: () => void;
    currentMessage: string | null;
    currentMood: CipherMood;
    isVisible: boolean;
}
export declare function useCipher(): UseCipherReturn;
export {};
//# sourceMappingURL=useCipher.d.ts.map