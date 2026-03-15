import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState, useCallback } from 'react';
const TYPEWRITER_MS = 30;
function renderEntryContent(entry) {
    switch (entry.type) {
        case 'dialog':
        case 'cipher': {
            const speaker = entry.speaker ?? (entry.type === 'cipher' ? 'CIPHER' : '???');
            return (_jsxs(_Fragment, { children: [_jsxs("span", { className: "story-dialog-speaker", children: [speaker, ":"] }), " \u201C", entry.text, "\u201D"] }));
        }
        case 'action':
            return _jsxs(_Fragment, { children: ["> ", entry.text] });
        case 'system':
            return _jsxs(_Fragment, { children: ["[SYSTEM] ", entry.text] });
        case 'error':
            return _jsxs(_Fragment, { children: ["[ERROR] ", entry.text] });
        case 'description':
        default:
            return entry.text;
    }
}
/** Typewriter text reveal for the latest entry */
function TypewriterText({ entry, onComplete, }) {
    const fullContent = entryToPlainText(entry);
    const [charIndex, setCharIndex] = useState(0);
    const timerRef = useRef(null);
    const done = charIndex >= fullContent.length;
    useEffect(() => {
        if (done) {
            onComplete();
            return;
        }
        timerRef.current = setTimeout(() => {
            setCharIndex((prev) => prev + 1);
        }, TYPEWRITER_MS);
        return () => {
            if (timerRef.current !== null)
                clearTimeout(timerRef.current);
        };
    }, [charIndex, done, onComplete]);
    const handleClick = useCallback(() => {
        if (timerRef.current !== null)
            clearTimeout(timerRef.current);
        setCharIndex(fullContent.length);
    }, [fullContent.length]);
    // Render the entry content up to charIndex
    const visibleText = fullContent.slice(0, charIndex);
    return (_jsxs("span", { onClick: handleClick, style: { cursor: done ? 'default' : 'pointer' }, children: [renderPartialEntry(entry, visibleText), !done && _jsx("span", { className: "story-typewriter-cursor", "aria-hidden": "true" })] }));
}
function entryToPlainText(entry) {
    const speaker = entry.speaker ?? (entry.type === 'cipher' ? 'CIPHER' : '???');
    switch (entry.type) {
        case 'dialog':
        case 'cipher':
            return `${speaker}: \u201C${entry.text}\u201D`;
        case 'action':
            return `> ${entry.text}`;
        case 'system':
            return `[SYSTEM] ${entry.text}`;
        case 'error':
            return `[ERROR] ${entry.text}`;
        case 'description':
        default:
            return entry.text;
    }
}
function renderPartialEntry(entry, visibleText) {
    const speaker = entry.speaker ?? (entry.type === 'cipher' ? 'CIPHER' : '???');
    const prefix = `${speaker}: `;
    switch (entry.type) {
        case 'dialog':
        case 'cipher': {
            if (visibleText.length <= prefix.length) {
                return _jsx("span", { className: "story-dialog-speaker", children: visibleText });
            }
            return (_jsxs(_Fragment, { children: [_jsx("span", { className: "story-dialog-speaker", children: prefix }), visibleText.slice(prefix.length)] }));
        }
        default:
            return visibleText;
    }
}
function NarrativePanelInner({ entries }) {
    const scrollRef = useRef(null);
    const [typewriterDone, setTypewriterDone] = useState(true);
    const lastEntryId = useRef(undefined);
    const latestEntry = entries.length > 0 ? entries[entries.length - 1] : undefined;
    // Detect new entry and start typewriter
    useEffect(() => {
        if (latestEntry !== undefined && latestEntry.id !== lastEntryId.current) {
            lastEntryId.current = latestEntry.id;
            setTypewriterDone(false);
        }
    }, [latestEntry]);
    // Auto-scroll to bottom
    useEffect(() => {
        const el = scrollRef.current;
        if (el !== null) {
            el.scrollTop = el.scrollHeight;
        }
    }, [entries.length, typewriterDone]);
    const handleTypewriterComplete = useCallback(() => {
        setTypewriterDone(true);
    }, []);
    const olderEntries = !typewriterDone && entries.length > 0 ? entries.slice(0, -1) : entries;
    return (_jsxs("div", { className: "story-narrative-panel", ref: scrollRef, role: "log", "aria-live": "polite", children: [olderEntries.map((entry) => (_jsx("div", { className: `story-narrative-entry story-narrative-entry--${entry.type}`, children: renderEntryContent(entry) }, entry.id))), !typewriterDone && latestEntry !== undefined && (_jsx("div", { className: `story-narrative-entry story-narrative-entry--${latestEntry.type}`, children: _jsx(TypewriterText, { entry: latestEntry, onComplete: handleTypewriterComplete }) }, latestEntry.id))] }));
}
export const NarrativePanel = React.memo(NarrativePanelInner);
//# sourceMappingURL=NarrativePanel.js.map