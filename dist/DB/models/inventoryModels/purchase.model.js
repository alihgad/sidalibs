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
exports.getPurchaseModel = exports.PurchaseModel = exports.PURCHASE_MODEL = exports.PurchaseSchema = exports.Purchase = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const type_1 = require("../../../common/type");
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let Purchase = class Purchase {
};
exports.Purchase = Purchase;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Purchase.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            supplierId: { type: mongoose_2.Types.ObjectId, ref: 'Supplier', required: true },
            supplierName: { type: String, required: true },
        }, ref: 'Supplier', required: true
    }),
    __metadata("design:type", Object)
], Purchase.prototype, "supplier", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            branchId: { type: mongoose_2.Types.ObjectId, ref: 'Branch', required: true },
            branchName: { type: String, required: true },
        }, ref: 'Branch', required: true
    }),
    __metadata("design:type", Object)
], Purchase.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: type_1.PurchaseStatus, required: true }),
    __metadata("design:type", String)
], Purchase.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Purchase.prototype, "purchaseDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "taxAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "finalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Material', required: true },
                materialName: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                unitPrice: { type: Number, required: true, min: 0 },
                totalPrice: { type: Number, required: true, min: 0 },
                receivedQuantity: { type: Number, default: 0, min: 0 }
            }], required: true
    }),
    __metadata("design:type", Array)
], Purchase.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Purchase.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Purchase.prototype, "receivedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Purchase.prototype, "receivedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Purchase.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Purchase.prototype, "returnedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Purchase.prototype, "returnedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Purchase.prototype, "returnedNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Purchase.prototype, "invoiceDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Purchase.prototype, "invoiceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Purchase.prototype, "additionalCosts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Purchase.prototype, "paidTaxAmount", void 0);
exports.Purchase = Purchase = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'purchase'
    })
], Purchase);
exports.PurchaseSchema = mongoose_1.SchemaFactory.createForClass(Purchase);
// Indexes for better performance
exports.PurchaseSchema.index({ purchaseNumber: 1 });
exports.PurchaseSchema.index({ purchaseOrderId: 1 });
exports.PurchaseSchema.index({ supplierId: 1 });
exports.PurchaseSchema.index({ branchId: 1 });
exports.PurchaseSchema.index({ status: 1 });
exports.PurchaseSchema.index({ purchaseDate: -1 });
exports.PurchaseSchema.index({ isDeleted: 1 });
exports.PurchaseSchema.index({ createdAt: -1 });
exports.PURCHASE_MODEL = 'PURCHASE_MODEL';
exports.PurchaseModel = mongoose_1.MongooseModule.forFeature([
    { name: 'Purchase', schema: exports.PurchaseSchema }
]);
const getPurchaseModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in purchase model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Supplier']) {
        const { supplierSchema } = require('./supplier.model');
        connection.model('Supplier', supplierSchema);
    }
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }
    if (!connection.models['Material']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Material', MaterialsSchema);
    }
    const model = connection.models['Purchase'] || connection.model('Purchase', exports.PurchaseSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPurchaseModel = getPurchaseModel;
