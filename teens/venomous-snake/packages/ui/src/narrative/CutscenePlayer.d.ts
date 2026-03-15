import React from 'react';
import type { Cutscene } from '@venomous-snake/narrative';
export interface CutscenePlayerProps {
    cutscene: Cutscene;
    onComplete: () => void;
}
export declare function CutscenePlayer({ cutscene, onComplete }: CutscenePlayerProps): React.JSX.Element;
//# sourceMappingURL=CutscenePlayer.d.ts.map