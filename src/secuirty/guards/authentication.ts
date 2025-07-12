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
import { getTenantModel } from '../../DB/models/TenantModels/tenant.model';
import { PlanType } from '../../common/type';
import { config } from 'dotenv';
config();

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
      const tenant = await getTenantModel().findOne({ businessNumber: payload.businessNumber })
      if (!tenant) {
        throw new Error('Forbidden resource');
      }
      if(tenant.plan === PlanType.FREE){

        // التحقق من المدة التجريبية (15 يوم)
        const currentDate = new Date();
        const tenantCreatedDate = new Date((tenant as any).createdAt || (tenant as any)._id.getTimestamp());
        const daysDifference = Math.floor((currentDate.getTime() - tenantCreatedDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDifference > 15) {
          throw new ForbiddenException("Trial period expired. Your 15-day trial period has ended. Please subscribe to continue using the service.")
        }

      }

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

      console.log(payload)

      
      request['user'] = user;
      request['lsid'] = payload.lsid
      request['businessNumber'] = payload.businessNumber;
      console.log( request['businessNumber'])
      

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ForbiddenException(error.message , error.stack);
      }
      throw new ForbiddenException('An unknown error occurred');
    }

    return true;
  }
}