import React from 'react';
import './terminal.css';
export interface ChallengeSuccessOverlayProps {
    challengeTitle: string;
    xpEarned: number;
    onDismiss: () => void;
    /** Auto-dismiss delay in ms. Default 3000. */
    autoDismissMs?: number;
}
export declare function ChallengeSuccessOverlay({ challengeTitle, xpEarned, onDismiss, autoDismissMs, }: ChallengeSuccessOverlayProps): React.JSX.Element;
//# sourceMappingURL=ChallengeSuccessOverlay.d.ts.map