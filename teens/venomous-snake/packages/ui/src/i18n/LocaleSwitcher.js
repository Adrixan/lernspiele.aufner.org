import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
const FONT_FAMILY = "'JetBrains Mono', 'Fira Code', monospace";
const LANGUAGES = ['en', 'de'];
const LABELS = {
    en: 'EN',
    de: 'DE',
};
export function LocaleSwitcher({ className }) {
    const { i18n } = useTranslation();
    const current = (LANGUAGES.includes(i18n.language) ? i18n.language : 'en');
    const switchTo = (lang) => {
        void i18n.changeLanguage(lang);
    };
    return (_jsx("div", { className: className, role: "group", "aria-label": "Language selector", style: {
            display: 'inline-flex',
            border: '1px solid #1a2a3a',
            overflow: 'hidden',
        }, children: LANGUAGES.map((lang) => (_jsx("button", { onClick: () => switchTo(lang), "aria-pressed": current === lang, style: {
                background: current === lang ? 'rgba(0,255,136,0.15)' : 'transparent',
                border: 'none',
                borderRight: lang !== LANGUAGES[LANGUAGES.length - 1] ? '1px solid #1a2a3a' : 'none',
                color: current === lang ? '#00ff88' : '#3d4752',
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: current === lang ? 'bold' : 'normal',
                padding: '6px 12px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.15s ease',
            }, children: LABELS[lang] }, lang))) }));
}
//# sourceMappingURL=LocaleSwitcher.js.map