import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const typeIcons = {
    tool: '🔧',
    keycard: '🗝',
    datafile: '📄',
};
const typeCategoryKeys = {
    tool: 'inventory.category_tools',
    keycard: 'inventory.category_keycards',
    datafile: 'inventory.category_datafiles',
};
export function InventoryPanel({ isOpen, onClose, items }) {
    const { t } = useTranslation('ui');
    const [hoveredItem, setHoveredItem] = useState(null);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            onClose();
        }
    }, [isOpen, onClose]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    const groupedItems = { tool: [], keycard: [], datafile: [] };
    for (const item of items) {
        const group = groupedItems[item.type];
        if (group !== undefined) {
            group.push(item);
        }
    }
    const panelStyle = {
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '380px',
        maxWidth: '100vw',
        background: '#0d1117',
        borderLeft: '1px solid #00ff9d',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        zIndex: 300,
        fontFamily: FONT_FAMILY,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    };
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #333',
    };
    const closeButtonStyle = {
        background: 'transparent',
        border: 'none',
        color: '#e0e0e0',
        fontSize: '20px',
        cursor: 'pointer',
        minWidth: '44px',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const isEmpty = items.length === 0;
    return (_jsxs("div", { style: panelStyle, children: [_jsxs("div", { style: headerStyle, children: [_jsx("h2", { style: { color: '#00ff9d', fontSize: '16px', margin: 0 }, children: t('inventory.title') }), _jsx("button", { style: closeButtonStyle, onClick: onClose, "aria-label": "Close", children: "\u00D7" })] }), _jsx("div", { style: { padding: '16px', overflowY: 'auto', flex: 1 }, children: isEmpty ? (_jsx("p", { style: { color: '#666', fontSize: '13px' }, children: t('inventory.empty') })) : (['tool', 'keycard', 'datafile'].map((type) => {
                    const typeItems = groupedItems[type];
                    if (typeItems === undefined || typeItems.length === 0)
                        return null;
                    const categoryKey = typeCategoryKeys[type];
                    const icon = typeIcons[type];
                    return (_jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("h3", { style: {
                                    color: '#00b4d8',
                                    fontSize: '13px',
                                    margin: '0 0 8px 0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }, children: categoryKey !== undefined ? t(categoryKey) : type }), typeItems.map((item) => {
                                const isHovered = hoveredItem === item.id;
                                const itemStyle = {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px 10px',
                                    margin: '2px 0',
                                    background: isHovered ? '#1a1a2e' : 'transparent',
                                    borderRadius: '2px',
                                    cursor: 'default',
                                    position: 'relative',
                                };
                                return (_jsxs("div", { style: itemStyle, onMouseEnter: () => setHoveredItem(item.id), onMouseLeave: () => setHoveredItem(null), children: [_jsx("span", { style: { fontSize: '18px' }, children: icon ?? '•' }), _jsx("span", { style: { color: '#e0e0e0', fontSize: '13px' }, children: t(item.nameKey) }), isHovered && (_jsx("div", { style: {
                                                position: 'absolute',
                                                left: '100%',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: '#0a0a0f',
                                                border: '1px solid #333',
                                                padding: '6px 10px',
                                                color: '#999',
                                                fontSize: '11px',
                                                whiteSpace: 'nowrap',
                                                zIndex: 10,
                                                marginLeft: '4px',
                                            }, children: t(item.descriptionKey) }))] }, item.id));
                            })] }, type));
                })) })] }));
}
//# sourceMappingURL=InventoryPanel.js.map