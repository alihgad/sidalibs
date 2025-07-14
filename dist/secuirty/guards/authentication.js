"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
// Try to load environment variables from the correct path
try {
    require('dotenv').config({ path: '../../../.env' });
}
catch (error) {
    console.log('Failed to load .env file:', error?.message || 'Unknown error');
}
// import { getUserModel } from '@libs/DB/models/userModels/users.model';
// import { Decrypt } from '@libs/secuirty/crypto.helper';
// import { verifyToken } from '@libs/secuirty/jwt';
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const Jwt_1 = require("../Jwt");
const users_model_1 = require("../../DB/models/userModels/users.model");
const crypto_helper_1 = require("../crypto.helper");
const tenant_model_1 = require("../../DB/models/TenantModels/tenant.model");
const type_1 = require("../../common/type");
const config_1 = require("@nestjs/config");
let AuthGuard = class AuthGuard {
    constructor(cryptoHelper, configService) {
        this.cryptoHelper = cryptoHelper;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest() || graphql_1.GqlExecutionContext.create(context).getContext().req;
        const token = request.headers.authorization;
        if (!token) {
            throw new Error('Forbidden resource T');
        }
        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new common_1.ForbiddenException('JWT_SECRET not configured');
            }
            console.log('Using JWT_SECRET:', jwtSecret ? 'EXISTS' : 'NOT FOUND');
            const payload = await (0, Jwt_1.verifyToken)(token, jwtSecret);
            console.log(payload.businessNumber);
            const tenantRepo = (0, tenant_model_1.getTenantModel)();
            const tenant = await tenantRepo.findOne({ businessNumber: payload.businessNumber });
            console.log(tenant);
            console.log(await tenantRepo.find({}));
            console.log(tenant);
            if (!tenant) {
                throw new Error('Forbidden resource TT');
            }
            if (tenant.plan === type_1.PlanType.FREE) {
                // التحقق من المدة التجريبية (15 يوم)
                const currentDate = new Date();
                const tenantCreatedDate = new Date(tenant.createdAt || tenant._id.getTimestamp());
                const daysDifference = Math.floor((currentDate.getTime() - tenantCreatedDate.getTime()) / (1000 * 60 * 60 * 24));
                if (daysDifference > 15) {
                    throw new common_1.ForbiddenException("Trial period expired. Your 15-day trial period has ended. Please subscribe to continue using the service.");
                }
            }
            if (payload._id) {
                let userModel = (0, users_model_1.getUserModel)(payload.businessNumber);
                const user = await userModel.findById(payload._id, 'email jwtSecret firstName lastName userName role isOwner phone loginDevicesSession', { path: 'role' });
                if (!user) {
                    throw new common_1.ForbiddenException('Forbidden resource 1 ');
                }
                const decryptedJwtSecret = this.cryptoHelper.decrypt(user.jwtSecret)?.toString();
                if (decryptedJwtSecret !== payload.jwtSecret) {
                    throw new common_1.ForbiddenException('Forbidden resource 2 ');
                }
                // Check if the lsid from payload exists in user's loginDevicesSession
                if (!user.loginDevicesSession || !user.loginDevicesSession.has(payload.lsid)) {
                    throw new common_1.ForbiddenException('Forbidden resource 3 ');
                }
                request['user'] = user;
            }
            if (payload.lsid) {
                request['lsid'] = payload.lsid;
            }
            if (payload.businessNumber) {
                request['businessNumber'] = payload.businessNumber;
            }
            if (payload.deviceId) {
                request['deviceId'] = payload.deviceId;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.ForbiddenException(error.message, error.stack);
            }
            throw new common_1.ForbiddenException('An unknown error occurred');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crypto_helper_1.CryptoHelper,
        config_1.ConfigService])
], AuthGuard);
