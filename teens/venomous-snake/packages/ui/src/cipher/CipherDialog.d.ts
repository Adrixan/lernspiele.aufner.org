import React from 'react';
import type { CipherMood } from '@venomous-snake/narrative';
interface CipherDialogProps {
    message: string;
    mood: CipherMood;
    /** Auto-dismiss delay in milliseconds. Default 8000. Set to 0 to disable. */
    autoDismissMs?: number;
    onDismiss: () => void;
}
export declare function CipherDialog({ message, mood, autoDismissMs, onDismiss, }: CipherDialogProps): React.JSX.Element;
export {};
//# sourceMappingURL=CipherDialog.d.ts.map