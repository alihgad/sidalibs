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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesModel = exports.SalesModel = exports.SALES_MODEL = exports.SalesSchema = exports.Sales = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const type_1 = require("../../../common/type");
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let Sales = class Sales {
};
exports.Sales = Sales;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Sales.prototype, "invoiceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sales.prototype, "salesPersonId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Branch', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sales.prototype, "branchId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Customer', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sales.prototype, "customerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Sales.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0, default: 0, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "taxAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0, default: 0, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Sales.prototype, "finalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: type_1.PaymentMethodEnum, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: type_1.SaleStatusEnum, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                productId: { type: mongoose_2.Types.ObjectId, ref: 'Product', required: true },
                productName: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                unitPrice: { type: Number, required: true, min: 0 },
                totalPrice: { type: Number, required: true, min: 0 },
                discount: { type: Number, default: 0, min: 0 },
                tax: { type: Number, default: 0, min: 0 }
            }], required: true }),
    __metadata("design:type", Array)
], Sales.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Sales.prototype, "totalQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "cancelledAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "cancellationReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "cancelledBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Object)
], Sales.prototype, "isRefunded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "refundedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "refundedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], Sales.prototype, "refundReason", void 0);
exports.Sales = Sales = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Sales'
    })
], Sales);
exports.SalesSchema = mongoose_1.SchemaFactory.createForClass(Sales);
// Indexes for better performance
// SalesSchema.index({ invoiceNumber: 1 });
exports.SalesSchema.index({ cashierId: 1 });
exports.SalesSchema.index({ branchId: 1 });
exports.SalesSchema.index({ customerId: 1 });
exports.SalesSchema.index({ status: 1 });
exports.SalesSchema.index({ createdAt: -1 });
exports.SALES_MODEL = 'SALES_MODEL';
exports.SalesModel = mongoose_1.MongooseModule.forFeature([
    { name: 'Sales', schema: exports.SalesSchema }
]);
const getSalesModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in sales model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['User']) {
        const { UserSchema } = require('./users.model');
        connection.model('User', UserSchema);
    }
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['Customer']) {
        const { CustomerSchema } = require('./customers.model');
        connection.model('Customer', CustomerSchema);
    }
    if (!connection.models['Product']) {
        const { ProductSchema } = require('../productModels/product.model');
        connection.model('Product', ProductSchema);
    }
    const model = connection.models['Sales'] || connection.model('Sales', exports.SalesSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getSalesModel = getSalesModel;
