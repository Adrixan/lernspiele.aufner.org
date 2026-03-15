import React from 'react';
export interface NewGameFlowProps {
    onStart: (name: string, gender: 'male' | 'female' | 'nonbinary') => void;
    onBack: () => void;
}
export declare function NewGameFlow({ onStart, onBack }: NewGameFlowProps): React.JSX.Element;
//# sourceMappingURL=NewGameFlow.d.ts.map