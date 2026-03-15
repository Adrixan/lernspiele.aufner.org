import React from 'react';
import './victory-screen.css';
export interface VictoryScreenProps {
    totalChallenges: number;
    completedChallenges: number;
    totalXp: number;
    level: number;
    playerName: string;
    onContinue: () => void;
    onReturnToTitle: () => void;
}
declare function VictoryScreenInner({ totalChallenges, completedChallenges, totalXp, level, playerName, onContinue, onReturnToTitle, }: VictoryScreenProps): React.JSX.Element;
export declare const VictoryScreen: React.MemoExoticComponent<typeof VictoryScreenInner>;
export {};
//# sourceMappingURL=VictoryScreen.d.ts.map