import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { LocationHeader } from './LocationHeader';
import { NarrativePanel } from './NarrativePanel';
import { ActionPanel } from './ActionPanel';
import { StatusBar } from './StatusBar';
import './story-terminal.css';
/** Floor name lookup — will be replaced with i18n/data lookup later */
const FLOOR_NAMES = {
    0: 'LOBBY',
    1: 'MAIL ROOM',
    2: 'IT DEPARTMENT',
    3: 'ANALYTICS',
    4: 'COMMUNICATIONS',
    5: 'R&D LABS',
    6: 'ARCHIVES',
    7: 'SECURITY',
    8: 'NETWORK OPS',
    9: 'SERVER FARM',
    10: 'EXECUTIVE SUITE',
    11: 'ROOFTOP',
};
function StoryTerminalInner({ currentRoom, narrativeLog, availableActions, onAction, onOpenPanel, onSave, onPause, xp, level, completedChallenges, totalChallenges, }) {
    const floorNumber = currentRoom?.floor ?? 0;
    const floorName = FLOOR_NAMES[floorNumber] ?? `FLOOR ${String(floorNumber)}`;
    const roomName = currentRoom?.nameKey ?? '???';
    return (_jsxs("div", { className: "story-terminal", children: [_jsx(LocationHeader, { floorNumber: floorNumber, floorName: floorName, roomName: roomName, xp: xp, level: level, completedChallenges: completedChallenges, totalChallenges: totalChallenges }), _jsx(NarrativePanel, { entries: narrativeLog }), _jsx(ActionPanel, { actions: availableActions, onAction: onAction }), _jsx(StatusBar, { onOpenPanel: onOpenPanel, onSave: onSave, onPause: onPause })] }));
}
export const StoryTerminal = React.memo(StoryTerminalInner);
//# sourceMappingURL=StoryTerminal.js.map