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
exports.getcustomersModel = exports.customersModel = exports.customers_MODEL = exports.customersSchema = exports.customers = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const branch_model_1 = require("../TenantModels/branch.model");
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let customers = class customers {
    constructor(name, phone, totalOrders = 0, favoriteBranch, accountBalance = 0, isDeleted = false, isBlacklisted = false, creditAccount = false, favoriteItem, notes, lastOrder) {
        this.name = name;
        this.phone = phone;
        this.totalOrders = totalOrders;
        this.favoriteBranch = favoriteBranch;
        this.favoriteItem = favoriteItem;
        this.lastOrder = lastOrder;
        this.accountBalance = accountBalance;
        this.isDeleted = isDeleted;
        this.isBlacklisted = isBlacklisted;
        this.creditAccount = creditAccount;
        this.notes = notes;
    }
};
exports.customers = customers;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 20 }),
    __metadata("design:type", String)
], customers.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], customers.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, }),
    __metadata("design:type", String)
], customers.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], customers.prototype, "totalOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], customers.prototype, "lastOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], customers.prototype, "accountBalance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], customers.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], customers.prototype, "isBlacklisted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], customers.prototype, "creditAccount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Branch' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], customers.prototype, "favoriteBranch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Product' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], customers.prototype, "favoriteItem", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], customers.prototype, "notes", void 0);
exports.customers = customers = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }),
    __metadata("design:paramtypes", [String, String, Number, mongoose_2.Types.ObjectId, Number, Boolean, Boolean, Boolean, mongoose_2.Types.ObjectId, String, Date])
], customers);
exports.customersSchema = mongoose_1.SchemaFactory.createForClass(customers);
exports.customers_MODEL = 'customers_MODEL';
exports.customersModel = mongoose_1.MongooseModule.forFeature([{ name: 'customers', schema: exports.customersSchema }]);
// customersSchema.pre("save", function (next) {
//     if (this.isModified('phone')) {
//         if (this.phone !== undefined) {
//             this.phone = CryptoExporter.encrypt(this.phone, process.env.CRYPTO_SECRET) as string;
//         }
//     }
//     next();
// })
const getcustomersModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in customers model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // تسجيل الـ models المطلوبة للـ refs
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    // Note: Product model registration will be handled by its own getModel function when needed
    const model = connection.models['customers'] || connection.model('customers', exports.customersSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getcustomersModel = getcustomersModel;
