import React from 'react';
import type { CurriculumProgress, Chapter } from '@venomous-snake/shared-types';
export interface QuestLogProps {
    isOpen: boolean;
    onClose: () => void;
    curriculumProgress: CurriculumProgress;
    chapters: Chapter[];
    currentFloor: string;
}
export declare function QuestLog({ isOpen, onClose, curriculumProgress, chapters, currentFloor, }: QuestLogProps): React.JSX.Element;
//# sourceMappingURL=QuestLog.d.ts.map