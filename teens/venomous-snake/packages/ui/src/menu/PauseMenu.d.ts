import React from 'react';
export interface PauseMenuProps {
    onResume: () => void;
    onSaveGame: () => void;
    onLoadGame: () => void;
    onSettings: () => void;
    onQuitToMenu: () => void;
}
export declare function PauseMenu({ onResume, onSaveGame, onLoadGame, onSettings, onQuitToMenu, }: PauseMenuProps): React.JSX.Element;
//# sourceMappingURL=PauseMenu.d.ts.map