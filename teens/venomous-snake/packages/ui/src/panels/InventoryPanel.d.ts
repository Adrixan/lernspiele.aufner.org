import React from 'react';
import type { InventoryItem } from '@venomous-snake/save-system';
export interface InventoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
    items: InventoryItem[];
}
export declare function InventoryPanel({ isOpen, onClose, items }: InventoryPanelProps): React.JSX.Element;
//# sourceMappingURL=InventoryPanel.d.ts.map