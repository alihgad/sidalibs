"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("./guards/authentication");
const authorization_1 = require("./guards/authorization");
const core_1 = require("@nestjs/core");
const crypto_module_1 = require("./crypto.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [crypto_module_1.CryptoModule],
        providers: [authentication_1.AuthGuard, authorization_1.RolesGuard, core_1.Reflector],
        exports: [authentication_1.AuthGuard, authorization_1.RolesGuard, core_1.Reflector, crypto_module_1.CryptoModule]
    })
], AuthModule);
