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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHelper = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const crypto_js_1 = __importDefault(require("crypto-js"));
let CryptoHelper = class CryptoHelper {
    constructor(configService) {
        this.configService = configService;
    }
    get defaultSecretKey() {
        const secret = this.configService.get('CRYPTO_SECRET');
        if (!secret) {
            throw new Error('CRYPTO_SECRET environment variable is not set');
        }
        return secret;
    }
    encrypt(plainText, secretKey = this.defaultSecretKey) {
        if (!plainText)
            return undefined;
        const cipher = crypto_js_1.default.AES.encrypt(plainText, secretKey);
        return cipher.toString();
    }
    decrypt(encryptedText, secretKey = this.defaultSecretKey) {
        if (!encryptedText)
            return undefined;
        const bytes = crypto_js_1.default.AES.decrypt(encryptedText, secretKey);
        return bytes.toString(crypto_js_1.default.enc.Utf8);
    }
};
exports.CryptoHelper = CryptoHelper;
exports.CryptoHelper = CryptoHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CryptoHelper);
