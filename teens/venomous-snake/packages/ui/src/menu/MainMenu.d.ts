import React from 'react';
export interface MainMenuProps {
    hasSaveData: boolean;
    onNewGame: () => void;
    onContinue: () => void;
    onLoadGame: () => void;
    onSettings: () => void;
    onTutorial?: () => void;
}
export declare function MainMenu({ hasSaveData, onNewGame, onContinue, onLoadGame, onSettings, onTutorial, }: MainMenuProps): React.JSX.Element;
//# sourceMappingURL=MainMenu.d.ts.map