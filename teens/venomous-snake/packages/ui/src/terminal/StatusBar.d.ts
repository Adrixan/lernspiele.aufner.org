import React from 'react';
export interface StatusBarProps {
    onOpenPanel: (panel: 'questlog' | 'map' | 'settings') => void;
    onSave: () => void;
    onPause: () => void;
}
declare function StatusBarInner({ onOpenPanel, onSave, onPause }: StatusBarProps): React.JSX.Element;
export declare const StatusBar: React.MemoExoticComponent<typeof StatusBarInner>;
export {};
//# sourceMappingURL=StatusBar.d.ts.map