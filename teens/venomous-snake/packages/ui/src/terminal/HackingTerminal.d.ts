import React from 'react';
import type { PythonInterpreter } from '@venomous-snake/shared-types';
import './terminal.css';
interface HackingTerminalProps {
    interpreter?: PythonInterpreter;
    challengeId?: string;
    initialCode?: string;
    readOnlyRanges?: Array<{
        from: number;
        to: number;
    }>;
    onClose: () => void;
    onSubmit?: (code: string) => void;
    /** Called when a challenge is successfully completed */
    onChallengeSuccess?: (challengeId: string, xpEarned: number) => void;
}
declare function HackingTerminalInner(props: HackingTerminalProps): React.JSX.Element;
export declare const HackingTerminal: React.MemoExoticComponent<typeof HackingTerminalInner>;
export {};
//# sourceMappingURL=HackingTerminal.d.ts.map