import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CryptoHelper } from '../crypto.helper';
import { ConfigService } from '@nestjs/config';
export declare class AuthGuard implements CanActivate {
    private readonly cryptoHelper;
    private readonly configService;
    constructor(cryptoHelper: CryptoHelper, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<any>;
}
//# sourceMappingURL=authentication.d.ts.map