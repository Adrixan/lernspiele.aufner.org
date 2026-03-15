import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap, } from '@codemirror/autocomplete';
import { terminalTheme, syntaxTheme } from './terminalTheme';
import './terminal.css';
function TerminalEditorInner({ initialCode = '', readOnlyRanges, onRun, onSubmit, onChange, disabled = false, isAndroid = false, }, ref) {
    const containerRef = useRef(null);
    const viewRef = useRef(null);
    const readOnlyCompartment = useRef(new Compartment());
    const onRunRef = useRef(onRun);
    const onSubmitRef = useRef(onSubmit);
    const onChangeRef = useRef(onChange);
    onRunRef.current = onRun;
    onSubmitRef.current = onSubmit;
    onChangeRef.current = onChange;
    // Dynamically update readOnly when disabled prop changes
    useEffect(() => {
        const view = viewRef.current;
        if (view) {
            view.dispatch({
                effects: readOnlyCompartment.current.reconfigure(EditorState.readOnly.of(disabled)),
            });
        }
    }, [disabled]);
    const handleRunClick = useCallback(() => {
        const view = viewRef.current;
        if (view) {
            onRunRef.current(view.state.doc.toString());
        }
    }, []);
    const handleSubmitClick = useCallback(() => {
        const view = viewRef.current;
        if (view) {
            onSubmitRef.current?.(view.state.doc.toString());
        }
    }, []);
    useImperativeHandle(ref, () => ({
        insertAtCursor: (text) => {
            const view = viewRef.current;
            if (!view)
                return;
            const { from, to } = view.state.selection.main;
            view.dispatch({
                changes: { from, to, insert: text },
                selection: { anchor: from + text.length },
            });
            view.focus();
        },
        deleteAtCursor: () => {
            const view = viewRef.current;
            if (!view)
                return;
            const { from, to } = view.state.selection.main;
            if (from !== to) {
                view.dispatch({ changes: { from, to, insert: '' }, selection: { anchor: from } });
            }
            else if (from > 0) {
                view.dispatch({ changes: { from: from - 1, to: from } });
            }
        },
    }));
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const extensions = [
            lineNumbers(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            history(),
            closeBrackets(),
            autocompletion(),
            python(),
            terminalTheme,
            syntaxTheme,
            keymap.of([
                {
                    key: 'Ctrl-Enter',
                    mac: 'Cmd-Enter',
                    run: (view) => {
                        onRunRef.current(view.state.doc.toString());
                        return true;
                    },
                },
                indentWithTab,
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...historyKeymap,
                ...completionKeymap,
            ]),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    onChangeRef.current?.(update.state.doc.toString());
                }
            }),
            readOnlyCompartment.current.of(EditorState.readOnly.of(disabled)),
            // On Android with custom keyboard, suppress the system IME
            EditorView.contentAttributes.of({
                inputmode: isAndroid ? 'none' : 'text',
                enterkeyhint: 'done',
                autocapitalize: 'off',
                autocorrect: 'off',
                spellcheck: 'false',
            }),
        ];
        if (readOnlyRanges && readOnlyRanges.length > 0) {
            const ranges = readOnlyRanges;
            extensions.push(EditorState.changeFilter.of((tr) => {
                let dominated = false;
                tr.changes.iterChanges((fromA, toA) => {
                    for (const range of ranges) {
                        if (fromA < range.to && toA > range.from) {
                            dominated = true;
                        }
                    }
                });
                return !dominated;
            }));
        }
        const state = EditorState.create({
            doc: initialCode,
            extensions,
        });
        const view = new EditorView({ state, parent: container });
        viewRef.current = view;
        return () => {
            view.destroy();
            viewRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsxs("div", { className: `terminal-editor-wrapper${isAndroid ? ' android-custom-kb' : ''}`, children: [_jsx("div", { ref: containerRef, className: "terminal-editor-cm", "aria-label": "Python code editor" }), _jsxs("div", { className: "terminal-editor-toolbar", children: [_jsx("button", { className: "terminal-btn terminal-btn-run", onClick: handleRunClick, disabled: disabled, "aria-label": "Run code (Ctrl+Enter)", children: "Run \u25B6" }), onSubmit !== undefined && (_jsx("button", { className: "terminal-btn terminal-btn-submit", onClick: handleSubmitClick, disabled: disabled, "aria-label": "Submit solution", children: "Submit \u2713" })), _jsx("span", { style: { fontSize: '11px', color: '#3d4752' }, children: "Ctrl+Enter" })] })] }));
}
export const TerminalEditor = React.memo(forwardRef(TerminalEditorInner));
//# sourceMappingURL=TerminalEditor.js.map