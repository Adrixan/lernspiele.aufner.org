import React from 'react';
import type { GameAction } from '@venomous-snake/shared-types';
export interface ActionPanelProps {
    actions: GameAction[];
    onAction: (action: GameAction) => void;
}
declare function ActionPanelInner({ actions, onAction }: ActionPanelProps): React.JSX.Element;
export declare const ActionPanel: React.MemoExoticComponent<typeof ActionPanelInner>;
export {};
//# sourceMappingURL=ActionPanel.d.ts.map