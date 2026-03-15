import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { CipherPortrait } from '../cipher/CipherPortrait';
import { NpcPortrait } from './portraits/NpcPortrait';
/** Extract the item ID from a `lockReason` string like `'inventory:id_card'`. */
function parseLockItemId(lockReason) {
    if (lockReason.startsWith('inventory:'))
        return lockReason.slice('inventory:'.length);
    return null;
}
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
const CHAR_DELAY_MS = 30;
const SPEAKER_COLORS = {
    cipher: '#00e5ff',
    guard: '#ff9f1c',
    silva: '#00ff88',
};
const DEFAULT_SPEAKER_COLOR = '#ff00ff';
const KEYFRAMES = `
@keyframes dlg-blink { 50% { opacity: 0; } }
@keyframes dlg-chevron-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
@keyframes dlg-slide-up {
  from { transform: translateY(32px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes dlg-fade-in { from { opacity: 0; } to { opacity: 1; } }
`;
export function DialogOverlay({ isOpen, currentNode, displayChoices, advance, selectChoice, }) {
    const { t } = useTranslation('dialog');
    const uid = useId();
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [visible, setVisible] = useState(false);
    const intervalRef = useRef(null);
    const fullText = currentNode ? t(currentNode.textKey) : '';
    const speakerName = currentNode?.speakerNameKey ? t(currentNode.speakerNameKey) : null;
    const portraitId = currentNode?.portraitId ?? null;
    const speakerColor = portraitId !== null
        ? (SPEAKER_COLORS[portraitId] ?? DEFAULT_SPEAKER_COLOR)
        : DEFAULT_SPEAKER_COLOR;
    const hasChoices = displayChoices.length > 0;
    // Animate overlay in/out.
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        }
        else {
            const id = setTimeout(() => setVisible(false), 200);
            return () => clearTimeout(id);
        }
    }, [isOpen]);
    // Typewriter effect — restart whenever the node text changes.
    useEffect(() => {
        if (!isOpen || !currentNode)
            return;
        if (intervalRef.current !== null)
            clearInterval(intervalRef.current);
        setDisplayedText('');
        setIsTyping(true);
        let idx = 0;
        intervalRef.current = setInterval(() => {
            idx += 1;
            setDisplayedText(fullText.slice(0, idx));
            if (idx >= fullText.length) {
                if (intervalRef.current !== null)
                    clearInterval(intervalRef.current);
                intervalRef.current = null;
                setIsTyping(false);
            }
        }, CHAR_DELAY_MS);
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
        // fullText changes whenever currentNode changes — that's the intended trigger.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentNode?.id, isOpen]);
    /** Complete typewriter instantly, or (if already done) advance the dialog. */
    const handleAdvance = useCallback(() => {
        if (isTyping) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setDisplayedText(fullText);
            setIsTyping(false);
            return;
        }
        if (!hasChoices)
            advance();
    }, [isTyping, fullText, hasChoices, advance]);
    // Global keyboard handler.
    useEffect(() => {
        if (!isOpen)
            return;
        const onKeyDown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAdvance();
            }
            else if (e.key === 'Escape') {
                e.preventDefault();
                if (isTyping) {
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setDisplayedText(fullText);
                    setIsTyping(false);
                }
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, isTyping, fullText, handleAdvance]);
    if (!visible && !isOpen)
        return null;
    const opacity = isOpen ? 1 : 0;
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: KEYFRAMES }), _jsx("div", { "aria-hidden": "true", style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    background: 'rgba(0,0,0,0.55)',
                    transition: 'opacity 0.2s ease',
                    opacity,
                    pointerEvents: isOpen ? 'auto' : 'none',
                }, onClick: !hasChoices ? handleAdvance : undefined }), _jsx("div", { role: "dialog", "aria-modal": "true", "aria-label": speakerName ?? 'NPC Dialog', style: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 101,
                    padding: '0 clamp(16px, 4vw, 60px) clamp(16px, 3vh, 40px)',
                    fontFamily: FONT_FAMILY,
                    transition: 'opacity 0.2s ease',
                    opacity,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    animation: isOpen ? 'dlg-slide-up 0.22s ease forwards' : 'none',
                }, children: _jsxs("div", { style: {
                        maxWidth: 860,
                        margin: '0 auto',
                        background: 'rgba(8,10,18,0.96)',
                        border: `1px solid ${speakerColor}44`,
                        boxShadow: `0 0 24px ${speakerColor}22, inset 0 1px 0 rgba(255,255,255,0.04)`,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 20,
                        padding: '20px 24px',
                        minHeight: 120,
                    }, children: [portraitId !== null && (_jsx("div", { style: { flexShrink: 0 }, children: portraitId === 'cipher' ? (_jsx(CipherPortrait, { mood: "neutral", size: 80 })) : (_jsx(NpcPortrait, { portraitId: portraitId, size: 80 })) })), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [speakerName !== null && (_jsx("div", { style: {
                                        fontSize: 11,
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        color: speakerColor,
                                        marginBottom: 8,
                                        fontWeight: 700,
                                        textShadow: `0 0 8px ${speakerColor}`,
                                    }, children: speakerName })), _jsxs("p", { id: `${uid}-text`, "aria-live": "polite", style: {
                                        margin: '0 0 16px',
                                        color: '#d0d8e8',
                                        fontSize: 'clamp(13px, 1.8vw, 16px)',
                                        lineHeight: 1.65,
                                        minHeight: 48,
                                        wordBreak: 'break-word',
                                    }, children: [displayedText, isTyping && (_jsx("span", { "aria-hidden": "true", style: {
                                                display: 'inline-block',
                                                width: 2,
                                                height: '1em',
                                                background: speakerColor,
                                                marginLeft: 2,
                                                verticalAlign: 'text-bottom',
                                                animation: 'dlg-blink 0.7s step-end infinite',
                                            } }))] }), hasChoices && !isTyping && (_jsx("div", { role: "group", "aria-label": "Dialog choices", style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: (() => {
                                        let availableIndex = 0;
                                        return displayChoices.map((dc) => {
                                            const isLocked = !dc.available;
                                            const myAvailIndex = isLocked ? -1 : availableIndex++;
                                            const itemId = dc.lockReason !== undefined ? parseLockItemId(dc.lockReason) : null;
                                            const requiresLabel = itemId !== null
                                                ? t('ui.requires_item', {
                                                    item: t(`items.${itemId}`, { defaultValue: itemId }),
                                                })
                                                : null;
                                            return (_jsxs("button", { type: "button", disabled: isLocked, title: requiresLabel ?? undefined, onClick: () => {
                                                    if (!isLocked && myAvailIndex !== -1)
                                                        selectChoice(myAvailIndex);
                                                }, style: choiceButtonStyle(speakerColor, isLocked), tabIndex: isLocked ? -1 : 0, "aria-disabled": isLocked, children: [_jsx("span", { "aria-hidden": "true", style: {
                                                            color: isLocked ? 'rgba(255,255,255,0.25)' : speakerColor,
                                                            marginRight: 8,
                                                        }, children: isLocked ? '🔒' : '›' }), _jsx("span", { style: { opacity: isLocked ? 0.4 : 1 }, children: t(dc.choice.textKey) }), requiresLabel !== null && (_jsx("span", { "aria-label": requiresLabel, style: {
                                                            display: 'block',
                                                            fontSize: 10,
                                                            color: 'rgba(255,159,28,0.7)',
                                                            marginTop: 3,
                                                            letterSpacing: '0.05em',
                                                        }, children: requiresLabel }))] }, dc.choice.nextNodeId));
                                        });
                                    })() })), !hasChoices && !isTyping && (_jsx("div", { "aria-hidden": "true", style: {
                                        textAlign: 'right',
                                        color: speakerColor,
                                        fontSize: 18,
                                        animation: 'dlg-chevron-blink 1s ease-in-out infinite',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                    }, onClick: handleAdvance, children: "\u25BC" })), _jsx("div", { "aria-hidden": "true", style: {
                                        marginTop: 4,
                                        fontSize: 10,
                                        color: 'rgba(255,255,255,0.2)',
                                        letterSpacing: '0.08em',
                                    }, children: isTyping
                                        ? 'ENTER / CLICK — skip'
                                        : hasChoices
                                            ? 'TAB — navigate · ENTER — select'
                                            : 'ENTER / CLICK — continue' })] })] }) })] }));
}
function choiceButtonStyle(accentColor, isLocked = false) {
    return {
        background: isLocked ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: `1px solid ${isLocked ? 'rgba(255,255,255,0.1)' : `${accentColor}44`}`,
        color: '#d0d8e8',
        fontFamily: FONT_FAMILY,
        fontSize: 'clamp(12px, 1.6vw, 14px)',
        padding: '10px 16px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        transition: 'background 0.15s, border-color 0.15s',
        letterSpacing: '0.03em',
        lineHeight: 1.4,
        minHeight: 44,
        width: '100%',
    };
}
//# sourceMappingURL=DialogOverlay.js.map