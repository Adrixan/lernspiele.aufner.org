import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const HIDDEN_STYLE = {
    position: 'absolute',
    top: '-40px',
    left: 0,
    padding: '8px 16px',
    background: '#00ff9d',
    color: '#000',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: '13px',
    fontWeight: 'bold',
    textDecoration: 'none',
    zIndex: 10000,
    transition: 'top 0.1s',
    borderRadius: '0 0 4px 0',
};
const VISIBLE_STYLE = {
    ...HIDDEN_STYLE,
    top: '0',
};
/** Skip-to-content link — hidden until focused via keyboard Tab. */
export function SkipLink({ targetId }) {
    const { t } = useTranslation('ui');
    const [focused, setFocused] = useState(false);
    return (_jsx("a", { href: `#${targetId}`, style: focused ? VISIBLE_STYLE : HIDDEN_STYLE, onFocus: () => setFocused(true), onBlur: () => setFocused(false), children: t('accessibility.skip_to_content') }));
}
//# sourceMappingURL=SkipLink.js.map