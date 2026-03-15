/**
 * Narrative content for the Venomous Snake text-based RPG.
 *
 * The player is an agent infiltrating Rattlesnake Corp, guided by
 * the AI companion CIPHER. Each floor teaches a Python programming
 * concept through "hacking" terminals.
 */
export interface RoomNarrative {
    name: string;
    firstVisit: string;
    revisit: string;
    description: string;
}
export interface NPCDialogTree {
    greeting: string;
    lines: string[];
    postChallenge?: string;
}
export interface FloorIntro {
    arrival: string;
    briefing: string;
    completion: string;
}
export declare const gameIntro: string[];
export declare const gameVictory: string[];
export declare const floorIntros: Record<string, FloorIntro>;
export declare const roomNarratives: Record<string, RoomNarrative>;
/** Look up the display name for a room. Falls back to the room id. */
export declare function getRoomDisplayName(roomId: string): string;
export declare const npcDialogs: Record<string, NPCDialogTree>;
//# sourceMappingURL=storyContent.d.ts.map