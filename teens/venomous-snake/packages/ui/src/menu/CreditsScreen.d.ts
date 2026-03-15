import React from 'react';
export interface CreditsScreenProps {
    /** Stats gathered during the run */
    stats: {
        challengesCompleted: number;
        totalXp: number;
        /** Total play time in seconds */
        timePlayed: number;
        achievementsUnlocked: number;
        floorsCleared: number;
    };
    onNewGamePlus: () => void;
    onReturnToMenu: () => void;
}
export declare function CreditsScreen({ stats, onNewGamePlus, onReturnToMenu, }: CreditsScreenProps): React.JSX.Element;
//# sourceMappingURL=CreditsScreen.d.ts.map