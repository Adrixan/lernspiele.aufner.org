import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const floors = [
    { id: 'lobby', name: 'Lobby / Entry Point', chapterNum: 1, floorNum: 1 },
    { id: 'security-office', name: 'Security Office', chapterNum: 1, floorNum: 2 },
    { id: 'server-room-b1', name: 'Server Room B1', chapterNum: 2, floorNum: 3 },
    { id: 'server-room-b2', name: 'Server Room B2', chapterNum: 2, floorNum: 4 },
    { id: 'network-hub', name: 'Network Hub', chapterNum: 3, floorNum: 5 },
    { id: 'data-center', name: 'Data Center', chapterNum: 3, floorNum: 6 },
    { id: 'executive-floor', name: 'Executive Floor', chapterNum: 4, floorNum: 7 },
    { id: 'research-lab', name: 'Research Lab', chapterNum: 5, floorNum: 8 },
    { id: 'ai-core', name: 'AI Core', chapterNum: 6, floorNum: 9 },
    { id: 'mainframe', name: 'Mainframe', chapterNum: 7, floorNum: 10 },
    { id: 'quantum-vault', name: 'Quantum Vault', chapterNum: 8, floorNum: 11 },
    { id: 'apex-nexus', name: 'APEX NEXUS', chapterNum: 9, floorNum: 12 },
];
// Display bottom-to-top
const floorsReversed = [...floors].reverse();
export function FloorMap({ isOpen, onClose, currentFloor, unlockedFloors, onFloorSelect, }) {
    const { t } = useTranslation('ui');
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
    return (_jsxs("div", { style: panelStyle, children: [_jsxs("div", { style: headerStyle, children: [_jsx("h2", { style: { color: '#00ff9d', fontSize: '16px', margin: 0 }, children: t('floor_map.title') }), _jsx("button", { style: closeButtonStyle, onClick: onClose, "aria-label": "Close", children: "\u00D7" })] }), _jsx("div", { style: { padding: '16px', overflowY: 'auto', flex: 1 }, children: floorsReversed.map((floor) => {
                    const isCurrent = floor.id === currentFloor;
                    const isUnlocked = unlockedFloors.includes(floor.id);
                    const isLocked = !isUnlocked;
                    const floorStyle = {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        margin: '3px 0',
                        background: isCurrent ? '#00ff9d11' : 'transparent',
                        border: isCurrent ? '1px solid #00ff9d' : '1px solid #222',
                        borderRadius: '2px',
                        opacity: isLocked ? 0.4 : 1,
                        cursor: isUnlocked && !isCurrent ? 'pointer' : 'default',
                        transition: 'all 0.15s ease',
                    };
                    return (_jsxs("div", { style: floorStyle, onClick: () => {
                            if (isUnlocked && !isCurrent) {
                                onFloorSelect(floor.id);
                            }
                        }, children: [_jsxs("div", { children: [_jsxs("div", { style: {
                                            color: isCurrent ? '#00ff9d' : isLocked ? '#666' : '#e0e0e0',
                                            fontSize: '13px',
                                            fontWeight: isCurrent ? 'bold' : 'normal',
                                        }, children: [isLocked ? '🔒 ' : '', floor.name] }), _jsxs("div", { style: { color: '#666', fontSize: '10px', marginTop: '2px' }, children: [t('floor_map.floor', { num: floor.floorNum }), " \u00B7 Ch.", floor.chapterNum] })] }), _jsxs("div", { children: [isCurrent && (_jsxs("span", { style: { color: '#00ff9d', fontSize: '11px', whiteSpace: 'nowrap' }, children: ["\u25C4 ", t('floor_map.current').toUpperCase()] })), isLocked && (_jsx("span", { style: { color: '#666', fontSize: '11px' }, children: t('floor_map.locked') }))] })] }, floor.id));
                }) })] }));
}
//# sourceMappingURL=FloorMap.js.map