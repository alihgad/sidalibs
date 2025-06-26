import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guards/authentication";
import { RolesGuard } from "../guards/authorization";


export type AuthOptions = {
    permissions?: string[];    // الصلاحيات المطلوبة
    ownerOnly?: boolean;       // هل لازم يكون Owner فقط؟
    allowAny?: boolean;        // هل يسمح لأي مستخدم مسجل؟
  };
  
  export function Auth(options?: AuthOptions) {
    return applyDecorators(
      SetMetadata('permissions', options?.permissions || []),
      SetMetadata('ownerOnly', options?.ownerOnly || false),
      SetMetadata('allowAny', options?.allowAny || false),
      UseGuards(AuthGuard, RolesGuard),
    );
  }
  