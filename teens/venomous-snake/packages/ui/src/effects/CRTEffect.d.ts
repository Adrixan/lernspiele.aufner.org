import React from 'react';
export interface CRTEffectProps {
    /** Children to wrap with the CRT overlay */
    children: React.ReactNode;
    /** Whether the CRT effect is active. Default: true */
    enabled?: boolean;
    /** Whether to show the subtle VHS tracking noise. Default: false */
    trackingNoise?: boolean;
}
/**
 * CSS-only CRT monitor overlay — performance-friendly, GPU-accelerated.
 * Wraps game content with subtle scanlines, screen curvature, and optional
 * VHS tracking noise for a cyberpunk noir atmosphere.
 *
 * All effects are disabled when `enabled` is false, e.g. for accessibility.
 */
export declare function CRTEffect({ children, enabled, trackingNoise, }: CRTEffectProps): React.JSX.Element;
//# sourceMappingURL=CRTEffect.d.ts.map