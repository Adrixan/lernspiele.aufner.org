import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
export function PauseMenu({ onResume, onSaveGame, onLoadGame, onSettings, onQuitToMenu, }) {
    const { t } = useTranslation('ui');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const items = [
        { id: 'resume', labelKey: 'menu.resume', action: onResume },
        { id: 'save', labelKey: 'menu.save_game', action: onSaveGame },
        { id: 'load', labelKey: 'menu.load_game', action: onLoadGame },
        { id: 'settings', labelKey: 'menu.settings', action: onSettings },
        { id: 'quit', labelKey: 'menu.quit', action: onQuitToMenu },
    ];
    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'Escape': {
                e.preventDefault();
                onResume();
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
                break;
            }
            case 'ArrowDown': {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % items.length);
                break;
            }
            case 'Enter': {
                e.preventDefault();
                const item = items[selectedIndex];
                if (item !== undefined) {
                    item.action();
                }
                break;
            }
        }
    }, [items, selectedIndex, onResume]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    const backdropStyle = {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
        zIndex: 300,
    };
    const panelStyle = {
        background: '#0d1117',
        border: '1px solid #00ff9d',
        boxShadow: '0 0 30px #00ff9d22',
        borderRadius: '4px',
        padding: '32px',
        width: '320px',
        maxWidth: '90vw',
    };
    return (_jsx("div", { style: backdropStyle, children: _jsxs("div", { style: panelStyle, children: [_jsx("h2", { style: {
                        color: '#00ff9d',
                        fontSize: '20px',
                        margin: '0 0 20px 0',
                        textAlign: 'center',
                        textShadow: '0 0 10px #00ff9d44',
                    }, children: "PAUSED" }), _jsx("div", { role: "menu", "aria-label": "Pause Menu", children: items.map((item, index) => {
                        const isSelected = index === selectedIndex;
                        const buttonStyle = {
                            display: 'block',
                            width: '100%',
                            minHeight: '44px',
                            padding: '10px 16px',
                            margin: '6px 0',
                            background: 'transparent',
                            border: isSelected ? '1px solid #00ff9d' : '1px solid #333',
                            color: isSelected ? '#00ff9d' : '#e0e0e0',
                            fontFamily: FONT_FAMILY,
                            fontSize: '14px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease',
                        };
                        return (_jsxs("button", { role: "menuitem", style: buttonStyle, onClick: item.action, onMouseEnter: () => setSelectedIndex(index), onFocus: () => setSelectedIndex(index), children: [isSelected ? '> ' : '  ', t(item.labelKey)] }, item.id));
                    }) })] }) }));
}
//# sourceMappingURL=PauseMenu.js.map