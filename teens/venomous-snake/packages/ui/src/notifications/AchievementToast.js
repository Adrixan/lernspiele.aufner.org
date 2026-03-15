import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const DISMISS_DELAY_MS = 5000;
function SingleToast({ notification, onDismiss }) {
    const { t } = useTranslation('ui');
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        // Mount → slide in
        const showTimer = setTimeout(() => setVisible(true), 50);
        // Auto-dismiss
        const dismissTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onDismiss(notification.id), 350);
        }, DISMISS_DELAY_MS);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(dismissTimer);
        };
    }, [notification.id, onDismiss]);
    const handleDismiss = useCallback(() => {
        setVisible(false);
        setTimeout(() => onDismiss(notification.id), 350);
    }, [notification.id, onDismiss]);
    const toastStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#1a1200',
        border: '1px solid #ffb454',
        borderLeft: '4px solid #ffb454',
        borderRadius: '2px',
        padding: '12px 14px',
        minWidth: '280px',
        maxWidth: '360px',
        transform: visible ? 'translateX(0)' : 'translateX(110%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(255, 180, 84, 0.25)',
        fontFamily: FONT_FAMILY,
        userSelect: 'none',
        position: 'relative',
    };
    return (_jsxs("div", { style: toastStyle, onClick: handleDismiss, role: "status", "aria-live": "polite", "aria-atomic": "true", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDismiss();
            }
        }, children: [_jsx("span", { style: { fontSize: '28px', flexShrink: 0, lineHeight: 1 }, children: notification.achievement.icon }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: {
                            color: '#888',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '2px',
                        }, children: t('achievements.unlocked_label') }), _jsx("div", { style: { color: '#ffb454', fontSize: '13px', fontWeight: 'bold', marginBottom: '2px' }, children: t(notification.achievement.nameKey) }), _jsx("div", { style: { color: '#aaa', fontSize: '11px' }, children: t(notification.achievement.descriptionKey) }), notification.achievement.xpReward > 0 && (_jsxs("div", { style: { color: '#00ff9d', fontSize: '11px', marginTop: '4px' }, children: ["+", notification.achievement.xpReward, " XP"] }))] }), _jsx("div", { style: { color: '#555', fontSize: '18px', flexShrink: 0, alignSelf: 'flex-start' }, children: "\u00D7" })] }));
}
export function AchievementToast({ notifications, onDismiss, }) {
    const containerStyle = {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999,
        pointerEvents: 'none',
    };
    return (_jsx("div", { style: containerStyle, "aria-label": "Achievement notifications", children: notifications.map((notification) => (_jsx("div", { style: { pointerEvents: 'auto' }, children: _jsx(SingleToast, { notification: notification, onDismiss: onDismiss }) }, notification.id))) }));
}
//# sourceMappingURL=AchievementToast.js.map