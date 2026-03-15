export class DialogEngine {
    state;
    dialogs = new Map();
    handlers = new Set();
    inventory = [];
    constructor(initialState) {
        this.state = initialState ?? {
            flags: {},
            completedDialogs: [],
            playerName: 'Agent',
            playerGender: 'nonbinary',
        };
    }
    registerDialog(dialog) {
        this.dialogs.set(dialog.id, dialog);
    }
    startDialog(dialogId) {
        const dialog = this.dialogs.get(dialogId);
        if (!dialog)
            throw new Error(`Dialog not found: ${dialogId}`);
        this.state.currentDialog = dialogId;
        this.state.currentNode = dialog.startNodeId;
        const node = this.getCurrentNode();
        if (!node)
            throw new Error(`Start node not found: ${dialog.startNodeId}`);
        if (node.setsFlag) {
            this.setFlag(node.setsFlag, true);
        }
        this.emitEvent({ type: 'node_display', node });
        if (node.choices) {
            const available = this.getAvailableChoices(node.choices);
            this.emitEvent({ type: 'choices_available', choices: available });
        }
    }
    selectChoice(choiceIndex) {
        const node = this.getCurrentNode();
        if (!node?.choices)
            throw new Error('No choices available');
        const available = this.getAvailableChoices(node.choices);
        const choice = available[choiceIndex];
        if (!choice)
            throw new Error(`Invalid choice index: ${choiceIndex}`);
        if (choice.setsFlag) {
            this.setFlag(choice.setsFlag, true);
        }
        this.state.currentNode = choice.nextNodeId;
        this.advance();
    }
    advance() {
        const node = this.getCurrentNode();
        if (!node) {
            this.completeDialog();
            return;
        }
        if (node.setsFlag) {
            this.setFlag(node.setsFlag, true);
        }
        this.emitEvent({ type: 'node_display', node });
        if (node.choices) {
            const available = this.getAvailableChoices(node.choices);
            this.emitEvent({ type: 'choices_available', choices: available });
        }
        // Terminal nodes (no choices, no nextNodeId) are displayed and wait for
        // the player to explicitly advance via advanceToNext(), which handles completion.
    }
    /**
     * Advance from the current node to its `nextNodeId`.
     * If the current node has no `nextNodeId` (and no choices), the dialog completes.
     * Call this when the player clicks "continue" on a non-choice node.
     */
    advanceToNext() {
        const node = this.getCurrentNode();
        if (!node) {
            this.completeDialog();
            return;
        }
        if (node.nextNodeId) {
            this.state.currentNode = node.nextNodeId;
            this.advance();
        }
        else if (!node.choices || node.choices.length === 0) {
            this.completeDialog();
        }
        // If the node has choices, the caller must use selectChoice() instead.
    }
    setPlayerIdentity(name, gender) {
        this.state.playerName = name;
        this.state.playerGender = gender;
    }
    getState() {
        return { ...this.state };
    }
    getFlag(flagId) {
        return this.state.flags[flagId];
    }
    setFlag(flagId, value) {
        const flag = {
            id: flagId,
            value,
            setAt: new Date().toISOString(),
        };
        this.state.flags[flagId] = flag;
        this.emitEvent({ type: 'flag_set', flagId, value: flag });
    }
    checkCondition(condition) {
        const flag = this.state.flags[condition];
        if (!flag)
            return false;
        return Boolean(flag.value);
    }
    /** Update the player's inventory snapshot used for `requiresItem` choice gating. */
    setInventory(items) {
        this.inventory = items;
    }
    /** Returns true if `itemId` is currently in the player's inventory. */
    checkInventory(itemId) {
        return this.inventory.includes(itemId);
    }
    /**
     * Returns all choices for the current node, each annotated with whether the
     * player can select it (condition passes AND inventory requirement met).
     */
    getDisplayChoices() {
        const node = this.getCurrentNode();
        if (!node?.choices)
            return [];
        return node.choices
            .filter((c) => !c.condition || this.checkCondition(c.condition))
            .map((c) => {
            const itemLocked = c.requiresItem !== undefined && !this.checkInventory(c.requiresItem);
            return {
                choice: c,
                available: !itemLocked,
                ...(itemLocked && c.requiresItem !== undefined
                    ? { lockReason: `inventory:${c.requiresItem}` }
                    : {}),
            };
        });
    }
    onEvent(handler) {
        this.handlers.add(handler);
        return () => {
            this.handlers.delete(handler);
        };
    }
    getCurrentNode() {
        if (!this.state.currentDialog || !this.state.currentNode)
            return null;
        const dialog = this.dialogs.get(this.state.currentDialog);
        if (!dialog)
            return null;
        return dialog.nodes[this.state.currentNode] ?? null;
    }
    emitEvent(event) {
        for (const handler of this.handlers) {
            handler(event);
        }
    }
    getAvailableChoices(choices) {
        return choices.filter((c) => (!c.condition || this.checkCondition(c.condition)) &&
            (!c.requiresItem || this.checkInventory(c.requiresItem)));
    }
    completeDialog() {
        const dialogId = this.state.currentDialog;
        if (dialogId && !this.state.completedDialogs.includes(dialogId)) {
            this.state.completedDialogs.push(dialogId);
        }
        delete this.state.currentDialog;
        delete this.state.currentNode;
        if (dialogId) {
            this.emitEvent({ type: 'dialog_complete', dialogId });
        }
    }
}
//# sourceMappingURL=DialogEngine.js.map