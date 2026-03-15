import type { Room, RoomConnection, GameAction, NarrativeEntry, TextAdventureState } from '@venomous-snake/shared-types';
export declare class TextAdventureEngine {
    private world;
    private state;
    private completedChallenges;
    constructor(savedState?: TextAdventureState);
    enterRoom(roomId: string): void;
    getAvailableActions(completedChallenges: string[]): GameAction[];
    executeAction(action: GameAction, completedChallenges: string[]): void;
    /** Seed internal challenge tracking from external state (e.g. store or save). */
    syncCompletedChallenges(challenges: string[]): void;
    /**
     * Mark a challenge as complete. Provides room-level progress feedback,
     * checks floor-level completion, and auto-triggers NPC dialog as
     * appropriate for the story progression.
     */
    completeChallenge(challengeId: string): void;
    getCompletedChallenges(): string[];
    getCurrentRoom(): Room | undefined;
    getState(): TextAdventureState;
    isConnectionUnlocked(connection: RoomConnection, completedChallenges: string[]): boolean;
    getNarrativeLog(): NarrativeEntry[];
    isGameComplete(): boolean;
    /** Get all challenge IDs for a given floor number */
    getFloorChallengeIds(floor: number): string[];
    /** Get the game intro text lines */
    static getGameIntro(): string[];
    /** Get the game victory text lines */
    static getGameVictory(): string[];
    private addNarrative;
}
//# sourceMappingURL=TextAdventureEngine.d.ts.map