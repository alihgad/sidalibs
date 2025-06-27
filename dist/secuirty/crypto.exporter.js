"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoExporter = void 0;
class CryptoExporter {
    constructor(cryptoHelper) {
        CryptoExporter.cryptoHelper = cryptoHelper;
    }
    static encrypt(plainText, secretKey) {
        if (!plainText)
            return undefined;
        if (!secretKey) {
            throw new Error('CRYPTO_SECRET environment variable is not set');
        }
        return CryptoExporter.cryptoHelper.encrypt(plainText, secretKey);
    }
    static decrypt(encryptedText, secretKey) {
        if (!encryptedText)
            return undefined;
        if (!secretKey) {
            throw new Error('CRYPTO_SECRET environment variable is not set');
        }
        return CryptoExporter.cryptoHelper.decrypt(encryptedText, secretKey);
    }
}
exports.CryptoExporter = CryptoExporter;
