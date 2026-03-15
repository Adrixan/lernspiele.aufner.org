import { useState, useCallback, useRef } from 'react';
import { CipherAI } from '@venomous-snake/narrative';
export function useCipher() {
    // Stable CipherAI instance — never recreated
    const cipherRef = useRef(new CipherAI());
    const cipher = cipherRef.current;
    const [currentMessage, setCurrentMessage] = useState(null);
    const [currentMood, setCurrentMood] = useState('neutral');
    const [isVisible, setIsVisible] = useState(false);
    const queueRef = useRef([]);
    const displayEntry = useCallback((entry) => {
        setCurrentMessage(entry.message);
        setCurrentMood(entry.mood);
        setIsVisible(true);
    }, []);
    const enqueue = useCallback((message, mood) => {
        if (!isVisible) {
            displayEntry({ message, mood });
        }
        else {
            queueRef.current.push({ message, mood });
        }
    }, [isVisible, displayEntry]);
    const dismissDialog = useCallback(() => {
        const next = queueRef.current.shift();
        if (next !== undefined) {
            displayEntry(next);
        }
        else {
            setIsVisible(false);
            setCurrentMessage(null);
        }
    }, [displayEntry]);
    const showDialog = useCallback((context, data) => {
        const message = cipher.getLine(context, data);
        const mood = cipher.getMood();
        enqueue(message, mood);
    }, [cipher, enqueue]);
    const showHint = useCallback((hint) => {
        const message = cipher.wrapHint(hint);
        const mood = cipher.getMood();
        enqueue(message, mood);
    }, [cipher, enqueue]);
    const showErrorExplanation = useCallback((errorType, errorMessage) => {
        const message = cipher.explainError(errorType, errorMessage);
        const mood = cipher.getMood();
        enqueue(message, mood);
    }, [cipher, enqueue]);
    return {
        cipher,
        showDialog,
        showHint,
        showErrorExplanation,
        dismissDialog,
        currentMessage,
        currentMood,
        isVisible,
    };
}
//# sourceMappingURL=useCipher.js.map