import React from 'react';
export interface FloorProgressBarProps {
    /** Current floor ID string from the store (e.g. 'lobby', 'floor_3'). */
    floorId: string;
    /** Array of completed challenge IDs from the store. */
    completedChallenges: string[];
    /** Whether to suppress animations (accessibility / reduced motion). */
    reducedMotion?: boolean;
}
/**
 * HUD component showing the current floor name and challenge completion progress.
 * Glows green when the floor is fully complete.
 */
export declare function FloorProgressBar({ floorId, completedChallenges, reducedMotion, }: FloorProgressBarProps): React.JSX.Element;
//# sourceMappingURL=FloorProgressBar.d.ts.map