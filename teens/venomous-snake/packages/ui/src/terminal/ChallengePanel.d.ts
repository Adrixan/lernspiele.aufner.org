import React from 'react';
import type { Challenge } from '@venomous-snake/shared-types';
import type { TestResult } from '@venomous-snake/challenge-engine';
export interface ChallengePanelProps {
    challenge: Challenge;
    testResults?: TestResult[];
    attempts: number;
    hintsUsed: number;
    isOpen: boolean;
    onSubmit: () => void;
    onGetHint: () => void;
    onClose: () => void;
}
export declare function ChallengePanel({ challenge, testResults, attempts, hintsUsed, isOpen, onSubmit, onGetHint, onClose, }: ChallengePanelProps): React.JSX.Element;
//# sourceMappingURL=ChallengePanel.d.ts.map