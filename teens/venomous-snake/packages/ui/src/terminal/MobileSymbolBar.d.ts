import React from 'react';
export interface MobileSymbolBarProps {
    /** Called when a symbol button is pressed */
    onSymbol: (symbol: string) => void;
    /** Whether to render the bar (defaults to true) */
    visible?: boolean;
}
/**
 * Row of common Python symbols for mobile keyboards.
 * Sticky at the bottom of the terminal on mobile.
 */
export declare function MobileSymbolBar({ onSymbol, visible, }: MobileSymbolBarProps): React.JSX.Element | null;
//# sourceMappingURL=MobileSymbolBar.d.ts.map