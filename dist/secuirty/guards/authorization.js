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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredPermissions = this.reflector.get('permissions', context.getHandler()) || [];
        const ownerOnly = this.reflector.get('ownerOnly', context.getHandler()) || false;
        const allowAny = this.reflector.get('allowAny', context.getHandler()) || false;
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        const user = ctx.req.user;
        if (!user) {
            throw new common_1.ForbiddenException('Forbidden resource no user');
        }
        // لو auth لمالك فقط
        if (ownerOnly) {
            if (user.isOwner)
                return true;
            throw new common_1.ForbiddenException('You must be owner to access this resource');
        }
        // لو يسمح لأي مستخدم مسجل
        if (allowAny) {
            return true;
        }
        // لو المستخدم مالك، يمر بدون تحقق صلاحيات
        if (user.isOwner)
            return true;
        // لو مفيش صلاحيات مطلوبة، نسمح
        if (requiredPermissions.length === 0)
            return true;
        // جمع صلاحيات المستخدم من رولات
        const userPermissions = user.role.flatMap((role) => role.permissions || []);
        // التحقق من الصلاحيات المطلوبة
        const hasAllPermissions = requiredPermissions.some((perm) => userPermissions.includes(perm));
        if (!hasAllPermissions) {
            throw new common_1.ForbiddenException('You do not have the required permissions to access this resource');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
