export interface FloorGateResult {
    /** The floor whose challenges were all just completed. */
    completedFloorNumber: number;
    /** The floor that should now be unlocked (null if already at the last floor). */
    nextFloorUnlocked: number | null;
}
/**
 * Pure-logic service that decides whether completing a challenge triggers a
 * floor unlock.  Has no side-effects: callers are responsible for emitting
 * events and updating persistent state.
 */
export declare class FloorGateSystem {
    /**
     * Call this after a challenge is successfully completed.
     * Returns a FloorGateResult when the floor becomes complete, or null
     * when the floor still has unfinished challenges.
     */
    checkFloorCompletion(completedChallengeId: string, allCompletedChallenges: string[]): FloorGateResult | null;
    /**
     * Returns true when the player has unlocked the given floor.
     * Floor 0 is always unlocked; every other floor requires the previous
     * floor to be complete.
     */
    isFloorUnlocked(floorNumber: number, completedChallenges: string[]): boolean;
}
//# sourceMappingURL=FloorGateSystem.d.ts.map