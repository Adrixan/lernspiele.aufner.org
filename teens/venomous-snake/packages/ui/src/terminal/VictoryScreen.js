import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './victory-screen.css';
const ASCII_BANNER = `
 ╔═══════════════════════════════════════════════════╗
 ║  ███████╗██╗   ██╗███████╗████████╗███████╗███╗  ║
 ║  ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ║
 ║  ███████╗ ╚████╔╝ ███████╗   ██║   █████╗ ██╔██╗║
 ║  ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝ ██║╚█║║
 ║  ███████║   ██║   ███████║   ██║   ███████╗██║ ║║║
 ║  ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝ ║║║
 ║                                                   ║
 ║       ███████╗███████╗ ██████╗██╗   ██╗██████╗   ║
 ║       ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗  ║
 ║       ███████╗█████╗  ██║     ██║   ██║██████╔╝  ║
 ║       ╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗  ║
 ║       ███████║███████╗╚██████╗╚██████╔╝██║  ██║  ║
 ║       ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝  ║
 ║                                                   ║
 ║              ███████╗██████╗ ██╗                   ║
 ║              ██╔════╝██╔══██╗██║                   ║
 ║              █████╗  ██║  ██║██║                   ║
 ║              ██╔══╝  ██║  ██║╚═╝                   ║
 ║              ███████╗██████╔╝██╗                   ║
 ║              ╚══════╝╚═════╝ ╚═╝                   ║
 ╚═══════════════════════════════════════════════════╝`;
function getAgentRating(completedChallenges, totalChallenges, totalXp, level) {
    const completionRatio = totalChallenges > 0 ? completedChallenges / totalChallenges : 0;
    const xpPerChallenge = completedChallenges > 0 ? totalXp / completedChallenges : 0;
    if (completionRatio >= 1 && level >= 50 && xpPerChallenge >= 100)
        return 'S';
    if (completionRatio >= 1 && level >= 30)
        return 'A';
    if (completionRatio >= 0.8)
        return 'B';
    return 'C';
}
function getRatingLabel(rating) {
    switch (rating) {
        case 'S':
            return '★ LEGENDARY HACKER ★';
        case 'A':
            return '◆ ELITE OPERATIVE ◆';
        case 'B':
            return '● SKILLED AGENT ●';
        default:
            return '○ FIELD AGENT ○';
    }
}
function VictoryScreenInner({ totalChallenges, completedChallenges, totalXp, level, playerName, onContinue, onReturnToTitle, }) {
    const rating = getAgentRating(completedChallenges, totalChallenges, totalXp, level);
    const ratingLabel = getRatingLabel(rating);
    return (_jsx("div", { className: "victory-screen", children: _jsxs("div", { className: "victory-content", children: [_jsx("pre", { className: "victory-ascii-banner", "aria-hidden": "true", children: ASCII_BANNER }), _jsxs("h1", { className: "victory-header", children: ['>', " SYSTEM SECURED ", '<'] }), _jsx("p", { className: "victory-subheader", children: "All threats neutralized. Network integrity restored." }), _jsx("div", { className: "victory-divider", children: '═'.repeat(48) }), _jsxs("div", { className: "victory-agent-section", children: [_jsxs("p", { className: "victory-agent-name", children: ["AGENT: ", playerName] }), _jsxs("p", { className: `victory-rating victory-rating--${rating.toLowerCase()}`, children: ["RATING: [", rating, "] ", ratingLabel] })] }), _jsx("div", { className: "victory-divider", children: '─'.repeat(48) }), _jsxs("div", { className: "victory-stats", children: [_jsxs("div", { className: "victory-stat-row", children: [_jsx("span", { className: "victory-stat-label", children: "CHALLENGES COMPLETED" }), _jsxs("span", { className: "victory-stat-value", children: [completedChallenges, "/", totalChallenges] })] }), _jsxs("div", { className: "victory-stat-row", children: [_jsx("span", { className: "victory-stat-label", children: "TOTAL XP EARNED" }), _jsx("span", { className: "victory-stat-value", children: totalXp.toLocaleString() })] }), _jsxs("div", { className: "victory-stat-row", children: [_jsx("span", { className: "victory-stat-label", children: "AGENT LEVEL" }), _jsxs("span", { className: "victory-stat-value", children: ["LVL ", level] })] })] }), _jsx("div", { className: "victory-divider", children: '═'.repeat(48) }), _jsxs("div", { className: "victory-freemode", children: [_jsxs("p", { className: "victory-freemode-header", children: ['>>>', " FREE MODE UNLOCKED ", '<<<'] }), _jsx("p", { className: "victory-freemode-text", children: "All floors are now accessible. Revisit any terminal, replay challenges, and explore at your leisure." })] }), _jsxs("div", { className: "victory-actions", children: [_jsxs("button", { className: "victory-btn victory-btn--primary", onClick: onContinue, type: "button", children: ["[", '>', " CONTINUE IN FREE MODE]"] }), _jsx("button", { className: "victory-btn victory-btn--secondary", onClick: onReturnToTitle, type: "button", children: "[RETURN TO TITLE]" })] })] }) }));
}
export const VictoryScreen = React.memo(VictoryScreenInner);
//# sourceMappingURL=VictoryScreen.js.map