import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { CipherPortrait } from './CipherPortrait';
const TYPEWRITER_SPEED_MS = 22;
export function CipherDialog({ message, mood, autoDismissMs = 8000, onDismiss, }) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef(null);
    const dismissTimerRef = useRef(null);
    const clearTimers = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (dismissTimerRef.current !== null) {
            clearTimeout(dismissTimerRef.current);
            dismissTimerRef.current = null;
        }
    }, []);
    const showFullText = useCallback(() => {
        clearTimers();
        setDisplayedText(message);
        setIsComplete(true);
        if (autoDismissMs > 0) {
            dismissTimerRef.current = setTimeout(onDismiss, autoDismissMs);
        }
    }, [message, autoDismissMs, onDismiss, clearTimers]);
    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);
        let idx = 0;
        intervalRef.current = setInterval(() => {
            idx += 1;
            setDisplayedText(message.slice(0, idx));
            if (idx >= message.length) {
                clearInterval(intervalRef.current ?? undefined);
                intervalRef.current = null;
                setIsComplete(true);
                if (autoDismissMs > 0) {
                    dismissTimerRef.current = setTimeout(onDismiss, autoDismissMs);
                }
            }
        }, TYPEWRITER_SPEED_MS);
        return clearTimers;
    }, [message, autoDismissMs, onDismiss, clearTimers]);
    return (_jsxs("div", { role: "status", "aria-live": "polite", "aria-label": "CIPHER message", style: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            background: '#0d1117ee',
            border: '1px solid #00ff9d55',
            borderRadius: '8px',
            padding: '14px 16px',
            maxWidth: '480px',
            boxShadow: '0 0 16px #00ff9d22',
            position: 'relative',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        }, children: [_jsx(CipherPortrait, { mood: mood, size: 64 }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("div", { style: {
                            fontSize: '10px',
                            letterSpacing: '2px',
                            color: '#00ff9d',
                            textTransform: 'uppercase',
                            marginBottom: '6px',
                            fontWeight: 700,
                        }, children: "CIPHER" }), _jsxs("p", { style: {
                            margin: 0,
                            color: '#cdd6f4',
                            fontSize: '13px',
                            lineHeight: 1.6,
                            minHeight: '40px',
                            wordBreak: 'break-word',
                        }, children: [displayedText, !isComplete && (_jsx("span", { style: {
                                    display: 'inline-block',
                                    width: '2px',
                                    height: '13px',
                                    background: '#00ff9d',
                                    marginLeft: '2px',
                                    verticalAlign: 'text-bottom',
                                    animation: 'cipher-cursor-blink 0.7s step-end infinite',
                                }, "aria-hidden": "true" }))] }), _jsxs("div", { style: {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '8px',
                            marginTop: '10px',
                        }, children: [!isComplete && (_jsx("button", { type: "button", onClick: showFullText, style: buttonStyle('#00b4d8'), "aria-label": "Skip typewriter animation", children: "Skip" })), _jsx("button", { type: "button", onClick: onDismiss, style: buttonStyle('#00ff9d'), "aria-label": "Dismiss CIPHER message", children: "Dismiss" })] })] }), _jsx("style", { children: `@keyframes cipher-cursor-blink { 50% { opacity: 0; } }` })] }));
}
function buttonStyle(color) {
    return {
        background: 'transparent',
        border: `1px solid ${color}55`,
        color: color,
        borderRadius: '4px',
        padding: '3px 10px',
        fontSize: '11px',
        cursor: 'pointer',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontFamily: 'inherit',
        transition: 'background 0.15s',
    };
}
//# sourceMappingURL=CipherDialog.js.map