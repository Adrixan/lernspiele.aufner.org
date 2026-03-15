export type SkillCategory = 'fundamentals' | 'control_flow' | 'functions' | 'data_structures' | 'oop' | 'advanced';
export interface SkillNode {
    id: string;
    nameKey: string;
    descriptionKey: string;
    category: SkillCategory;
    icon: string;
    prerequisites: string[];
    requiredChallenges: string[];
    xpCost: number;
    unlockEffect?: string;
}
export declare const SKILL_TREE: SkillNode[];
export declare class SkillTreeManager {
    private unlocked;
    constructor(unlockedSkills?: string[]);
    isUnlocked(skillId: string): boolean;
    canUnlock(skillId: string, completedChallenges: string[], xp: number): boolean;
    unlock(skillId: string): void;
    getUnlockedSkills(): string[];
    getAvailableSkills(completedChallenges: string[], xp: number): SkillNode[];
    toJSON(): string[];
}
//# sourceMappingURL=SkillTree.d.ts.map