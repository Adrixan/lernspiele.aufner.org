class GameEventBus {
    handlers = new Set();
    emit(event) {
        for (const handler of this.handlers) {
            handler(event);
        }
    }
    on(handler) {
        this.handlers.add(handler);
        return () => {
            this.handlers.delete(handler);
        };
    }
    off(handler) {
        this.handlers.delete(handler);
    }
    removeAll() {
        this.handlers.clear();
    }
}
export const EventBus = new GameEventBus();
//# sourceMappingURL=EventBus.js.map