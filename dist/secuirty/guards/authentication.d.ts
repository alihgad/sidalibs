import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CryptoHelper } from '../crypto.helper';
export declare class AuthGuard implements CanActivate {
    private readonly cryptoHelper;
    constructor(cryptoHelper: CryptoHelper);
    canActivate(context: ExecutionContext): Promise<any>;
}
//# sourceMappingURL=authentication.d.ts.map