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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferModel = exports.TransferModel = exports.TRANSFER_MODEL = exports.TransferSchema = exports.Transfer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
// Enum for transfer status
let Transfer = class Transfer {
};
exports.Transfer = Transfer;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true, index: true }),
    __metadata("design:type", String)
], Transfer.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: {
            sourceId: { type: mongoose_2.Types.ObjectId },
            sourceName: { type: String }
        } }),
    __metadata("design:type", Object)
], Transfer.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: {
            destinationId: { type: mongoose_2.Types.ObjectId },
            destinationName: { type: String }
        } }),
    __metadata("design:type", Object)
], Transfer.prototype, "destination", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transfer.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transfer.prototype, "submittedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Transfer.prototype, "submittedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Transfer.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: Object.values(type_1.TransferType) }),
    __metadata("design:type", String)
], Transfer.prototype, "transferType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: Object.values(type_1.TransferStatus), default: type_1.TransferStatus.DRAFT }),
    __metadata("design:type", String)
], Transfer.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Materials' },
                materialName: { type: String },
                materialCode: { type: String },
                quantity: { type: Number, min: 0 },
                receivedQuantity: { type: Number, min: 0 },
                transferVariance: { type: Number, min: 0 },
                unitCost: { type: Number, min: 0 },
                totalCost: { type: Number, min: 0 },
            }] }),
    __metadata("design:type", Array)
], Transfer.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Transfer.prototype, "dateDueToReceive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Transfer.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Transfer.prototype, "transferReceivingReference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Transfer.prototype, "transferSendingReference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Transfer.prototype, "totalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Transfer.prototype, "totalItems", void 0);
exports.Transfer = Transfer = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'transfers'
    })
], Transfer);
exports.TransferSchema = mongoose_1.SchemaFactory.createForClass(Transfer);
// Indexes for better performance
exports.TransferSchema.index({ referenceNumber: 1 });
exports.TransferSchema.index({ status: 1 });
exports.TransferSchema.index({ transferType: 1 });
exports.TransferSchema.index({ sourceLocationType: 1 });
exports.TransferSchema.index({ sourceLocationId: 1 });
exports.TransferSchema.index({ destinationLocationType: 1 });
exports.TransferSchema.index({ destinationLocationId: 1 });
exports.TransferSchema.index({ requestedDate: 1 });
exports.TransferSchema.index({ approvedDate: 1 });
exports.TransferSchema.index({ shippedDate: 1 });
exports.TransferSchema.index({ receivedDate: 1 });
exports.TransferSchema.index({ expectedDeliveryDate: 1 });
exports.TransferSchema.index({ requestedBy: 1 });
exports.TransferSchema.index({ approvedBy: 1 });
exports.TransferSchema.index({ shippedBy: 1 });
exports.TransferSchema.index({ receivedBy: 1 });
exports.TransferSchema.index({ trackingNumber: 1 });
exports.TransferSchema.index({ isDeleted: 1 });
exports.TransferSchema.index({ createdAt: -1 });
// Compound indexes
exports.TransferSchema.index({ sourceLocationId: 1, status: 1 });
exports.TransferSchema.index({ destinationLocationId: 1, status: 1 });
exports.TransferSchema.index({ referenceNumber: 1, isDeleted: 1 }, { unique: true });
exports.TransferSchema.index({ status: 1, isDeleted: 1 });
exports.TransferSchema.index({ requestedDate: 1, status: 1 });
exports.TRANSFER_MODEL = 'TRANSFER_MODEL';
exports.TransferModel = mongoose_1.MongooseModule.forFeature([
    { name: 'Transfer', schema: exports.TransferSchema }
]);
const getTransferModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in transfer model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Warehouse']) {
        const { WarehouseSchema } = require('./warehouse.model');
        connection.model('Warehouse', WarehouseSchema);
    }
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['Materials']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Materials', MaterialsSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }
    const model = connection.models['Transfer'] || connection.model('Transfer', exports.TransferSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTransferModel = getTransferModel;
