import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const DISMISS_DELAY_MS = 3000;
const FIRST_PICKUP_DISMISS_DELAY_MS = 5000;
const ITEM_TYPE_ICON = {
    datafile: '📄',
    tool: '🔧',
    keycard: '🗝️',
};
const ITEM_TYPE_COLOR = {
    datafile: '#00e5ff',
    tool: '#00ff9d',
    keycard: '#c792ea',
};
function SinglePickupToast({ notification, onDismiss }) {
    const { t } = useTranslation('ui');
    const [visible, setVisible] = useState(false);
    const delay = notification.isFirstPickup ? FIRST_PICKUP_DISMISS_DELAY_MS : DISMISS_DELAY_MS;
    const accentColor = ITEM_TYPE_COLOR[notification.itemType] ?? '#00ff9d';
    const icon = ITEM_TYPE_ICON[notification.itemType] ?? '📦';
    useEffect(() => {
        const showTimer = setTimeout(() => setVisible(true), 50);
        const dismissTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onDismiss(notification.id), 350);
        }, delay);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(dismissTimer);
        };
    }, [notification.id, delay, onDismiss]);
    const handleDismiss = useCallback(() => {
        setVisible(false);
        setTimeout(() => onDismiss(notification.id), 350);
    }, [notification.id, onDismiss]);
    const typeLabel = t(`item_pickup.type_${notification.itemType}`, {
        defaultValue: notification.itemType,
    });
    const toastStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        background: '#0a0a1a',
        border: `1px solid ${accentColor}`,
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: '2px',
        padding: '12px 14px',
        minWidth: '280px',
        maxWidth: '380px',
        transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
        cursor: 'pointer',
        boxShadow: `0 4px 20px ${accentColor}33`,
        fontFamily: FONT_FAMILY,
        userSelect: 'none',
    };
    return (_jsxs("div", { style: toastStyle, onClick: handleDismiss, role: "status", "aria-live": "polite", "aria-atomic": "true", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDismiss();
            }
        }, children: [_jsx("span", { style: { fontSize: '28px', flexShrink: 0, lineHeight: 1, marginTop: '2px' }, children: icon }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsxs("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '2px',
                        }, children: [_jsx("span", { style: {
                                    color: '#888',
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }, children: t('item_pickup.title') }), _jsxs("span", { style: {
                                    color: accentColor,
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    opacity: 0.8,
                                }, children: ["[", typeLabel, "]"] }), notification.isFirstPickup && (_jsx("span", { style: {
                                    color: '#ffb454',
                                    fontSize: '9px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    border: '1px solid #ffb454',
                                    padding: '0 3px',
                                    borderRadius: '1px',
                                }, children: t('item_pickup.first_time_label') }))] }), _jsx("div", { style: {
                            color: accentColor,
                            fontSize: '13px',
                            fontWeight: 'bold',
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }, children: notification.name }), notification.isFirstPickup && (_jsx("div", { style: {
                            color: '#aaa',
                            fontSize: '11px',
                            lineHeight: '1.4',
                        }, children: notification.description }))] }), _jsx("div", { style: { color: '#555', fontSize: '18px', flexShrink: 0, alignSelf: 'flex-start' }, children: "\u00D7" })] }));
}
export function ItemPickupToast({ notifications, onDismiss, }) {
    const containerStyle = {
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 500,
        pointerEvents: 'none',
        alignItems: 'center',
    };
    return (_jsx("div", { style: containerStyle, "aria-label": "Item pickup notifications", children: notifications.map((notification) => (_jsx("div", { style: { pointerEvents: 'auto' }, children: _jsx(SinglePickupToast, { notification: notification, onDismiss: onDismiss }) }, notification.id))) }));
}
//# sourceMappingURL=ItemPickupToast.js.map