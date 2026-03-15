import React from 'react';
import type { NarrativeEntry, GameAction } from '@venomous-snake/shared-types';
import './story-terminal.css';
export interface StoryTerminalProps {
    currentRoom: {
        id: string;
        nameKey: string;
        floor: number;
    } | null;
    narrativeLog: NarrativeEntry[];
    availableActions: GameAction[];
    onAction: (action: GameAction) => void;
    onOpenPanel: (panel: 'questlog' | 'map' | 'settings') => void;
    onSave: () => void;
    onPause: () => void;
    playerName: string;
    xp: number;
    level: number;
    completedChallenges: number;
    totalChallenges: number;
}
declare function StoryTerminalInner({ currentRoom, narrativeLog, availableActions, onAction, onOpenPanel, onSave, onPause, xp, level, completedChallenges, totalChallenges, }: StoryTerminalProps): React.JSX.Element;
export declare const StoryTerminal: React.MemoExoticComponent<typeof StoryTerminalInner>;
export {};
//# sourceMappingURL=StoryTerminal.d.ts.map