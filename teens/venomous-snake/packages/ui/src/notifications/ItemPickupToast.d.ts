import React from 'react';
export interface ItemPickupNotification {
    id: string;
    itemId: string;
    name: string;
    description: string;
    itemType: string;
    /** Whether this is the first time the player has picked up this item. */
    isFirstPickup: boolean;
}
export interface ItemPickupToastProps {
    notifications: ItemPickupNotification[];
    onDismiss: (id: string) => void;
}
export declare function ItemPickupToast({ notifications, onDismiss, }: ItemPickupToastProps): React.JSX.Element;
//# sourceMappingURL=ItemPickupToast.d.ts.map