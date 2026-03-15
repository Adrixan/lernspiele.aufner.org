import React from 'react';
import type { Achievement } from '@venomous-snake/challenge-engine';
export interface ToastNotification {
    id: string;
    achievement: Achievement;
}
export interface AchievementToastProps {
    notifications: ToastNotification[];
    onDismiss: (id: string) => void;
}
export declare function AchievementToast({ notifications, onDismiss, }: AchievementToastProps): React.JSX.Element;
//# sourceMappingURL=AchievementToast.d.ts.map