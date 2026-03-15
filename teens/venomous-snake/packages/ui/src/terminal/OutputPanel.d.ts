import React from 'react';
import type { PythonOutput } from '@venomous-snake/shared-types';
import './terminal.css';
interface OutputPanelProps {
    outputs: PythonOutput[];
    onClear: () => void;
    inputPrompt?: string;
    onInputSubmit?: (value: string) => void;
}
declare function OutputPanelInner({ outputs, onClear, inputPrompt, onInputSubmit, }: OutputPanelProps): React.JSX.Element;
export declare const OutputPanel: React.MemoExoticComponent<typeof OutputPanelInner>;
export {};
//# sourceMappingURL=OutputPanel.d.ts.map