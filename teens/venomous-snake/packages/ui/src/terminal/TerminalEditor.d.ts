import React from 'react';
import './terminal.css';
export interface TerminalEditorHandle {
    insertAtCursor: (text: string) => void;
    deleteAtCursor: () => void;
}
interface TerminalEditorProps {
    initialCode?: string;
    readOnlyRanges?: Array<{
        from: number;
        to: number;
    }>;
    onRun: (code: string) => void;
    onSubmit?: (code: string) => void;
    onChange?: (code: string) => void;
    disabled?: boolean;
    isAndroid?: boolean;
}
export declare const TerminalEditor: React.NamedExoticComponent<TerminalEditorProps & React.RefAttributes<TerminalEditorHandle>>;
export {};
//# sourceMappingURL=TerminalEditor.d.ts.map