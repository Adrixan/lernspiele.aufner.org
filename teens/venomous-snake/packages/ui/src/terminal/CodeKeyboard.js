import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useRef } from 'react';
/* ── Layout data ─────────────────────────────────────────────────────── */
const NUMBER_ROW = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const SYMBOL_BAR = [
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    ':',
    '=',
    '"',
    "'",
    '.',
    ',',
    '#',
    '+',
    '-',
    '*',
    '/',
    '_',
    '<',
    '>',
    '!',
    '@',
    '\\',
    '|',
    '%',
    '^',
    '&',
    '~',
];
const QWERTY_ROWS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];
const QWERTZ_ROWS = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm'],
];
/* ── Shared dimensions ───────────────────────────────────────────────── */
const KEY_W = 'calc(10% - 4px)';
const FONT_FAMILY = '"JetBrains Mono","Fira Code","Cascadia Code",monospace';
const DOUBLE_TAP_MS = 300;
/* ── Styles ──────────────────────────────────────────────────────────── */
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        background: '#080b10',
        borderTop: '1px solid #1a2a3a',
        padding: '4px 2px',
        gap: '3px',
        flexShrink: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '3px',
    },
    key: {
        minWidth: KEY_W,
        height: '40px',
        background: '#0f1720',
        border: '1px solid #1a2a3a',
        borderRadius: '4px',
        color: '#b3b1ad',
        fontFamily: FONT_FAMILY,
        fontSize: '14px',
        cursor: 'pointer',
        touchAction: 'manipulation',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2px',
        flexShrink: 0,
        transition: 'background 0.08s, color 0.08s, border-color 0.08s',
    },
    keyActive: {
        background: 'rgba(0,255,157,0.18)',
        borderColor: '#00ff9d',
        color: '#00ff9d',
    },
    keyNumber: {
        height: '34px',
        fontSize: '13px',
    },
    keyBackspace: {
        background: '#0d1a24',
        color: '#ffb454',
        fontSize: '16px',
        minWidth: 'calc(15% - 4px)',
    },
    keyEnter: {
        background: 'rgba(0,255,157,0.08)',
        borderColor: '#00ff9d',
        color: '#00ff9d',
        fontSize: '12px',
        minWidth: '70px',
        letterSpacing: '0.04em',
    },
    keySpace: {
        flex: 1,
        minWidth: 0,
        background: '#0f1720',
        borderColor: '#1a2a3a',
        color: '#3d4752',
        fontSize: '11px',
        letterSpacing: '0.08em',
    },
    keyTab: {
        background: '#0d1a24',
        borderColor: '#1a2a3a',
        color: '#00b4d8',
        fontSize: '11px',
        minWidth: '52px',
        letterSpacing: '0.04em',
    },
    keyShift: {
        background: '#0d1a24',
        borderColor: '#1a2a3a',
        color: '#3d4752',
        fontSize: '16px',
        minWidth: 'calc(15% - 4px)',
    },
    keyShiftActive: {
        background: 'rgba(0,255,157,0.12)',
        borderColor: '#00ff9d',
        color: '#00ff9d',
    },
    keyShiftCapsLock: {
        background: 'rgba(0,255,157,0.22)',
        borderColor: '#00ff9d',
        color: '#00ff9d',
        boxShadow: '0 0 6px rgba(0,255,157,0.35)',
    },
    symbolBar: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        overflowY: 'hidden',
        flexShrink: 0,
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        gap: '0px',
    },
    symbolKey: {
        minWidth: '40px',
        height: '44px',
        padding: '0 4px',
        background: 'transparent',
        border: 'none',
        borderRight: '1px solid #1a2a3a',
        color: '#00ff9d',
        fontFamily: FONT_FAMILY,
        fontSize: '15px',
        cursor: 'pointer',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
    },
};
/* ── Key sub-component ───────────────────────────────────────────────── */
function Key({ label, ariaLabel, extraStyle, onPress, }) {
    const [active, setActive] = useState(false);
    const handlePointerDown = useCallback((e) => {
        e.preventDefault();
        setActive(true);
        onPress();
    }, [onPress]);
    const handlePointerUp = useCallback(() => setActive(false), []);
    const handlePointerLeave = useCallback(() => setActive(false), []);
    return (_jsx("button", { type: "button", tabIndex: -1, style: {
            ...styles.key,
            ...extraStyle,
            ...(active ? styles.keyActive : {}),
        }, onPointerDown: handlePointerDown, onPointerUp: handlePointerUp, onPointerLeave: handlePointerLeave, "aria-label": ariaLabel ?? label, children: label }));
}
/* ── Main component ──────────────────────────────────────────────────── */
/**
 * Full custom on-screen coding keyboard for Android.
 * Bypasses the system IME by using pointer events only.
 *
 * Features:
 * - Always-visible number row and scrollable Python symbol bar
 * - Shift key with single-tap (one-shot) and double-tap (caps lock)
 * - QWERTY / QWERTZ layout support
 */
export function CodeKeyboard({ onInput, onBackspace, visible = true, keyboardLayout = 'qwerty', }) {
    const [shiftActive, setShiftActive] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const lastShiftTap = useRef(0);
    const letterRows = keyboardLayout === 'qwertz' ? QWERTZ_ROWS : QWERTY_ROWS;
    /* Handle character input — deactivates one-shot shift after a letter */
    const handleChar = useCallback((ch) => {
        const out = shiftActive || capsLock ? ch.toUpperCase() : ch;
        onInput(out);
        // One-shot shift: deactivate after one character (but not caps lock)
        if (shiftActive && !capsLock) {
            setShiftActive(false);
        }
    }, [onInput, shiftActive, capsLock]);
    /* Shift: single-tap toggles one-shot shift, double-tap toggles caps lock */
    const handleShift = useCallback(() => {
        const now = Date.now();
        if (now - lastShiftTap.current < DOUBLE_TAP_MS) {
            // Double-tap: toggle caps lock
            setCapsLock((prev) => {
                const next = !prev;
                setShiftActive(next);
                return next;
            });
        }
        else if (capsLock) {
            // Single tap while caps lock is on: turn everything off
            setCapsLock(false);
            setShiftActive(false);
        }
        else {
            // Single tap: toggle one-shot shift
            setShiftActive((prev) => !prev);
        }
        lastShiftTap.current = now;
    }, [capsLock]);
    /* Compute shift key styling */
    const shiftStyle = {
        ...styles.keyShift,
        ...(capsLock ? styles.keyShiftCapsLock : shiftActive ? styles.keyShiftActive : {}),
    };
    if (!visible)
        return null;
    return (_jsxs("div", { style: styles.container, role: "toolbar", "aria-label": "Code keyboard", children: [_jsx("div", { style: styles.row, children: NUMBER_ROW.map((n) => (_jsx(Key, { label: n, extraStyle: styles.keyNumber, onPress: () => onInput(n) }, n))) }), _jsx("div", { style: styles.symbolBar, role: "toolbar", "aria-label": "Python symbol shortcuts", children: SYMBOL_BAR.map((sym) => (_jsx("button", { type: "button", tabIndex: -1, style: styles.symbolKey, onPointerDown: (e) => {
                        e.preventDefault();
                        onInput(sym);
                    }, "aria-label": `Insert ${sym}`, children: sym }, sym))) }), letterRows.map((row, rowIdx) => (_jsxs("div", { style: styles.row, children: [rowIdx === 2 && (_jsx(Key, { label: "\u21E7", ariaLabel: capsLock ? 'Caps lock on' : shiftActive ? 'Shift on' : 'Shift', extraStyle: shiftStyle, onPress: handleShift })), row.map((ch) => (_jsx(Key, { label: shiftActive || capsLock ? ch.toUpperCase() : ch, onPress: () => handleChar(ch) }, ch))), rowIdx === 2 && (_jsx(Key, { label: "\u232B", ariaLabel: "Backspace", extraStyle: styles.keyBackspace, onPress: onBackspace }))] }, rowIdx))), _jsxs("div", { style: styles.row, children: [_jsx(Key, { label: "tab", ariaLabel: "Tab", extraStyle: styles.keyTab, onPress: () => onInput('    ') }), _jsx(Key, { label: "space", ariaLabel: "Space", extraStyle: styles.keySpace, onPress: () => onInput(' ') }), _jsx(Key, { label: "\u21B5 enter", ariaLabel: "Enter", extraStyle: styles.keyEnter, onPress: () => onInput('\n') })] })] }));
}
//# sourceMappingURL=CodeKeyboard.js.map