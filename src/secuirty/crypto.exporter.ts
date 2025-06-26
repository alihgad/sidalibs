import { CryptoHelper } from "./crypto.helper";

export class CryptoExporter {
    static cryptoHelper: CryptoHelper;
    constructor(
        cryptoHelper: CryptoHelper
    ) {
        CryptoExporter.cryptoHelper = cryptoHelper;
    }

    static encrypt(plainText: string | undefined, secretKey: string | undefined): string | undefined {
        if (!plainText) return undefined;
        if (!secretKey) {
            throw new Error('CRYPTO_SECRET environment variable is not set');
        }
        return CryptoExporter.cryptoHelper.encrypt(plainText, secretKey);
    }

    static decrypt(encryptedText: string | undefined, secretKey: string | undefined): string | undefined {
        if (!encryptedText) return undefined;
        if (!secretKey) {
            throw new Error('CRYPTO_SECRET environment variable is not set');
        }
        return CryptoExporter.cryptoHelper.decrypt(encryptedText, secretKey);
    }
}