import React from 'react';
export interface FloorAnnouncementOverlayProps {
    floorNumber: number;
    floorName: string;
    subtitle: string;
    isVisible: boolean;
    /** Called after the auto-dismiss animation completes. */
    onDismiss: () => void;
}
/**
 * Full-screen cyberpunk announcement shown when the player enters a new floor.
 * Auto-dismisses after DISPLAY_DURATION_MS milliseconds.
 */
export declare function FloorAnnouncementOverlay({ floorNumber, floorName, subtitle, isVisible, onDismiss, }: FloorAnnouncementOverlayProps): React.JSX.Element | null;
//# sourceMappingURL=FloorAnnouncementOverlay.d.ts.map