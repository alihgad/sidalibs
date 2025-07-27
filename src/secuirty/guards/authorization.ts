import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler()) || [];
    const ownerOnly = this.reflector.get<boolean>('ownerOnly', context.getHandler()) || false;
    const allowAny = this.reflector.get<boolean>('allowAny', context.getHandler()) || false;

    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req.user;

    
    if (!user) {
      throw new ForbiddenException('Forbidden resource no user');
    }

    // لو auth لمالك فقط
    if (ownerOnly) {
      if (user.isOwner) return true;
      throw new ForbiddenException('You must be owner to access this resource');
    }

    // لو يسمح لأي مستخدم مسجل
    if (allowAny) {
      return true;
    }

    // لو المستخدم مالك، يمر بدون تحقق صلاحيات
    if (user.isOwner) return true;

    // لو مفيش صلاحيات مطلوبة، نسمح
    if (requiredPermissions.length === 0) return true;

    // جمع صلاحيات المستخدم من رولات
    const userPermissions = user.role.flatMap((role: any) => role.permissions || []);

    // التحقق من الصلاحيات المطلوبة
    const hasAllPermissions = requiredPermissions.some((perm) => userPermissions.includes(perm));

    if (!hasAllPermissions) {
      throw new ForbiddenException('You do not have the required permissions to access this resource');
    }

    return true;
  }
}
