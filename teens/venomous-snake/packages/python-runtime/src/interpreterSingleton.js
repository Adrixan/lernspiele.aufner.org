import { PyodideInterpreter } from './PyodideInterpreter';
import { MockInterpreter } from './MockInterpreter';
/**
 * Stable wrapper that delegates to the current interpreter implementation.
 * When the underlying implementation changes (e.g., Pyodide fails → MockInterpreter),
 * all existing references continue to work via delegation.
 */
class InterpreterDelegate {
    impl;
    outputCallbacks = new Set();
    inputCallbacks = new Set();
    implUnsubOutput = null;
    implUnsubInput = null;
    constructor(initial) {
        this.impl = initial;
        this.bindImpl();
    }
    /** Switch the underlying interpreter (re-binds callbacks). */
    setImpl(newImpl) {
        this.unbindImpl();
        this.impl = newImpl;
        this.bindImpl();
    }
    bindImpl() {
        this.implUnsubOutput = this.impl.onOutput((out) => {
            this.outputCallbacks.forEach((cb) => cb(out));
        });
        this.implUnsubInput = this.impl.onInputRequest((prompt) => {
            this.inputCallbacks.forEach((cb) => cb(prompt));
        });
    }
    unbindImpl() {
        this.implUnsubOutput?.();
        this.implUnsubInput?.();
    }
    async initialize() {
        return this.impl.initialize();
    }
    isReady() {
        return this.impl.isReady();
    }
    async execute(code) {
        return this.impl.execute(code);
    }
    provideInput(value) {
        this.impl.provideInput(value);
    }
    onOutput(callback) {
        this.outputCallbacks.add(callback);
        return () => { this.outputCallbacks.delete(callback); };
    }
    onInputRequest(callback) {
        this.inputCallbacks.add(callback);
        return () => { this.inputCallbacks.delete(callback); };
    }
    async terminate() {
        this.unbindImpl();
        return this.impl.terminate();
    }
    getVersion() {
        return this.impl.getVersion();
    }
}
let delegate = null;
let initPromise = null;
/**
 * Returns the shared interpreter instance (stable reference).
 * The underlying implementation may change after initialization
 * (e.g., fallback to MockInterpreter), but the reference stays the same.
 */
export function getSharedInterpreter() {
    if (delegate === null) {
        delegate = new InterpreterDelegate(new PyodideInterpreter());
    }
    return delegate;
}
/**
 * Initializes the shared interpreter (loads Pyodide WASM).
 * Safe to call multiple times — returns the same promise.
 * Falls back to MockInterpreter if Pyodide fails to load.
 */
export function initializeSharedInterpreter() {
    if (initPromise !== null)
        return initPromise;
    const interp = getSharedInterpreter();
    if (interp.isReady()) {
        initPromise = Promise.resolve();
        return initPromise;
    }
    initPromise = interp.initialize().catch((err) => {
        console.warn('Pyodide failed to load, falling back to MockInterpreter:', err);
        const fallback = new MockInterpreter();
        // Safe: delegate rebinds callbacks to the new implementation
        delegate.setImpl(fallback);
        return fallback.initialize();
    });
    return initPromise;
}
//# sourceMappingURL=interpreterSingleton.js.map