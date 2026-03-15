import React from 'react';
export interface CodeKeyboardProps {
    onInput: (text: string) => void;
    onBackspace: () => void;
    visible?: boolean;
    keyboardLayout?: 'qwerty' | 'qwertz';
}
/**
 * Full custom on-screen coding keyboard for Android.
 * Bypasses the system IME by using pointer events only.
 *
 * Features:
 * - Always-visible number row and scrollable Python symbol bar
 * - Shift key with single-tap (one-shot) and double-tap (caps lock)
 * - QWERTY / QWERTZ layout support
 */
export declare function CodeKeyboard({ onInput, onBackspace, visible, keyboardLayout, }: CodeKeyboardProps): React.JSX.Element | null;
//# sourceMappingURL=CodeKeyboard.d.ts.map