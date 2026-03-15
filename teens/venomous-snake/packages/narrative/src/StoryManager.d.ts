import { DialogEngine } from './DialogEngine';
import type { NarrativeState } from './types';
interface Pronouns {
    subject: string;
    object: string;
    possessive: string;
    reflexive: string;
}
export declare class StoryManager {
    private dialogEngine;
    constructor(dialogEngine: DialogEngine);
    setPlayerIdentity(name: string, gender: 'male' | 'female' | 'nonbinary'): void;
    getPronouns(): Pronouns;
    getAISidekickMessage(category: 'encouragement' | 'idle' | 'greeting'): string;
    isChapterAccessible(chapter: number): boolean;
    getStoryState(): NarrativeState;
    toJSON(): NarrativeState;
}
export {};
//# sourceMappingURL=StoryManager.d.ts.map