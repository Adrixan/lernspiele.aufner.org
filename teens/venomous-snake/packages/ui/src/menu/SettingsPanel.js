import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n } from '@venomous-snake/i18n';
import { AudioSettingsPanel } from '../panels/AudioSettingsPanel';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const STORAGE_KEY = 'vs-settings';
const DEFAULT_SETTINGS = {
    language: 'en',
    volumeMaster: 80,
    volumeMusic: 60,
    volumeSfx: 70,
    fullscreen: false,
    reducedMotion: false,
};
function loadSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (typeof parsed === 'object' && parsed !== null) {
                return { ...DEFAULT_SETTINGS, ...parsed };
            }
        }
    }
    catch {
        // ignore parse errors
    }
    return { ...DEFAULT_SETTINGS };
}
function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
export function SettingsPanel({ onBack, audioSettings }) {
    const { t } = useTranslation('ui');
    const [settings, setSettings] = useState(loadSettings);
    const update = useCallback((partial) => {
        setSettings((prev) => {
            const next = { ...prev, ...partial };
            saveSettings(next);
            return next;
        });
    }, []);
    const handleLanguageChange = useCallback((e) => {
        const lang = e.target.value;
        update({ language: lang });
        void i18n.changeLanguage(lang);
    }, [update]);
    const handleFullscreenToggle = useCallback(() => {
        const newVal = !settings.fullscreen;
        update({ fullscreen: newVal });
        if (newVal) {
            void document.documentElement.requestFullscreen().catch(() => {
                // fullscreen may not be available
            });
        }
        else if (document.fullscreenElement) {
            void document.exitFullscreen().catch(() => {
                // may already be exited
            });
        }
    }, [settings.fullscreen, update]);
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && settings.fullscreen) {
                update({ fullscreen: false });
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [settings.fullscreen, update]);
    const containerStyle = {
        position: 'fixed',
        inset: 0,
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
        zIndex: 100,
    };
    const cardStyle = {
        background: '#0d1117',
        border: '1px solid #00ff9d44',
        borderRadius: '4px',
        padding: '32px',
        width: '420px',
        maxWidth: '90vw',
    };
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
    };
    const sliderStyle = {
        width: '140px',
        minHeight: '44px',
        accentColor: '#00ff9d',
        cursor: 'pointer',
    };
    const selectStyle = {
        minHeight: '44px',
        padding: '8px 12px',
        background: '#0a0a0f',
        border: '1px solid #333',
        color: '#e0e0e0',
        fontFamily: FONT_FAMILY,
        fontSize: '13px',
        cursor: 'pointer',
    };
    const checkboxContainerStyle = {
        minWidth: '44px',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const buttonStyle = {
        minWidth: '48px',
        minHeight: '48px',
        padding: '12px 20px',
        background: 'rgba(10, 10, 15, 0.85)',
        border: '1px solid #00ff9d55',
        color: '#00ff9d',
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '8px',
        boxShadow: '0 0 6px rgba(0,255,157,0.15)',
    };
    return (_jsx("div", { style: containerStyle, children: _jsxs("div", { style: cardStyle, children: [_jsx("h2", { style: { color: '#00ff9d', fontSize: '20px', margin: '0 0 24px 0' }, children: t('settings.title') }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.language') }), _jsxs("select", { style: selectStyle, value: settings.language, onChange: handleLanguageChange, children: [_jsx("option", { value: "en", children: "English" }), _jsx("option", { value: "de", children: "Deutsch" })] })] }), audioSettings !== undefined ? (_jsx(AudioSettingsPanel, { ...audioSettings })) : (_jsxs(_Fragment, { children: [_jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.volume_master') }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("input", { type: "range", min: 0, max: 100, value: settings.volumeMaster, onChange: (e) => update({ volumeMaster: Number(e.target.value) }), style: sliderStyle }), _jsx("span", { style: { color: '#666', fontSize: '12px', width: '32px', textAlign: 'right' }, children: settings.volumeMaster })] })] }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.volume_music') }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("input", { type: "range", min: 0, max: 100, value: settings.volumeMusic, onChange: (e) => update({ volumeMusic: Number(e.target.value) }), style: sliderStyle }), _jsx("span", { style: { color: '#666', fontSize: '12px', width: '32px', textAlign: 'right' }, children: settings.volumeMusic })] })] }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.volume_sfx') }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("input", { type: "range", min: 0, max: 100, value: settings.volumeSfx, onChange: (e) => update({ volumeSfx: Number(e.target.value) }), style: sliderStyle }), _jsx("span", { style: { color: '#666', fontSize: '12px', width: '32px', textAlign: 'right' }, children: settings.volumeSfx })] })] })] })), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.fullscreen') }), _jsx("div", { style: checkboxContainerStyle, children: _jsx("input", { type: "checkbox", checked: settings.fullscreen, onChange: handleFullscreenToggle, style: { width: '20px', height: '20px', accentColor: '#00ff9d', cursor: 'pointer' } }) })] }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.reduced_motion') }), _jsx("div", { style: checkboxContainerStyle, children: _jsx("input", { type: "checkbox", checked: settings.reducedMotion, onChange: () => update({ reducedMotion: !settings.reducedMotion }), style: { width: '20px', height: '20px', accentColor: '#00ff9d', cursor: 'pointer' } }) })] }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.keyboard_layout') }), _jsxs("select", { style: selectStyle, value: settings.keyboardLayout ?? 'qwerty', onChange: (e) => update({ keyboardLayout: e.target.value }), children: [_jsx("option", { value: "qwerty", children: "QWERTY" }), _jsx("option", { value: "qwertz", children: "QWERTZ" })] })] }), _jsxs("div", { style: rowStyle, children: [_jsx("span", { style: labelStyle, children: t('settings.native_keyboard') }), _jsx("div", { style: checkboxContainerStyle, children: _jsx("input", { type: "checkbox", checked: settings.useNativeKeyboard ?? false, onChange: () => update({ useNativeKeyboard: !(settings.useNativeKeyboard ?? false) }), style: { width: '20px', height: '20px', accentColor: '#00ff9d', cursor: 'pointer' } }) })] }), _jsx("button", { style: buttonStyle, onClick: onBack, children: t('new_game.back') })] }) }));
}
//# sourceMappingURL=SettingsPanel.js.map