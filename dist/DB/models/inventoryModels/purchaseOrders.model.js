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
exports.getPurchaseOrdersCollection = exports.getPurchaseOrdersModel = exports.PurchaseOrdersModel = exports.PURCHASE_ORDERS_MODEL = exports.PurchaseOrdersSchema = exports.PurchaseOrders = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const type_1 = require("../../../common/type");
// Delivery time enum (24 hours with 30-minute intervals)
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let PurchaseOrders = class PurchaseOrders {
};
exports.PurchaseOrders = PurchaseOrders;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PurchaseOrders.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            supplierId: { type: mongoose_2.Types.ObjectId, ref: 'Supplier', required: true },
            supplierName: { type: String, required: true },
        }, required: true
    }),
    __metadata("design:type", Object)
], PurchaseOrders.prototype, "supplier", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            branchId: { type: mongoose_2.Types.ObjectId, required: true },
            branchName: { type: String, required: true },
        }, required: true
    }),
    __metadata("design:type", Object)
], PurchaseOrders.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: Object.values(type_1.PurchaseOrderStatus), default: type_1.PurchaseOrderStatus.DRAFT }),
    __metadata("design:type", String)
], PurchaseOrders.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PurchaseOrders.prototype, "deliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PurchaseOrders.prototype, "businessDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: Object.values(type_1.DeliveryTime) }),
    __metadata("design:type", String)
], PurchaseOrders.prototype, "deliveryTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrders.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrders.prototype, "additionalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PurchaseOrders.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Materials' },
                materialName: { type: String },
                code: { type: String },
                availableQuantity: { type: Number, min: 0 },
                unitPrice: { type: Number, min: 0 },
                quantity: { type: Number, min: 1 },
                totalPrice: { type: Number, min: 0 }
            }]
    }),
    __metadata("design:type", Array)
], PurchaseOrders.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrders.prototype, "submittedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PurchaseOrders.prototype, "submittedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrders.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PurchaseOrders.prototype, "approvedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrders.prototype, "rejectedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PurchaseOrders.prototype, "rejectedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrders.prototype, "cancelledBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PurchaseOrders.prototype, "cancelledAt", void 0);
exports.PurchaseOrders = PurchaseOrders = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'purchaseOrders'
    })
], PurchaseOrders);
exports.PurchaseOrdersSchema = mongoose_1.SchemaFactory.createForClass(PurchaseOrders);
exports.PURCHASE_ORDERS_MODEL = 'PURCHASE_ORDERS_MODEL';
exports.PurchaseOrdersModel = mongoose_1.MongooseModule.forFeature([
    { name: 'PurchaseOrders', schema: exports.PurchaseOrdersSchema }
]);
const getPurchaseOrdersModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in purchase orders model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }
    if (!connection.models['Materials']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Materials', MaterialsSchema);
    }
    if (!connection.models['Supplier']) {
        const { supplierSchema } = require('./supplier.model');
        connection.model('Supplier', supplierSchema);
    }
    const model = connection.models['PurchaseOrders'] || connection.model('PurchaseOrders', exports.PurchaseOrdersSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPurchaseOrdersModel = getPurchaseOrdersModel;
const getPurchaseOrdersCollection = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in purchase orders model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const collection = connection.collection('purchaseOrders');
    return collection;
};
exports.getPurchaseOrdersCollection = getPurchaseOrdersCollection;
