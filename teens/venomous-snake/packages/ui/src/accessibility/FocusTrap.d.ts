import React from 'react';
export interface FocusTrapProps {
    children: React.ReactNode;
    active: boolean;
}
/**
 * Traps keyboard focus within the container when `active` is true.
 * Useful for modal dialogs and overlays.
 */
export declare function FocusTrap({ children, active }: FocusTrapProps): React.JSX.Element;
//# sourceMappingURL=FocusTrap.d.ts.map