// import { getUserModel } from '@libs/DB/models/userModels/users.model';
// import { Decrypt } from '@libs/secuirty/crypto.helper';
// import { verifyToken } from '@libs/secuirty/jwt';

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verifyToken } from '../Jwt';
import { getUserModel } from '../../DB/models/userModels/users.model';
import { CryptoHelper } from '../crypto.helper';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cryptoHelper: CryptoHelper,
  ) { }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest() || GqlExecutionContext.create(context).getContext().req;
    const token = request.headers.authorization;
    if (!token) {
      throw new Error('Forbidden resource');
    }
    try {
      const payload = await verifyToken(token, process.env.JWT_SECRET)

      let userModel = getUserModel(payload.businessNumber)
      const user = await userModel.findById(
        payload._id,
        'email jwtSecret firstName lastName userName role isOwner phone loginDevicesSession',
        { path: 'role' }
      );
      if (!user) {
        throw new ForbiddenException('Forbidden resource');
      }

      const decryptedJwtSecret = this.cryptoHelper.decrypt(user.jwtSecret)?.toString();
      if (decryptedJwtSecret !== payload.jwtSecret) {
        throw new ForbiddenException('Forbidden resource');
      }
      // Check if the lsid from payload exists in user's loginDevicesSession
      if (!user.loginDevicesSession || !user.loginDevicesSession.has(payload.lsid)) {
        throw new ForbiddenException('Forbidden resource');
      }
      request['user'] = user;
      request['lsid'] = payload.lsid
      request['businessNumber'] = payload.businessNumber;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ForbiddenException(error.message);
      }
      throw new ForbiddenException('An unknown error occurred');
    }

    return true;
  }
}