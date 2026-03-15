import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from 'react-i18next';
const XP_PER_LEVEL = 100;
const BAR_SEGMENTS = 10;
function buildXpBar(xp) {
    const xpInLevel = xp % XP_PER_LEVEL;
    const percent = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
    const filled = Math.round((xpInLevel / XP_PER_LEVEL) * BAR_SEGMENTS);
    return { filled, total: BAR_SEGMENTS, percent };
}
function LocationHeaderInner({ floorNumber, floorName, roomName, xp, level, completedChallenges, totalChallenges, }) {
    const { t } = useTranslation('ui');
    const bar = buildXpBar(xp);
    return (_jsxs("div", { className: "story-location-header", role: "banner", children: [_jsxs("div", { className: "story-location-info", children: [_jsxs("span", { className: "story-location-floor", children: ["\u25B8", ' ', t('storyTerminal.floor', `FLOOR ${String(floorNumber)}`).replace('{n}', String(floorNumber)), ": ", floorName] }), _jsx("span", { className: "story-location-sep", children: "\u2502" }), _jsx("span", { className: "story-location-room", children: roomName })] }), _jsxs("div", { className: "story-location-stats", children: [_jsxs("span", { className: "story-level-badge", children: ["Lv.", level] }), _jsx("span", { className: "story-xp-bar", "aria-label": t('storyTerminal.xpProgress', `XP: ${String(bar.percent)}%`), children: _jsxs("span", { className: "story-xp-bar-track", "aria-hidden": "true", children: [_jsx("span", { className: "story-xp-bar-filled", children: '█'.repeat(bar.filled) }), _jsx("span", { className: "story-xp-bar-empty", children: '░'.repeat(bar.total - bar.filled) })] }) }), _jsxs("span", { className: "story-challenge-progress", children: [completedChallenges, "/", totalChallenges] })] })] }));
}
export const LocationHeader = React.memo(LocationHeaderInner);
//# sourceMappingURL=LocationHeader.js.map