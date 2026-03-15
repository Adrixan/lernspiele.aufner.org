import React from 'react';
import type { AudioSettingsPanelProps } from '../panels/AudioSettingsPanel';
export interface SettingsPanelProps {
    onBack: () => void;
    /** When provided, the volume sliders are delegated to AudioSettingsPanel. */
    audioSettings?: AudioSettingsPanelProps;
}
export declare function SettingsPanel({ onBack, audioSettings }: SettingsPanelProps): React.JSX.Element;
//# sourceMappingURL=SettingsPanel.d.ts.map