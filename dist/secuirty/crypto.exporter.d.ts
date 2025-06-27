import { CryptoHelper } from "./crypto.helper";
export declare class CryptoExporter {
    static cryptoHelper: CryptoHelper;
    constructor(cryptoHelper: CryptoHelper);
    static encrypt(plainText: string | undefined, secretKey: string | undefined): string | undefined;
    static decrypt(encryptedText: string | undefined, secretKey: string | undefined): string | undefined;
}
//# sourceMappingURL=crypto.exporter.d.ts.map