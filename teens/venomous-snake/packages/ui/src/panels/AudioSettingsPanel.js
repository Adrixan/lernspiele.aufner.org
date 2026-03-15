import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '44px',
    marginBottom: '16px',
};
const labelStyle = {
    color: '#e0e0e0',
    fontSize: '14px',
    fontFamily: FONT_FAMILY,
};
const sliderStyle = {
    width: '140px',
    minHeight: '44px',
    accentColor: '#00ff9d',
    cursor: 'pointer',
};
const valueStyle = {
    color: '#666',
    fontSize: '12px',
    width: '32px',
    textAlign: 'right',
    fontFamily: FONT_FAMILY,
};
const muteButtonBase = {
    minHeight: '44px',
    padding: '8px 16px',
    border: '1px solid #333',
    fontFamily: FONT_FAMILY,
    fontSize: '12px',
    cursor: 'pointer',
    letterSpacing: '0.05em',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
};
const sectionHeadingStyle = {
    color: '#00ff9d',
    fontSize: '12px',
    fontFamily: FONT_FAMILY,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '16px',
    marginTop: '4px',
    borderBottom: '1px solid #00ff9d22',
    paddingBottom: '8px',
};
function VolumeRow({ label, value, onChange, }) {
    return (_jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: label }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("input", { type: "range", min: 0, max: 100, value: Math.round(value * 100), onChange: (e) => onChange(Number(e.target.value) / 100), style: sliderStyle, "aria-label": label }), _jsx("span", { style: valueStyle, children: Math.round(value * 100) })] })] }));
}
export function AudioSettingsPanel({ masterVolume, musicVolume, sfxVolume, isMuted, onMasterVolume, onMusicVolume, onSfxVolume, onToggleMute, }) {
    const { t } = useTranslation('ui');
    const muteButtonStyle = {
        ...muteButtonBase,
        background: isMuted ? '#00ff9d22' : 'transparent',
        color: isMuted ? '#00ff9d' : '#888',
        borderColor: isMuted ? '#00ff9d66' : '#333',
    };
    return (_jsxs("div", { children: [_jsx("p", { style: sectionHeadingStyle, children: t('settings.audio', 'Audio') }), _jsx(VolumeRow, { label: t('settings.volume_master', 'Master Volume'), value: masterVolume, onChange: onMasterVolume }), _jsx(VolumeRow, { label: t('settings.volume_music', 'Music'), value: musicVolume, onChange: onMusicVolume }), _jsx(VolumeRow, { label: t('settings.volume_sfx', 'SFX'), value: sfxVolume, onChange: onSfxVolume }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.mute', 'Mute All') }), _jsx("button", { style: muteButtonStyle, onClick: onToggleMute, "aria-pressed": isMuted, children: isMuted ? t('settings.unmute', 'UNMUTE') : t('settings.mute_btn', 'MUTE') })] })] }));
}
//# sourceMappingURL=AudioSettingsPanel.js.map