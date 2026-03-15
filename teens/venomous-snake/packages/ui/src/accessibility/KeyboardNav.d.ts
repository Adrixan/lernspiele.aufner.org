export interface ArrowNavigationOptions {
    wrap?: boolean;
    orientation?: 'horizontal' | 'vertical' | 'both';
}
/**
 * Adds arrow-key navigation across a list of focusable elements.
 * Call this hook with a stable reference to the `items` array.
 */
export declare function useArrowNavigation(items: HTMLElement[], options?: ArrowNavigationOptions): void;
//# sourceMappingURL=KeyboardNav.d.ts.map