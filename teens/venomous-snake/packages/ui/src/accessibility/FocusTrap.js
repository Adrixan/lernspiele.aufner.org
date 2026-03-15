import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
/**
 * Traps keyboard focus within the container when `active` is true.
 * Useful for modal dialogs and overlays.
 */
export function FocusTrap({ children, active }) {
    const containerRef = useRef(null);
    useEffect(() => {
        if (!active)
            return undefined;
        const container = containerRef.current;
        if (container === null)
            return undefined;
        const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        // Focus the first focusable element on mount
        first?.focus();
        const handleKeyDown = (e) => {
            if (e.key !== 'Tab')
                return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            }
            else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };
        container.addEventListener('keydown', handleKeyDown);
        return () => container.removeEventListener('keydown', handleKeyDown);
    }, [active]);
    return _jsx("div", { ref: containerRef, children: children });
}
//# sourceMappingURL=FocusTrap.js.map