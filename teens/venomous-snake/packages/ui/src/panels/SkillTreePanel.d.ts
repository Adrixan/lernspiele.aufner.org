import React from 'react';
export interface SkillTreePanelProps {
    isOpen: boolean;
    onClose: () => void;
    unlockedSkills: string[];
    availableSkills: string[];
    xp: number;
    onUnlock: (skillId: string) => void;
}
export declare function SkillTreePanel({ isOpen, onClose, unlockedSkills, availableSkills, xp, onUnlock, }: SkillTreePanelProps): React.JSX.Element;
//# sourceMappingURL=SkillTreePanel.d.ts.map