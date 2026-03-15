import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TerminalEditor } from './TerminalEditor';
import { OutputPanel } from './OutputPanel';
import { MobileSymbolBar } from './MobileSymbolBar';
import { CodeKeyboard } from './CodeKeyboard';
import { ChallengeSuccessOverlay } from './ChallengeSuccessOverlay';
import { useChallengeTerminal } from './useChallengeTerminal';
import { useBreakpoint } from '../responsive/useBreakpoint';
import { useIsAndroid } from './useIsAndroid';
import './terminal.css';
function useKeyboardSettings() {
    const [settings, setSettings] = useState({ keyboardLayout: 'qwerty', useNativeKeyboard: false });
    useEffect(() => {
        try {
            const raw = localStorage.getItem('vs-settings');
            if (raw) {
                const parsed = JSON.parse(raw);
                setSettings({
                    keyboardLayout: parsed['keyboardLayout'] === 'qwertz' ? 'qwertz' : 'qwerty',
                    useNativeKeyboard: parsed['useNativeKeyboard'] === true,
                });
            }
        }
        catch {
            /* ignore */
        }
    }, []);
    return settings;
}
/** Convert keys like "challenges.ch01_02.title" to "challenges:ch01_02.title" for i18next namespace resolution */
function nsKey(key) {
    const dot = key.indexOf('.');
    if (dot === -1)
        return key;
    return key.substring(0, dot) + ':' + key.substring(dot + 1);
}
const statusColors = {
    uninitialized: '#3d4752',
    loading: '#ffb454',
    ready: '#00ff9d',
    executing: '#00b4d8',
    error: '#ff3333',
};
const statusLabels = {
    uninitialized: 'Offline',
    loading: 'Loading...',
    ready: 'Ready',
    executing: 'Executing...',
    error: 'Error',
};
// Module-level counter to ensure each free-mode terminal gets a unique key
let _freeEditorSessionId = 0;
function FreeModeTerminal({ interpreter, initialCode, readOnlyRanges, onClose, onSubmit, }) {
    const [outputs, setOutputs] = useState([]);
    const [status, setStatus] = useState('uninitialized');
    const [inputPrompt, setInputPrompt] = useState(undefined);
    const editorRef = useRef(null);
    const [editorKey] = useState(() => ++_freeEditorSessionId);
    const breakpoint = useBreakpoint();
    const isAndroid = useIsAndroid();
    const keyboardSettings = useKeyboardSettings();
    useEffect(() => {
        const cleanups = [];
        cleanups.push(interpreter.onOutput((output) => setOutputs((prev) => [...prev, output])));
        cleanups.push(interpreter.onInputRequest((prompt) => setInputPrompt(prompt)));
        if (!interpreter.isReady()) {
            setStatus('loading');
            interpreter
                .initialize()
                .then(() => setStatus('ready'))
                .catch(() => setStatus('error'));
        }
        else {
            setStatus('ready');
        }
        return () => {
            for (const cleanup of cleanups)
                cleanup();
        };
    }, [interpreter]);
    const handleRun = useCallback(async (code) => {
        if (!interpreter.isReady())
            return;
        setStatus('executing');
        try {
            const result = await interpreter.execute(code);
            setOutputs((prev) => [...prev, ...result.output]);
            if (result.error !== undefined) {
                const err = result.error;
                setOutputs((prev) => [
                    ...prev,
                    {
                        type: 'stderr',
                        text: err.traceback ?? `${err.type}: ${err.message}`,
                    },
                ]);
            }
            onSubmit?.(code);
        }
        finally {
            setStatus('ready');
        }
    }, [interpreter, onSubmit]);
    const handleRunSync = useCallback((code) => void handleRun(code), [handleRun]);
    const handleClear = useCallback(() => setOutputs([]), []);
    const handleInputSubmit = useCallback((value) => {
        interpreter.provideInput(value);
        setInputPrompt(undefined);
    }, [interpreter]);
    const handleClose = useCallback(() => onClose(), [onClose]);
    const handleSymbol = useCallback((sym) => editorRef.current?.insertAtCursor(sym), []);
    const handleBackspace = useCallback(() => editorRef.current?.deleteAtCursor(), []);
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')
                handleClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleClose]);
    const isDisabled = status !== 'ready';
    const statusColor = statusColors[status];
    return (_jsxs("div", { className: "terminal-container", children: [_jsxs("div", { className: "terminal-header", children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("span", { className: "terminal-title", children: "\u25B6 PYTHON TERMINAL" }), _jsx("span", { className: "terminal-status-indicator", style: { backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}` }, title: statusLabels[status] }), _jsx("span", { style: { color: statusColor, fontSize: '12px' }, children: statusLabels[status] })] }), _jsx("div", { className: "terminal-header-actions", children: _jsx("button", { className: "terminal-btn terminal-btn-close", onClick: handleClose, "aria-label": "Close terminal (Escape)", children: "\u2715 CLOSE" }) })] }), status === 'loading' ? (_jsxs("div", { className: "terminal-loading", children: [_jsx("div", { className: "terminal-spinner" }), _jsx("span", { children: "Initializing Python interpreter..." })] })) : (_jsxs("div", { className: "terminal-split", style: breakpoint === 'mobile' ? { flexDirection: 'column' } : undefined, children: [_jsx("div", { className: "terminal-editor-area", children: _jsx(TerminalEditor, { ref: editorRef, initialCode: initialCode, onRun: handleRunSync, disabled: isDisabled, ...(isAndroid && !keyboardSettings.useNativeKeyboard ? { isAndroid: true } : {}), ...(readOnlyRanges ? { readOnlyRanges } : {}) }, editorKey) }), _jsx(OutputPanel, { outputs: outputs, onClear: handleClear, ...(inputPrompt !== undefined
                            ? { inputPrompt, onInputSubmit: handleInputSubmit }
                            : {}) })] })), breakpoint === 'mobile' &&
                status !== 'loading' &&
                (isAndroid && !keyboardSettings.useNativeKeyboard ? (_jsx(CodeKeyboard, { onInput: handleSymbol, onBackspace: handleBackspace, keyboardLayout: keyboardSettings.keyboardLayout })) : (_jsx(MobileSymbolBar, { onSymbol: handleSymbol }))), _jsxs("div", { className: "terminal-status-bar", children: [_jsx("span", { children: interpreter.getVersion() }), _jsx("span", { children: "Ctrl+Enter to run \u2022 Esc to close" })] })] }));
}
function ChallengeModeTerminal({ challengeId, readOnlyRanges, onClose, onSubmit, onChallengeSuccess, }) {
    const { t } = useTranslation(['challenges', 'ui']);
    const { challenge, outputs, isRunning, result, hints, challengeResult, submitCode, runCode, resetState, interpreter, } = useChallengeTerminal(challengeId);
    const [editorKey, setEditorKey] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const editorRef = useRef(null);
    const breakpoint = useBreakpoint();
    const isAndroid = useIsAndroid();
    const keyboardSettings = useKeyboardSettings();
    const successTimerRef = useRef(null);
    // Force editor remount when challenge changes
    useEffect(() => {
        setEditorKey((k) => k + 1);
    }, [challengeId]);
    // Show success overlay when challenge passes
    useEffect(() => {
        if (result?.passed === true) {
            setShowSuccess(true);
            if (challenge !== null) {
                onChallengeSuccess?.(challenge.id, challenge.xpReward);
            }
        }
    }, [result?.passed, challenge, onChallengeSuccess]);
    const handleRun = useCallback((code) => {
        void runCode(code);
    }, [runCode]);
    const handleSubmit = useCallback((code) => {
        void submitCode(code);
        onSubmit?.(code);
    }, [submitCode, onSubmit]);
    const handleReset = useCallback(() => {
        resetState();
        setEditorKey((k) => k + 1);
    }, [resetState]);
    const handleSymbol = useCallback((sym) => editorRef.current?.insertAtCursor(sym), []);
    const handleBackspace = useCallback(() => editorRef.current?.deleteAtCursor(), []);
    const handleClose = useCallback(() => {
        if (successTimerRef.current !== null)
            clearTimeout(successTimerRef.current);
        onClose();
    }, [onClose]);
    const handleSuccessDismiss = useCallback(() => {
        setShowSuccess(false);
        handleClose();
    }, [handleClose]);
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && !showSuccess)
                handleClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleClose, showSuccess]);
    const status = isRunning
        ? 'executing'
        : interpreter.isReady()
            ? 'ready'
            : 'loading';
    const statusColor = statusColors[status];
    const isDisabled = isRunning;
    const initialCode = challenge?.scaffoldedCode ?? '# Write your Python code here\n';
    // Derive per-test objective status from last challengeResult
    const testResults = challengeResult?.testResults;
    const objectives = challenge?.testCases.map((tc, i) => {
        const tr = testResults?.[i];
        const objStatus = tr !== undefined ? (tr.passed ? 'passed' : 'failed') : 'pending';
        return { description: tc.description, hidden: tc.hidden, status: objStatus };
    }) ?? [];
    return (_jsxs("div", { className: "terminal-container", style: { position: 'relative' }, children: [_jsxs("div", { className: "terminal-header", children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("span", { className: "terminal-title", children: challenge !== null ? `▶ ${challenge.chapter}.${challenge.order} HACK` : '▶ TERMINAL' }), _jsx("span", { className: "terminal-status-indicator", style: { backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}` }, title: statusLabels[status] }), _jsx("span", { style: { color: statusColor, fontSize: '12px' }, children: statusLabels[status] })] }), _jsxs("div", { className: "terminal-header-actions", children: [_jsx("button", { className: "terminal-btn", onClick: handleReset, disabled: isDisabled, "aria-label": "Reset code to initial state", style: { fontSize: '12px', color: '#ffb454', borderColor: '#ffb454' }, children: "\u21BA RESET" }), _jsx("button", { className: "terminal-btn terminal-btn-close", onClick: handleClose, "aria-label": "Close terminal (Escape)", children: "\u2715 CLOSE" })] })] }), challenge !== null && (_jsxs("div", { className: "terminal-challenge-desc", children: [_jsx("div", { className: "terminal-challenge-desc-title", children: `CH${String(challenge.chapter).padStart(2, '0')}.${String(challenge.order).padStart(2, '0')} • ${t(nsKey(challenge.titleKey))}` }), _jsxs("div", { className: "terminal-challenge-desc-meta", children: [challenge.difficulty.toUpperCase(), " \u2022 +", challenge.xpReward, " XP"] }), _jsx("div", { className: "terminal-challenge-desc-body", children: t(nsKey(challenge.descriptionKey)) })] })), objectives.length > 0 && (_jsxs("div", { className: "terminal-objectives", children: [_jsxs("div", { className: "terminal-objectives-title", children: ["\uD83C\uDFAF MISSION OBJECTIVES (", objectives.filter((o) => o.status === 'passed').length, "/", objectives.filter((o) => !o.hidden).length, ")"] }), objectives
                        .filter((o) => !o.hidden)
                        .map((obj, i) => (_jsxs("div", { className: `terminal-objective-item ${obj.status}`, children: [_jsx("span", { className: "terminal-objective-check", children: obj.status === 'passed' ? '✓' : obj.status === 'failed' ? '✗' : '○' }), _jsx("span", { children: obj.description })] }, i)))] })), _jsxs("div", { className: "terminal-split", style: breakpoint === 'mobile' ? { flexDirection: 'column' } : undefined, children: [_jsx("div", { className: "terminal-editor-area", children: _jsx(TerminalEditor, { ref: editorRef, initialCode: initialCode, onRun: handleRun, onSubmit: handleSubmit, disabled: isDisabled, ...(isAndroid && !keyboardSettings.useNativeKeyboard ? { isAndroid: true } : {}), ...(readOnlyRanges ? { readOnlyRanges } : {}) }, editorKey) }), _jsx(OutputPanel, { outputs: outputs, onClear: resetState })] }), result !== null && (_jsx("div", { className: "terminal-result-panel", children: result.passed ? (_jsx("div", { className: "terminal-result-pass", children: _jsx("span", { children: "\u2713 HACK SUCCESSFUL" }) })) : (_jsx("div", { className: "terminal-result-fail", children: _jsx("span", { children: "\u2717 Tests failed \u2014 check objectives and try again" }) })) })), hints.length > 0 && (_jsxs("div", { className: "terminal-hints-panel", children: [_jsx("div", { className: "terminal-hints-title", children: "\uD83D\uDCA1 CIPHER HINT" }), hints.map((hint, i) => (_jsx("div", { className: "terminal-hint-item", children: hint }, i)))] })), breakpoint === 'mobile' &&
                (isAndroid && !keyboardSettings.useNativeKeyboard ? (_jsx(CodeKeyboard, { onInput: handleSymbol, onBackspace: handleBackspace, keyboardLayout: keyboardSettings.keyboardLayout })) : (_jsx(MobileSymbolBar, { onSymbol: handleSymbol }))), _jsxs("div", { className: "terminal-status-bar", children: [_jsx("span", { children: interpreter.getVersion() }), _jsx("span", { children: "Run \u25B6 to test \u2022 Submit \u2713 to evaluate \u2022 Esc to close" })] }), showSuccess && challenge !== null && (_jsx(ChallengeSuccessOverlay, { challengeTitle: t(nsKey(challenge.titleKey)), xpEarned: challenge.xpReward, onDismiss: handleSuccessDismiss }))] }));
}
// ─── Public export ─────────────────────────────────────────────────────────────
function HackingTerminalInner(props) {
    const { challengeId, interpreter, initialCode, readOnlyRanges, onClose, onSubmit, onChallengeSuccess, } = props;
    if (challengeId !== undefined) {
        return (_jsx(ChallengeModeTerminal, { challengeId: challengeId, onClose: onClose, ...(readOnlyRanges ? { readOnlyRanges } : {}), ...(onSubmit ? { onSubmit } : {}), ...(onChallengeSuccess ? { onChallengeSuccess } : {}) }));
    }
    // Free-form mode — create a stable internal MockInterpreter if none is passed
    const effectiveInterpreter = interpreter;
    if (effectiveInterpreter === undefined) {
        // This path is for when no interpreter is provided and no challengeId either.
        // Render an empty disabled state — caller should pass an interpreter for free mode.
        return (_jsx("div", { className: "terminal-container", children: _jsx("div", { className: "terminal-loading", children: _jsx("span", { children: "No interpreter configured" }) }) }));
    }
    return (_jsx(FreeModeTerminal, { interpreter: effectiveInterpreter, initialCode: initialCode ?? '# Write your Python code here\n', onClose: onClose, ...(readOnlyRanges ? { readOnlyRanges } : {}), ...(onSubmit ? { onSubmit } : {}) }));
}
export const HackingTerminal = React.memo(HackingTerminalInner);
//# sourceMappingURL=HackingTerminal.js.map