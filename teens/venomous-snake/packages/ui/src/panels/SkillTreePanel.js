import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SKILL_TREE } from '@venomous-snake/challenge-engine';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const CATEGORY_COLORS = {
    fundamentals: '#00ff9d',
    control_flow: '#00b4d8',
    functions: '#ffb454',
    data_structures: '#a855f7',
    oop: '#f43f5e',
    advanced: '#f97316',
};
const CATEGORY_LABEL_KEYS = {
    fundamentals: 'skill_tree.cat_fundamentals',
    control_flow: 'skill_tree.cat_control_flow',
    functions: 'skill_tree.cat_functions',
    data_structures: 'skill_tree.cat_data_structures',
    oop: 'skill_tree.cat_oop',
    advanced: 'skill_tree.cat_advanced',
};
const CATEGORY_ORDER = [
    'fundamentals',
    'control_flow',
    'functions',
    'data_structures',
    'oop',
    'advanced',
];
const COL_WIDTH = 170;
const ROW_HEIGHT = 110;
const NODE_RADIUS = 30;
const PADDING_X = 55;
const PADDING_Y = 70;
function buildLayout() {
    const layout = [];
    for (const category of CATEGORY_ORDER) {
        const col = CATEGORY_ORDER.indexOf(category);
        const nodesInCat = SKILL_TREE.filter((n) => n.category === category);
        nodesInCat.forEach((node, row) => {
            layout.push({
                node,
                x: PADDING_X + col * COL_WIDTH,
                y: PADDING_Y + row * ROW_HEIGHT,
            });
        });
    }
    return layout;
}
const NODE_LAYOUT = buildLayout();
const CANVAS_WIDTH = PADDING_X * 2 + (CATEGORY_ORDER.length - 1) * COL_WIDTH + NODE_RADIUS * 2;
const MAX_ROWS = Math.max(...CATEGORY_ORDER.map((cat) => SKILL_TREE.filter((n) => n.category === cat).length));
const CANVAS_HEIGHT = PADDING_Y + MAX_ROWS * ROW_HEIGHT + NODE_RADIUS;
function getNodeLayout(nodeId) {
    return NODE_LAYOUT.find((nl) => nl.node.id === nodeId);
}
export function SkillTreePanel({ isOpen, onClose, unlockedSkills, availableSkills, xp, onUnlock, }) {
    const { t } = useTranslation('ui');
    const [selectedNode, setSelectedNode] = useState(null);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            if (selectedNode !== null) {
                setSelectedNode(null);
            }
            else {
                onClose();
            }
        }
    }, [isOpen, onClose, selectedNode]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    const getNodeState = (nodeId) => {
        if (unlockedSkills.includes(nodeId))
            return 'unlocked';
        if (availableSkills.includes(nodeId))
            return 'available';
        return 'locked';
    };
    const panelStyle = {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 400,
        display: isOpen ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
    };
    const dialogStyle = {
        background: '#0d1117',
        border: '1px solid #00ff9d',
        borderRadius: '4px',
        width: 'min(95vw, 1100px)',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    };
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #222',
    };
    const svgConnections = NODE_LAYOUT.flatMap(({ node, x: tx, y: ty }) => node.prerequisites.map((prereqId) => {
        const prereqLayout = getNodeLayout(prereqId);
        if (prereqLayout === undefined)
            return null;
        const { x: fx, y: fy } = prereqLayout;
        const prereqState = getNodeState(prereqId);
        const nodeState = getNodeState(node.id);
        const color = prereqState === 'unlocked' && nodeState !== 'locked' ? '#00ff9d33' : '#ffffff11';
        return (_jsx("line", { x1: fx, y1: fy, x2: tx, y2: ty, stroke: color, strokeWidth: 2, strokeDasharray: nodeState === 'locked' ? '4 4' : undefined }, `${prereqId}->${node.id}`));
    }));
    return (_jsx("div", { style: panelStyle, role: "dialog", "aria-modal": "true", "aria-label": t('skill_tree.title'), children: _jsxs("div", { style: dialogStyle, children: [_jsxs("div", { style: headerStyle, children: [_jsx("h2", { style: { color: '#00ff9d', fontSize: '16px', margin: 0 }, children: t('skill_tree.title') }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("span", { style: { color: '#ffb454', fontSize: '13px' }, children: t('skill_tree.xp_available', { xp }) }), _jsx("button", { style: {
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
                                    }, onClick: onClose, "aria-label": t('skill_tree.close'), children: "\u00D7" })] })] }), _jsx("div", { style: {
                        display: 'flex',
                        gap: '12px',
                        padding: '8px 16px',
                        borderBottom: '1px solid #1a1a2e',
                        flexWrap: 'wrap',
                    }, children: CATEGORY_ORDER.map((cat) => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '5px' }, children: [_jsx("div", { style: {
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: CATEGORY_COLORS[cat],
                                } }), _jsx("span", { style: { color: '#aaa', fontSize: '11px' }, children: t(CATEGORY_LABEL_KEYS[cat]) })] }, cat))) }), _jsx("div", { style: { flex: 1, overflowAuto: 'both', position: 'relative' }, children: _jsx("div", { style: { overflowX: 'auto', overflowY: 'auto', maxHeight: '55vh' }, children: _jsxs("div", { style: { position: 'relative', width: CANVAS_WIDTH, height: CANVAS_HEIGHT }, children: [_jsx("svg", { style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }, width: CANVAS_WIDTH, height: CANVAS_HEIGHT, children: svgConnections }), CATEGORY_ORDER.map((cat, col) => (_jsx("div", { style: {
                                        position: 'absolute',
                                        left: PADDING_X + col * COL_WIDTH - NODE_RADIUS,
                                        top: 8,
                                        width: NODE_RADIUS * 2,
                                        textAlign: 'center',
                                        color: CATEGORY_COLORS[cat],
                                        fontSize: '9px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        whiteSpace: 'nowrap',
                                        transform: 'translateX(-50%) translateX(' + NODE_RADIUS + 'px)',
                                    }, children: t(CATEGORY_LABEL_KEYS[cat]) }, cat))), NODE_LAYOUT.map(({ node, x, y }) => {
                                    const state = getNodeState(node.id);
                                    const color = CATEGORY_COLORS[node.category];
                                    const isSelected = selectedNode?.id === node.id;
                                    const nodeStyle = {
                                        position: 'absolute',
                                        left: x - NODE_RADIUS,
                                        top: y - NODE_RADIUS,
                                        width: NODE_RADIUS * 2,
                                        height: NODE_RADIUS * 2,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: state === 'locked' ? 'not-allowed' : 'pointer',
                                        background: state === 'unlocked'
                                            ? `${color}22`
                                            : state === 'available'
                                                ? '#1a1a2e'
                                                : '#111',
                                        border: `2px solid ${state === 'locked' ? '#333' : isSelected ? '#fff' : color}`,
                                        boxShadow: state === 'available'
                                            ? `0 0 10px ${color}55`
                                            : state === 'unlocked'
                                                ? `0 0 6px ${color}44`
                                                : 'none',
                                        opacity: state === 'locked' ? 0.4 : 1,
                                        transition: 'box-shadow 0.2s, border-color 0.2s',
                                        userSelect: 'none',
                                    };
                                    return (_jsx("button", { style: nodeStyle, onClick: () => setSelectedNode(isSelected ? null : node), title: t(node.nameKey), "aria-label": `${t(node.nameKey)} — ${state}`, "aria-pressed": isSelected, children: _jsx("span", { style: { fontSize: '16px', lineHeight: 1 }, children: node.icon }) }, node.id));
                                })] }) }) }), selectedNode !== null && (_jsx(SkillDetailPanel, { node: selectedNode, state: getNodeState(selectedNode.id), xp: xp, onUnlock: () => {
                        onUnlock(selectedNode.id);
                        setSelectedNode(null);
                    }, onClose: () => setSelectedNode(null), t: t, categoryColor: CATEGORY_COLORS[selectedNode.category] }))] }) }));
}
function SkillDetailPanel({ node, state, xp, onUnlock, onClose, t, categoryColor, }) {
    return (_jsxs("div", { style: {
            borderTop: '1px solid #222',
            padding: '16px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            background: '#0a0a0f',
        }, children: [_jsx("span", { style: { fontSize: '32px', flexShrink: 0 }, children: node.icon }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: {
                            color: categoryColor,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '4px',
                        }, children: t(node.nameKey) }), _jsx("div", { style: { color: '#aaa', fontSize: '12px', marginBottom: '8px' }, children: t(node.descriptionKey) }), node.xpCost > 0 && (_jsx("div", { style: { color: '#ffb454', fontSize: '11px' }, children: t('skill_tree.xp_cost', { cost: node.xpCost }) })), node.unlockEffect !== undefined && (_jsxs("div", { style: { color: '#00ff9d', fontSize: '11px', marginTop: '4px' }, children: ["\u2726 ", t(`skill_tree.effect_${node.unlockEffect}`)] }))] }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexShrink: 0 }, children: [state === 'available' && xp >= node.xpCost && (_jsx("button", { style: {
                            background: categoryColor,
                            border: 'none',
                            color: '#000',
                            padding: '8px 14px',
                            fontSize: '12px',
                            fontFamily: "'JetBrains Mono', monospace",
                            cursor: 'pointer',
                            borderRadius: '2px',
                        }, onClick: onUnlock, children: t('skill_tree.unlock') })), state === 'unlocked' && (_jsxs("span", { style: { color: '#00ff9d', fontSize: '12px', padding: '8px 0' }, children: ["\u2713 ", t('skill_tree.unlocked')] })), _jsx("button", { style: {
                            background: 'transparent',
                            border: '1px solid #333',
                            color: '#999',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontFamily: "'JetBrains Mono', monospace",
                            cursor: 'pointer',
                            borderRadius: '2px',
                        }, onClick: onClose, children: t('skill_tree.close') })] })] }));
}
//# sourceMappingURL=SkillTreePanel.js.map