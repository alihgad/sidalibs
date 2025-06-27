import { ConfigService } from '@nestjs/config';
export declare class CryptoHelper {
    private readonly configService;
    constructor(configService: ConfigService);
    private get defaultSecretKey();
    encrypt(plainText: string | undefined, secretKey?: string): string | undefined;
    decrypt(encryptedText: string | undefined, secretKey?: string): string | undefined;
}
//# sourceMappingURL=crypto.helper.d.ts.map