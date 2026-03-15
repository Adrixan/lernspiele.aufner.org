/** Floor-to-challenge mapping and progression helpers. */
export interface FloorConfig {
    floorNumber: number;
    name: string;
    subtitle: string;
    chapterIds: string[];
    challengeIds: string[];
    requiredCompletions: number;
}
export declare const floorConfigs: FloorConfig[];
/** Returns the FloorConfig for the given floor number, or undefined if not found. */
export declare function getFloorConfig(floorNumber: number): FloorConfig | undefined;
/** Returns the list of challenge IDs required on the given floor. */
export declare function getChallengesForFloor(floorNumber: number): string[];
/** Returns true when all required challenges on the floor are completed. */
export declare function isFloorComplete(floorNumber: number, completedChallenges: string[]): boolean;
/**
 * Returns the highest consecutive floor number that is unlocked given the
 * provided set of completed challenges. Floor 0 (Lobby) is always unlocked.
 */
export declare function getNextUnlockedFloor(completedChallenges: string[]): number;
/** Returns completion statistics for a floor given completed challenges. */
export declare function getFloorProgress(floorNumber: number, completedChallenges: string[]): {
    completed: number;
    total: number;
    percentage: number;
};
/** Converts a floor ID string (e.g. 'lobby', 'floor_3') to a floor number. */
export declare function getFloorNumberFromId(floorId: string): number;
/** Converts a floor number to a floor ID string (e.g. 0 → 'lobby', 3 → 'floor_3'). */
export declare function getFloorIdFromNumber(floorNumber: number): string;
//# sourceMappingURL=FloorChallengeMap.d.ts.map