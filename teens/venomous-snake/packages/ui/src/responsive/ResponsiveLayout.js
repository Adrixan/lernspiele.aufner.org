import { jsx as _jsx } from "react/jsx-runtime";
import { useBreakpoint } from './useBreakpoint';
const mobileStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
};
const tabletStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
};
const desktopStyle = {
    display: 'grid',
    gridTemplateColumns: '240px 1fr 240px',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
};
/**
 * Wraps children with responsive container styles.
 * - mobile  (<640px)   : vertical stack
 * - tablet  (640-1024) : horizontal sidebar layout
 * - desktop (>1024px)  : full multi-panel grid
 */
export function ResponsiveLayout({ children, className, }) {
    const bp = useBreakpoint();
    const layoutStyle = bp === 'mobile' ? mobileStyle : bp === 'tablet' ? tabletStyle : desktopStyle;
    return (_jsx("div", { style: layoutStyle, className: className, "data-breakpoint": bp, children: children }));
}
//# sourceMappingURL=ResponsiveLayout.js.map