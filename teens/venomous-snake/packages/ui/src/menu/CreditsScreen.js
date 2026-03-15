import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0)
        return `${h}h ${m}m`;
    if (m > 0)
        return `${m}m ${s}s`;
    return `${s}s`;
}
export function CreditsScreen({ stats, onNewGamePlus, onReturnToMenu, }) {
    const { t } = useTranslation('story');
    const [scrollOffset, setScrollOffset] = useState(600);
    useEffect(() => {
        const id = setInterval(() => {
            setScrollOffset((y) => y - 0.6);
        }, 16);
        return () => clearInterval(id);
    }, []);
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                onReturnToMenu();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onReturnToMenu]);
    const statItems = [
        { labelKey: 'credits.stats.challengesCompleted', value: String(stats.challengesCompleted) },
        { labelKey: 'credits.stats.totalXp', value: `${stats.totalXp.toLocaleString()} XP` },
        { labelKey: 'credits.stats.timePlayed', value: formatTime(stats.timePlayed) },
        { labelKey: 'credits.stats.achievementsUnlocked', value: String(stats.achievementsUnlocked) },
        { labelKey: 'credits.stats.floorsCleared', value: String(stats.floorsCleared) },
    ];
    return (_jsxs("div", { style: {
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'linear-gradient(180deg, #000005 0%, #0a0a1a 60%, #0d1b2a 100%)',
            fontFamily: FONT_FAMILY,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }, children: [_jsxs("div", { style: {
                    padding: '40px 40px 0',
                    flexShrink: 0,
                    maxWidth: 600,
                    margin: '0 auto',
                    width: '100%',
                }, children: [_jsx("h1", { style: {
                            color: '#00e5ff',
                            fontSize: 'clamp(22px, 4vw, 36px)',
                            textAlign: 'center',
                            margin: '0 0 6px',
                            letterSpacing: '0.1em',
                            textShadow: '0 0 20px rgba(0,229,255,0.5)',
                        }, children: t('credits.title') }), _jsx("p", { style: {
                            color: 'rgba(255,255,255,0.5)',
                            textAlign: 'center',
                            fontSize: 13,
                            margin: '0 0 28px',
                            letterSpacing: '0.05em',
                        }, children: t('credits.subtitle') }), _jsxs("div", { style: {
                            background: 'rgba(0,229,255,0.04)',
                            border: '1px solid rgba(0,229,255,0.2)',
                            padding: '20px 24px',
                            marginBottom: 28,
                        }, children: [_jsx("h2", { style: {
                                    color: '#00ff88',
                                    fontSize: 12,
                                    letterSpacing: '0.12em',
                                    margin: '0 0 16px',
                                    textTransform: 'uppercase',
                                }, children: t('credits.stats.heading') }), statItems.map(({ labelKey, value }) => (_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    padding: '6px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                }, children: [_jsx("span", { style: { color: 'rgba(255,255,255,0.55)', fontSize: 12 }, children: t(labelKey) }), _jsx("span", { style: { color: '#d0d0d0', fontSize: 14, fontWeight: 700 }, children: value })] }, labelKey)))] }), _jsxs("div", { style: { display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }, children: [_jsxs("button", { onClick: onNewGamePlus, style: {
                                    flex: 1,
                                    minWidth: 160,
                                    background: 'rgba(0,255,136,0.08)',
                                    border: '1px solid #00ff88',
                                    color: '#00ff88',
                                    fontFamily: FONT_FAMILY,
                                    fontSize: 12,
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    letterSpacing: '0.06em',
                                    textAlign: 'center',
                                }, children: ["\u26A1 ", t('credits.newGamePlus')] }), _jsxs("button", { onClick: onReturnToMenu, autoFocus: true, style: {
                                    flex: 1,
                                    minWidth: 140,
                                    background: 'rgba(0,229,255,0.08)',
                                    border: '1px solid #00e5ff',
                                    color: '#00e5ff',
                                    fontFamily: FONT_FAMILY,
                                    fontSize: 12,
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    letterSpacing: '0.06em',
                                    textAlign: 'center',
                                }, children: ["\u2190 ", t('credits.returnToMenu')] })] })] }), _jsxs("div", { style: { flex: 1, overflow: 'hidden', position: 'relative' }, children: [_jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 48,
                            background: 'linear-gradient(to bottom, #0a0a1a, transparent)',
                            zIndex: 1,
                            pointerEvents: 'none',
                        } }), _jsxs("div", { style: {
                            position: 'absolute',
                            left: '50%',
                            transform: `translate(-50%, ${scrollOffset}px)`,
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: 540,
                            padding: '0 24px',
                        }, children: [_jsx("div", { style: {
                                    color: '#00e5ff',
                                    fontSize: 'clamp(18px, 3.5vw, 28px)',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    marginBottom: 8,
                                    textShadow: '0 0 16px rgba(0,229,255,0.4)',
                                }, children: t('credits.scrollTitle') }), _jsx("div", { style: {
                                    color: 'rgba(255,255,255,0.45)',
                                    fontSize: 13,
                                    letterSpacing: '0.06em',
                                    marginBottom: 60,
                                }, children: t('credits.scrollSubtitle') }), _jsx("div", { style: {
                                    color: '#00ff88',
                                    fontSize: 'clamp(20px, 4vw, 32px)',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    marginBottom: 12,
                                    textShadow: '0 0 20px rgba(0,255,136,0.4)',
                                }, children: t('credits.thankYou') }), _jsx("div", { style: { color: 'rgba(255,255,255,0.3)', fontSize: 12, marginBottom: 80 }, children: t('credits.builtWith') }), _jsxs("div", { style: {
                                    color: 'rgba(0,229,255,0.25)',
                                    fontSize: 11,
                                    lineHeight: 1.8,
                                    letterSpacing: '0.05em',
                                }, children: [_jsx("div", { children: "$ python --version" }), _jsx("div", { children: "Python 3.12.0" }), _jsx("div", { children: "\u00A0" }), _jsx("div", { children: "$ ./venomous_snake --credits" }), _jsx("div", { children: "Mission complete. Well played." }), _jsx("div", { children: "\u00A0" }), _jsx("div", { children: "\u2588" })] })] })] })] }));
}
//# sourceMappingURL=CreditsScreen.js.map