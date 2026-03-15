import React from 'react';
import type { NarrativeEntry } from '@venomous-snake/shared-types';
export interface NarrativePanelProps {
    entries: NarrativeEntry[];
}
declare function NarrativePanelInner({ entries }: NarrativePanelProps): React.JSX.Element;
export declare const NarrativePanel: React.MemoExoticComponent<typeof NarrativePanelInner>;
export {};
//# sourceMappingURL=NarrativePanel.d.ts.map