import type { PythonInterpreter } from './types';
/**
 * Returns the shared interpreter instance (stable reference).
 * The underlying implementation may change after initialization
 * (e.g., fallback to MockInterpreter), but the reference stays the same.
 */
export declare function getSharedInterpreter(): PythonInterpreter;
/**
 * Initializes the shared interpreter (loads Pyodide WASM).
 * Safe to call multiple times — returns the same promise.
 * Falls back to MockInterpreter if Pyodide fails to load.
 */
export declare function initializeSharedInterpreter(): Promise<void>;
//# sourceMappingURL=interpreterSingleton.d.ts.map