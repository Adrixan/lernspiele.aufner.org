import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './terminal.css';
function OutputPanelInner({ outputs, onClear, inputPrompt, onInputSubmit, }) {
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [outputs]);
    useEffect(() => {
        if (inputPrompt !== undefined) {
            inputRef.current?.focus();
        }
    }, [inputPrompt]);
    const handleInputKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onInputSubmit?.(inputValue);
            setInputValue('');
        }
    }, [inputValue, onInputSubmit]);
    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);
    return (_jsxs("div", { className: "terminal-output-area", children: [_jsxs("div", { className: "terminal-output-header", children: [_jsx("span", { className: "terminal-output-label", children: "Output" }), _jsx("button", { className: "terminal-btn terminal-btn-clear", onClick: onClear, "aria-label": "Clear output", children: "Clear" })] }), _jsxs("div", { role: "log", "aria-live": "polite", "aria-label": "Program output", className: "terminal-output-log", children: [outputs.length === 0 ? (_jsx("span", { className: "terminal-output-empty", children: "No output yet. Run your code with Ctrl+Enter." })) : (outputs.map((item, index) => (_jsx("pre", { className: item.type === 'stderr' ? 'terminal-output-stderr' : 'terminal-output-stdout', children: item.text }, index)))), _jsx("div", { ref: bottomRef })] }), inputPrompt !== undefined && (_jsxs("div", { className: "terminal-input-area", children: [_jsx("span", { className: "terminal-input-prompt", children: inputPrompt }), _jsx("input", { ref: inputRef, className: "terminal-input-field", type: "text", value: inputValue, onChange: handleInputChange, onKeyDown: handleInputKeyDown, "aria-label": "Program input" })] }))] }));
}
export const OutputPanel = React.memo(OutputPanelInner);
//# sourceMappingURL=OutputPanel.js.map