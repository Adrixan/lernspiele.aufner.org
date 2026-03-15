export class GameWorld {
    rooms = new Map();
    registerRoom(room) {
        this.rooms.set(room.id, room);
    }
    getRoom(id) {
        return this.rooms.get(id);
    }
    getAllRooms() {
        return Array.from(this.rooms.values());
    }
    getRoomsForFloor(floor) {
        return this.getAllRooms().filter((r) => r.floor === floor);
    }
    getStartingRoomId() {
        return 'lobby_entrance';
    }
}
//# sourceMappingURL=world.js.map