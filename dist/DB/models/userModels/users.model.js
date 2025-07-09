"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = exports.UserModel = exports.USER_MODEL = exports.UserSchema = exports.User = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const Hash_helper_1 = require("../../../secuirty/Hash.helper");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const roles_model_1 = require("./roles.model");
const branch_model_1 = require("../TenantModels/branch.model");
const crypto_exporter_1 = require("../../../secuirty/crypto.exporter");
const type_1 = require("../../../common/type");
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let User = class User {
    constructor(firstName, lastName, phone, role, isOwner, jwtSecret, cashirLogin, email, password, notifications, loginDevicesSession) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
        this.isOwner = isOwner;
        this.jwtSecret = jwtSecret;
        this.cashirLogin = cashirLogin;
        this.email = email;
        this.password = password;
        this.notifications = notifications || [];
        this.loginDevicesSession = loginDevicesSession || new Map();
    }
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 20 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 20 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], User.prototype, "isOwner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'roles' }),
    __metadata("design:type", Array)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, select: false }),
    __metadata("design:type", String)
], User.prototype, "jwtSecret", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "cashirLogin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Branch' }),
    __metadata("design:type", Array)
], User.prototype, "branches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.languages), default: type_1.languages.AR, required: true }),
    __metadata("design:type", String)
], User.prototype, "language", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isPhoneVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Map,
        of: {
            LSID: { type: String, required: true },
            browser: { type: String },
            os: { type: String },
            ipAddress: { type: String },
            createdAt: { type: Date, default: Date.now },
            deviceType: { type: String },
        },
        default: {},
    }),
    __metadata("design:type", Map)
], User.prototype, "loginDevicesSession", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }),
    __metadata("design:paramtypes", [String, String, String, Array, Boolean, String, String, String, String, Array, Map])
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.USER_MODEL = 'USER_MODEL';
exports.UserModel = mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: exports.UserSchema }]);
// Define virtual field userName
exports.UserSchema.virtual('userName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.UserSchema.pre("save", function (next) {
    if (this.isModified('password')) {
        if (this.password !== undefined) {
            this.password = (0, Hash_helper_1.Hash)(this.password, Number(process.env.SALT_ROUND) || 10);
        }
    }
    if (this.isModified('phone')) {
        if (this.phone !== undefined) {
            this.phone = crypto_exporter_1.CryptoExporter.encrypt(this.phone, process.env.CRYPTO_SECRET);
        }
    }
    if (this.isModified('jwtSecret')) {
        if (this.jwtSecret !== undefined) {
            this.jwtSecret = crypto_exporter_1.CryptoExporter.encrypt(this.jwtSecret, process.env.CRYPTO_SECRET);
        }
    }
    next();
});
const getUserModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in user model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // تسجيل الـ models المطلوبة للـ refs
    if (!connection.models['roles']) {
        connection.model('roles', roles_model_1.rolesSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    const model = connection.models['User'] || connection.model('User', exports.UserSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getUserModel = getUserModel;
