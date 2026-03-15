import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const ACTION_ICONS = {
    move: '→',
    talk: '💬',
    hack: '💻',
    look: '👁',
    examine: '🔍',
    help: '❓',
};
function ActionPanelInner({ actions, onAction }) {
    const { t } = useTranslation('ui');
    const [selectedIndex, setSelectedIndex] = useState(0);
    // Clamp selected index when actions change
    useEffect(() => {
        setSelectedIndex((prev) => (prev >= actions.length ? 0 : prev));
    }, [actions.length]);
    const activateAction = useCallback((action) => {
        if (action.disabled !== true) {
            onAction(action);
        }
    }, [onAction]);
    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (actions.length === 0)
                return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % actions.length);
            }
            else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + actions.length) % actions.length);
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                const action = actions[selectedIndex];
                if (action !== undefined) {
                    activateAction(action);
                }
            }
            else {
                // Number keys 1-9
                const num = parseInt(e.key, 10);
                if (num >= 1 && num <= 9 && num <= actions.length) {
                    e.preventDefault();
                    const action = actions[num - 1];
                    if (action !== undefined) {
                        activateAction(action);
                    }
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [actions, selectedIndex, activateAction]);
    if (actions.length === 0) {
        return (_jsx("div", { className: "story-action-panel", role: "navigation", "aria-label": t('storyTerminal.actions', 'Actions'), children: _jsx("div", { style: { padding: '8px 12px', color: '#3d4752', fontStyle: 'italic', fontSize: '13px' }, children: t('storyTerminal.noActions', 'No actions available...') }) }));
    }
    return (_jsx("div", { className: "story-action-panel", role: "navigation", "aria-label": t('storyTerminal.actions', 'Actions'), children: actions.map((action, i) => {
            const isDisabled = action.disabled === true;
            const isSelected = i === selectedIndex;
            const icon = isDisabled ? '🔒' : (ACTION_ICONS[action.type] ?? '▸');
            let className = 'story-action-btn';
            if (isSelected)
                className += ' story-action-btn--selected';
            if (isDisabled)
                className += ' story-action-btn--disabled';
            return (_jsxs("button", { className: className, onClick: () => activateAction(action), disabled: isDisabled, title: isDisabled ? (action.disabledReason ?? '') : undefined, "aria-label": action.label, children: [_jsx("span", { className: "story-action-icon", "aria-hidden": "true", children: icon }), _jsxs("span", { className: "story-action-label", children: [action.label, isDisabled && action.disabledReason && (_jsx("span", { className: "story-action-reason", children: action.disabledReason }))] }), i < 9 && (_jsx("span", { className: "story-action-key", "aria-hidden": "true", children: i + 1 }))] }, action.id));
        }) }));
}
export const ActionPanel = React.memo(ActionPanelInner);
//# sourceMappingURL=ActionPanel.js.map