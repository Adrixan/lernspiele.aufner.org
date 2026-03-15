import type { DialogNode, DialogChoice, ChoiceWithState } from '@venomous-snake/narrative';
export interface UseDialogOptions {
    /**
     * The player's current inventory (item IDs). Passed to the dialog engine so
     * it can gate choices that require specific items.
     */
    inventory?: string[];
    /**
     * Called whenever the dialog engine sets a flag whose ID starts with
     * `raise_alert_`. Use this to increment the game-level alert state.
     */
    onAlertRaised?: () => void;
}
export interface UseDialogReturn {
    isOpen: boolean;
    currentNode: DialogNode | null;
    availableChoices: DialogChoice[];
    /**
     * All choices for the current node that pass narrative conditions, annotated
     * with availability. Inventory-locked choices are included but marked
     * `available: false` so the UI can render them grayed-out with a tooltip.
     */
    displayChoices: ChoiceWithState[];
    /** Advance to the next linear node (no-op when choices are present). */
    advance: () => void;
    /** Select an available choice by its index in `availableChoices`. */
    selectChoice: (index: number) => void;
}
/**
 * Manages NPC dialog state driven by the EventBus `DIALOG_START` event.
 *
 * Usage: mount once at the app root; DialogOverlay consumes its return value.
 *
 * @param options.inventory  Current player inventory (item IDs). When provided,
 *   the engine filters choices that require items not in the inventory, showing
 *   them as locked in the UI instead.
 * @param options.onAlertRaised  Called whenever a `raise_alert_*` flag is set
 *   during dialog, so the caller can increment the game-level alert counter.
 */
export declare function useDialog(options?: UseDialogOptions): UseDialogReturn;
//# sourceMappingURL=useDialog.d.ts.map