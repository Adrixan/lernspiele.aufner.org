import type { Room } from '@venomous-snake/shared-types';
export declare class GameWorld {
    private rooms;
    registerRoom(room: Room): void;
    getRoom(id: string): Room | undefined;
    getAllRooms(): Room[];
    getRoomsForFloor(floor: number): Room[];
    getStartingRoomId(): string;
}
//# sourceMappingURL=world.d.ts.map