import React from 'react';
export interface AudioSettingsPanelProps {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
    isMuted: boolean;
    onMasterVolume: (v: number) => void;
    onMusicVolume: (v: number) => void;
    onSfxVolume: (v: number) => void;
    onToggleMute: () => void;
}
export declare function AudioSettingsPanel({ masterVolume, musicVolume, sfxVolume, isMuted, onMasterVolume, onMusicVolume, onSfxVolume, onToggleMute, }: AudioSettingsPanelProps): React.JSX.Element;
//# sourceMappingURL=AudioSettingsPanel.d.ts.map