import type { SaveSlot, SaveData } from './types';
export declare const MAX_SAVE_SLOTS = 20;
export declare const MAX_AUTOSAVE_SLOTS = 3;
declare class SaveManager {
    private dbPromise;
    private openDB;
    getSaveSlots(): Promise<SaveSlot[]>;
    getSaveSlot(id: string): Promise<SaveSlot | undefined>;
    saveSaveSlot(slot: SaveSlot): Promise<void>;
    deleteSaveSlot(id: string): Promise<void>;
    renameSaveSlot(id: string, name: string): Promise<void>;
    exportSaveSlot(id: string): Promise<void>;
    exportAllSaves(): Promise<void>;
    importAllSaves(file: File): Promise<number>;
    importSaveSlot(file: File): Promise<SaveSlot>;
    createAutoSave(data: SaveData): Promise<void>;
}
export declare const saveManager: SaveManager;
export {};
//# sourceMappingURL=SaveManager.d.ts.map