"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const authentication_1 = require("../guards/authentication");
const authorization_1 = require("../guards/authorization");
function Auth(options) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('permissions', options?.permissions || []), (0, common_1.SetMetadata)('ownerOnly', options?.ownerOnly || false), (0, common_1.SetMetadata)('allowAny', options?.allowAny || false), (0, common_1.UseGuards)(authentication_1.AuthGuard, authorization_1.RolesGuard));
}
