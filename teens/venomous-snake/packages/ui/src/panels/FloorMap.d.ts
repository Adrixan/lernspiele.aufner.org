import React from 'react';
export interface FloorMapProps {
    isOpen: boolean;
    onClose: () => void;
    currentFloor: string;
    unlockedFloors: string[];
    onFloorSelect: (floorId: string) => void;
}
export declare function FloorMap({ isOpen, onClose, currentFloor, unlockedFloors, onFloorSelect, }: FloorMapProps): React.JSX.Element;
//# sourceMappingURL=FloorMap.d.ts.map