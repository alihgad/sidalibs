import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import CryptoJS from 'crypto-js';

@Injectable()
export class CryptoHelper {
  constructor(
    private readonly configService: ConfigService,
  ) { }
  private get defaultSecretKey(): string {
    const secret = this.configService.get<string>('CRYPTO_SECRET');
    if (!secret) {
      throw new Error('CRYPTO_SECRET environment variable is not set');
    }
    return secret;
  }

  encrypt(plainText: string | undefined, secretKey: string = this.defaultSecretKey): string | undefined {
    if (!plainText) return undefined;
    const cipher = CryptoJS.AES.encrypt(plainText, secretKey);
    return cipher.toString();
  }

  decrypt(encryptedText: string | undefined, secretKey: string = this.defaultSecretKey): string | undefined {
    if (!encryptedText) return undefined;
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
