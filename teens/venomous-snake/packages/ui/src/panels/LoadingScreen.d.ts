import React from 'react';
export interface LoadingScreenProps {
    /** Progress 0–1. When undefined the bar animates indeterminately. */
    progress?: number;
    /** Status label shown below the bar. */
    statusText?: string;
}
/**
 * Cyberpunk loading screen with animated circuit pattern, neon progress bar,
 * and CIPHER ASCII logo. Used for initial game load, floor transitions, and
 * Pyodide initialisation.
 */
export declare function LoadingScreen({ progress, statusText, }: LoadingScreenProps): React.JSX.Element;
//# sourceMappingURL=LoadingScreen.d.ts.map