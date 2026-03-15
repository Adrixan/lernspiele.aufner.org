import React from 'react';
import type { TutorialStep } from '@venomous-snake/narrative';
export interface TutorialOverlayProps {
    step: TutorialStep;
    onComplete: () => void;
    onSkip: () => void;
}
export declare function TutorialOverlay({ step, onComplete, onSkip, }: TutorialOverlayProps): React.JSX.Element;
//# sourceMappingURL=TutorialOverlay.d.ts.map