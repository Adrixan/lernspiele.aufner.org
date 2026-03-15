import type { DialogTree, DialogNode, DialogChoice, ChoiceWithState, NarrativeState, NarrativeFlag } from './types';
export type DialogEventHandler = (event: DialogEvent) => void;
export type DialogEvent = {
    type: 'node_display';
    node: DialogNode;
} | {
    type: 'choices_available';
    choices: DialogChoice[];
} | {
    type: 'dialog_complete';
    dialogId: string;
} | {
    type: 'flag_set';
    flagId: string;
    value: NarrativeFlag;
};
export declare class DialogEngine {
    private state;
    private dialogs;
    private handlers;
    private inventory;
    constructor(initialState?: NarrativeState);
    registerDialog(dialog: DialogTree): void;
    startDialog(dialogId: string): void;
    selectChoice(choiceIndex: number): void;
    advance(): void;
    /**
     * Advance from the current node to its `nextNodeId`.
     * If the current node has no `nextNodeId` (and no choices), the dialog completes.
     * Call this when the player clicks "continue" on a non-choice node.
     */
    advanceToNext(): void;
    setPlayerIdentity(name: string, gender: 'male' | 'female' | 'nonbinary'): void;
    getState(): NarrativeState;
    getFlag(flagId: string): NarrativeFlag | undefined;
    setFlag(flagId: string, value: boolean | string | number): void;
    checkCondition(condition: string): boolean;
    /** Update the player's inventory snapshot used for `requiresItem` choice gating. */
    setInventory(items: string[]): void;
    /** Returns true if `itemId` is currently in the player's inventory. */
    private checkInventory;
    /**
     * Returns all choices for the current node, each annotated with whether the
     * player can select it (condition passes AND inventory requirement met).
     */
    getDisplayChoices(): ChoiceWithState[];
    onEvent(handler: DialogEventHandler): () => void;
    private getCurrentNode;
    private emitEvent;
    private getAvailableChoices;
    private completeDialog;
}
//# sourceMappingURL=DialogEngine.d.ts.map