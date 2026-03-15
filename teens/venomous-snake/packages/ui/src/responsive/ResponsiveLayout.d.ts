import React from 'react';
interface ResponsiveLayoutProps {
    /** Rendered on all breakpoints, styled per layout */
    children: React.ReactNode;
    /** Optional override class for the root wrapper */
    className?: string;
}
/**
 * Wraps children with responsive container styles.
 * - mobile  (<640px)   : vertical stack
 * - tablet  (640-1024) : horizontal sidebar layout
 * - desktop (>1024px)  : full multi-panel grid
 */
export declare function ResponsiveLayout({ children, className, }: ResponsiveLayoutProps): React.JSX.Element;
export {};
//# sourceMappingURL=ResponsiveLayout.d.ts.map