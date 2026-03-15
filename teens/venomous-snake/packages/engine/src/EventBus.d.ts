import type { GameEvent } from '@venomous-snake/shared-types';
type EventHandler = (event: GameEvent) => void;
declare class GameEventBus {
    private handlers;
    emit(event: GameEvent): void;
    on(handler: EventHandler): () => void;
    off(handler: EventHandler): void;
    removeAll(): void;
}
export declare const EventBus: GameEventBus;
export {};
//# sourceMappingURL=EventBus.d.ts.map