import React from 'react';
export interface TerminalBootSequenceProps {
    /** Called once the boot animation finishes */
    onComplete: () => void;
    /** Line delay in ms. Default 260 */
    lineDelay?: number;
    /** Force replay even if already shown this session */
    forceReplay?: boolean;
}
/**
 * Displays a brief CRT boot animation when the terminal first opens.
 * Subsequent opens (same session) skip directly to `onComplete`.
 */
export declare function TerminalBootSequence({ onComplete, lineDelay, forceReplay, }: TerminalBootSequenceProps): React.JSX.Element | null;
//# sourceMappingURL=TerminalBootSequence.d.ts.map