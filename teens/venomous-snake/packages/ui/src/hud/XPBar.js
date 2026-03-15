import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XPSystem, LEVEL_THRESHOLDS } from '@venomous-snake/challenge-engine';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const xpSystem = new XPSystem();
export function XPBar({ xp, level, title, reducedMotion = false }) {
    const { t } = useTranslation('ui');
    const prevXpRef = useRef(xp);
    const [isGlowing, setIsGlowing] = useState(false);
    useEffect(() => {
        if (xp > prevXpRef.current && !reducedMotion) {
            setIsGlowing(true);
            const timer = setTimeout(() => setIsGlowing(false), 1200);
            prevXpRef.current = xp;
            return () => clearTimeout(timer);
        }
        prevXpRef.current = xp;
        return undefined;
    }, [xp, reducedMotion]);
    const progress = xpSystem.getProgressToNextLevel(xp);
    const isMaxLevel = level >= (LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]?.level ?? 10);
    const containerStyle = {
        fontFamily: FONT_FAMILY,
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        minWidth: '180px',
    };
    const topRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '8px',
    };
    const trackStyle = {
        height: '6px',
        background: '#1a1a2e',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid #222',
        position: 'relative',
    };
    const fillStyle = {
        height: '100%',
        width: `${progress.percentage}%`,
        background: isGlowing ? '#fff' : '#00ff9d',
        borderRadius: '3px',
        transition: reducedMotion
            ? 'none'
            : 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease',
        boxShadow: isGlowing ? '0 0 12px #00ff9d' : 'none',
    };
    const xpText = isMaxLevel
        ? t('hud.max_level')
        : `${progress.current} / ${progress.needed} ${t('hud.xp')}`;
    return (_jsxs("div", { style: containerStyle, "aria-label": `${t('hud.level')} ${level}: ${title}`, children: [_jsxs("div", { style: topRowStyle, children: [_jsxs("span", { style: {
                            color: '#00ff9d',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                        }, children: [t('hud.level'), " ", level] }), _jsx("span", { style: {
                            color: '#ffb454',
                            fontSize: '10px',
                            maxWidth: '110px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }, title: title, children: title })] }), _jsx("div", { style: trackStyle, role: "progressbar", "aria-valuenow": progress.percentage, "aria-valuemin": 0, "aria-valuemax": 100, children: _jsx("div", { style: fillStyle }) }), _jsx("div", { style: { color: '#555', fontSize: '9px', textAlign: 'right' }, children: xpText })] }));
}
//# sourceMappingURL=XPBar.js.map