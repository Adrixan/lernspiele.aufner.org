type AnnouncePriority = 'polite' | 'assertive';
/**
 * Returns an `announce` function that sends a message to screen readers via
 * an ARIA live region. The region is injected into `document.body` on mount
 * and removed on unmount.
 */
export declare function useAnnounce(): (message: string, priority?: AnnouncePriority) => void;
export {};
//# sourceMappingURL=ScreenReaderAnnounce.d.ts.map