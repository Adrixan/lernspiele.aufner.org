import React from 'react';
export interface LocationHeaderProps {
    floorNumber: number;
    floorName: string;
    roomName: string;
    xp: number;
    level: number;
    completedChallenges: number;
    totalChallenges: number;
}
declare function LocationHeaderInner({ floorNumber, floorName, roomName, xp, level, completedChallenges, totalChallenges, }: LocationHeaderProps): React.JSX.Element;
export declare const LocationHeader: React.MemoExoticComponent<typeof LocationHeaderInner>;
export {};
//# sourceMappingURL=LocationHeader.d.ts.map