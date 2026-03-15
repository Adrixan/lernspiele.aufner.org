import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
export function MainMenu({ hasSaveData, onNewGame, onContinue, onLoadGame, onSettings, onTutorial, }) {
    const { t } = useTranslation('ui');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuItems = [
        { id: 'new', labelKey: 'menu.new_game', action: onNewGame, visible: true },
        { id: 'continue', labelKey: 'menu.continue_game', action: onContinue, visible: hasSaveData },
        { id: 'load', labelKey: 'menu.load_game', action: onLoadGame, visible: hasSaveData },
        ...(onTutorial !== undefined
            ? [{ id: 'tutorial', labelKey: 'menu.tutorial', action: onTutorial, visible: true }]
            : []),
        { id: 'settings', labelKey: 'menu.settings', action: onSettings, visible: true },
    ];
    const visibleItems = menuItems.filter((item) => item.visible);
    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'ArrowUp': {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + visibleItems.length) % visibleItems.length);
                break;
            }
            case 'ArrowDown': {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % visibleItems.length);
                break;
            }
            case 'Enter': {
                e.preventDefault();
                const item = visibleItems[selectedIndex];
                if (item !== undefined) {
                    item.action();
                }
                break;
            }
        }
    }, [visibleItems, selectedIndex]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    // Clamp selectedIndex if visibleItems shrinks
    useEffect(() => {
        if (selectedIndex >= visibleItems.length) {
            setSelectedIndex(Math.max(0, visibleItems.length - 1));
        }
    }, [visibleItems.length, selectedIndex]);
    const containerStyle = {
        position: 'fixed',
        inset: 0,
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
        zIndex: 100,
    };
    const scanlineStyle = {
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        pointerEvents: 'none',
        zIndex: 1,
    };
    const titleStyle = {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#00ff9d',
        textShadow: '0 0 20px #00ff9d, 0 0 40px #00ff9d44',
        margin: 0,
        letterSpacing: '6px',
        fontFamily: FONT_FAMILY,
        textAlign: 'center',
    };
    const subtitleStyle = {
        fontSize: '16px',
        color: '#00b4d8',
        marginTop: '8px',
        marginBottom: '48px',
        letterSpacing: '4px',
        fontFamily: FONT_FAMILY,
        textAlign: 'center',
    };
    return (_jsxs("div", { style: containerStyle, children: [_jsx("div", { style: scanlineStyle }), _jsxs("div", { style: { position: 'relative', zIndex: 2, textAlign: 'center' }, children: [_jsx("h1", { style: titleStyle, children: "VENOMOUS SNAKE" }), _jsx("p", { style: subtitleStyle, children: "Python Hacking RPG" }), _jsx("div", { role: "menu", "aria-label": "Main Menu", children: visibleItems.map((item, index) => {
                            const isSelected = index === selectedIndex;
                            const buttonStyle = {
                                display: 'block',
                                width: '280px',
                                minHeight: '44px',
                                padding: '12px 24px',
                                margin: '8px auto',
                                background: 'transparent',
                                border: isSelected ? '1px solid #00ff9d' : '1px solid #333',
                                color: isSelected ? '#00ff9d' : '#e0e0e0',
                                fontFamily: FONT_FAMILY,
                                fontSize: '16px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease',
                            };
                            return (_jsxs("button", { role: "menuitem", style: buttonStyle, onClick: item.action, onMouseEnter: () => setSelectedIndex(index), onFocus: () => setSelectedIndex(index), children: [isSelected ? '> ' : '  ', t(item.labelKey)] }, item.id));
                        }) })] })] }));
}
//# sourceMappingURL=MainMenu.js.map