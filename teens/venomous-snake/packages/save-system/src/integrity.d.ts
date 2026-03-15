/**
 * Sign arbitrary JSON data and return the hex-encoded HMAC-SHA256 signature.
 */
export declare function computeSignature(data: string): Promise<string>;
/**
 * Verify a hex-encoded HMAC-SHA256 signature against the provided data string.
 */
export declare function verifySignature(data: string, signatureHex: string): Promise<boolean>;
//# sourceMappingURL=integrity.d.ts.map