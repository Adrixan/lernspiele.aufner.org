import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
function useSpotlightRect(selector) {
    const [rect, setRect] = useState(null);
    useEffect(() => {
        if (!selector) {
            setRect(null);
            return;
        }
        const measure = () => {
            const el = document.querySelector(selector);
            if (el) {
                const r = el.getBoundingClientRect();
                setRect({ top: r.top - 8, left: r.left - 8, width: r.width + 16, height: r.height + 16 });
            }
            else {
                setRect(null);
            }
        };
        measure();
        const id = setInterval(measure, 300);
        return () => clearInterval(id);
    }, [selector]);
    return rect;
}
export function TutorialOverlay({ step, onComplete, onSkip, }) {
    const { t } = useTranslation('story');
    const spotlightRect = useSpotlightRect(step.highlightElement);
    const overlayRef = useRef(null);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onComplete();
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            onSkip();
        }
    }, [onComplete, onSkip]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    // Where to anchor the speech bubble: below spotlight if it exists, else center-bottom
    const bubbleStyle = spotlightRect
        ? {
            position: 'fixed',
            top: spotlightRect.top + spotlightRect.height + 16,
            left: Math.min(Math.max(spotlightRect.left, 16), window.innerWidth - 380),
            width: 360,
        }
        : {
            position: 'fixed',
            bottom: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 360,
        };
    return (_jsxs("div", { ref: overlayRef, style: {
            position: 'fixed',
            inset: 0,
            zIndex: 8000,
            pointerEvents: 'none',
            fontFamily: FONT_FAMILY,
        }, "aria-live": "polite", "aria-label": "Tutorial hint", children: [_jsxs("svg", { style: {
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                }, "aria-hidden": "true", children: [_jsx("defs", { children: _jsxs("mask", { id: "tutorial-spotlight-mask", children: [_jsx("rect", { width: "100%", height: "100%", fill: "white" }), spotlightRect && (_jsx("rect", { x: spotlightRect.left, y: spotlightRect.top, width: spotlightRect.width, height: spotlightRect.height, rx: 6, fill: "black" }))] }) }), _jsx("rect", { width: "100%", height: "100%", fill: "rgba(0,0,0,0.65)", mask: "url(#tutorial-spotlight-mask)" }), spotlightRect && (_jsx("rect", { x: spotlightRect.left, y: spotlightRect.top, width: spotlightRect.width, height: spotlightRect.height, rx: 6, fill: "none", stroke: "#00e5ff", strokeWidth: 2, style: { filter: 'drop-shadow(0 0 6px #00e5ff)' } }))] }), _jsxs("div", { style: {
                    ...bubbleStyle,
                    pointerEvents: 'auto',
                    background: 'linear-gradient(135deg, #0d1b2a 0%, #0a0a1a 100%)',
                    border: '1px solid #00e5ff',
                    borderRadius: 8,
                    padding: '16px 18px',
                    boxShadow: '0 0 24px rgba(0,229,255,0.18)',
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }, children: [_jsx("div", { style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    background: 'rgba(0,229,255,0.12)',
                                    border: '1.5px solid #00e5ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#00e5ff',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    flexShrink: 0,
                                }, children: "AI" }), _jsx("span", { style: {
                                    color: '#00e5ff',
                                    fontWeight: 700,
                                    fontSize: 12,
                                    letterSpacing: '0.08em',
                                }, children: "CIPHER" })] }), _jsx("p", { style: {
                            color: '#d0d0d0',
                            fontSize: 13,
                            lineHeight: 1.6,
                            margin: '0 0 14px',
                        }, children: t(step.cipherDialog) }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx("button", { onClick: onSkip, style: {
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.35)',
                                    fontSize: 11,
                                    cursor: 'pointer',
                                    fontFamily: FONT_FAMILY,
                                    padding: '4px 0',
                                    textDecoration: 'underline',
                                }, children: t('tutorial.skipTutorial') }), _jsxs("button", { onClick: onComplete, autoFocus: true, style: {
                                    background: 'rgba(0,229,255,0.12)',
                                    border: '1px solid #00e5ff',
                                    color: '#00e5ff',
                                    fontFamily: FONT_FAMILY,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: '6px 18px',
                                    cursor: 'pointer',
                                    letterSpacing: '0.05em',
                                }, children: [t('tutorial.gotIt'), " \u2713"] })] })] })] }));
}
//# sourceMappingURL=TutorialOverlay.js.map