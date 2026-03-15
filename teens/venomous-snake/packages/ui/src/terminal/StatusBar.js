import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
function StatusBarInner({ onOpenPanel, onSave, onPause }) {
    const { t } = useTranslation('ui');
    const handleQuests = useCallback(() => onOpenPanel('questlog'), [onOpenPanel]);
    const handleMap = useCallback(() => onOpenPanel('map'), [onOpenPanel]);
    const handleSettings = useCallback(() => onOpenPanel('settings'), [onOpenPanel]);
    const buttons = [
        {
            id: 'quests',
            icon: '📋',
            labelKey: 'storyTerminal.quests',
            fallback: 'Quests',
            shortcut: 'Q',
            action: handleQuests,
        },
        {
            id: 'map',
            icon: '🗺',
            labelKey: 'storyTerminal.map',
            fallback: 'Map',
            shortcut: 'M',
            action: handleMap,
        },
        {
            id: 'settings',
            icon: '⚙',
            labelKey: 'storyTerminal.settings',
            fallback: 'Settings',
            shortcut: 'S',
            action: handleSettings,
        },
        {
            id: 'save',
            icon: '💾',
            labelKey: 'storyTerminal.save',
            fallback: 'Save',
            shortcut: 'F5',
            action: onSave,
        },
    ];
    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e) => {
            // Don't intercept when user is typing in an input/textarea
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA')
                return;
            const key = e.key.toLowerCase();
            if (key === 'q' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleQuests();
            }
            else if (key === 'm' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleMap();
            }
            else if (key === 'escape') {
                e.preventDefault();
                onPause();
            }
            else if (e.key === 'F5') {
                e.preventDefault();
                onSave();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleQuests, handleMap, onPause, onSave]);
    return (_jsx("div", { className: "story-status-bar", role: "toolbar", "aria-label": t('storyTerminal.toolbar', 'Toolbar'), children: buttons.map((btn) => (_jsxs("button", { className: "story-status-btn", onClick: btn.action, "aria-label": t(btn.labelKey, btn.fallback), children: [_jsx("span", { "aria-hidden": "true", children: btn.icon }), t(btn.labelKey, btn.fallback), _jsxs("span", { className: "story-status-shortcut", "aria-hidden": "true", children: ["[", btn.shortcut, "]"] })] }, btn.id))) }));
}
export const StatusBar = React.memo(StatusBarInner);
//# sourceMappingURL=StatusBar.js.map