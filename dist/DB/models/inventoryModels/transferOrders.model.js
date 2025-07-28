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
exports.getTransferOrderModel = exports.TransferOrderModel = exports.TRANSFER_ORDER_MODEL = exports.TransferOrderSchema = exports.TransferOrder = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let TransferOrder = class TransferOrder {
};
exports.TransferOrder = TransferOrder;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], TransferOrder.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true, type: {
            warehouseId: String,
            warehouseName: String
        }
    }),
    __metadata("design:type", Object)
], TransferOrder.prototype, "warehouse", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true, type: {
            destinationId: String,
            destinationName: String
        }
    }),
    __metadata("design:type", Object)
], TransferOrder.prototype, "destination", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], TransferOrder.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, ref: 'User' }),
    __metadata("design:type", String)
], TransferOrder.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], TransferOrder.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: type_1.TransferStatus.DRAFT }),
    __metadata("design:type", String)
], TransferOrder.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [{
                itemId: String,
                itemName: String,
                itemCode: String,
                quantity: Number,
                availableQuantity: Number,
            }] }),
    __metadata("design:type", Array)
], TransferOrder.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TransferOrder.prototype, "isSubmitted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User' }),
    __metadata("design:type", String)
], TransferOrder.prototype, "submittedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], TransferOrder.prototype, "submittedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TransferOrder.prototype, "isSent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User' }),
    __metadata("design:type", String)
], TransferOrder.prototype, "sentBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], TransferOrder.prototype, "sentAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], TransferOrder.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User' }),
    __metadata("design:type", String)
], TransferOrder.prototype, "deletedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], TransferOrder.prototype, "deletedAt", void 0);
exports.TransferOrder = TransferOrder = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'transferOrders'
    })
], TransferOrder);
exports.TransferOrderSchema = mongoose_1.SchemaFactory.createForClass(TransferOrder);
// Indexes for better performance
exports.TransferOrderSchema.index({ status: 1 });
exports.TransferOrderSchema.index({ 'warehouse.warehouseId': 1 });
exports.TransferOrderSchema.index({ 'destination.destinationId': 1 });
exports.TransferOrderSchema.index({ workDate: 1 });
exports.TransferOrderSchema.index({ 'createdBy.userId': 1 });
exports.TransferOrderSchema.index({ isSubmitted: 1 });
exports.TransferOrderSchema.index({ submittedBy: 1 });
exports.TransferOrderSchema.index({ submittedAt: 1 });
exports.TransferOrderSchema.index({ isSent: 1 });
exports.TransferOrderSchema.index({ sentBy: 1 });
exports.TransferOrderSchema.index({ sentAt: 1 });
exports.TransferOrderSchema.index({ isDeleted: 1 });
exports.TransferOrderSchema.index({ deletedAt: 1 });
exports.TransferOrderSchema.index({ createdAt: -1 });
// Compound indexes
exports.TransferOrderSchema.index({ referenceNumber: 1 });
exports.TransferOrderSchema.index({ 'warehouse.warehouseId': 1, status: 1 });
exports.TransferOrderSchema.index({ 'destination.destinationId': 1, status: 1 });
exports.TransferOrderSchema.index({ referenceNumber: 1, isDeleted: 1 }, { unique: true });
exports.TransferOrderSchema.index({ status: 1, isSubmitted: 1 });
exports.TransferOrderSchema.index({ status: 1, isSent: 1 });
exports.TransferOrderSchema.index({ status: 1, isDeleted: 1 });
exports.TransferOrderSchema.index({ workDate: 1, status: 1 });
exports.TransferOrderSchema.index({ 'createdBy.userId': 1, status: 1 });
exports.TRANSFER_ORDER_MODEL = 'TRANSFER_ORDER_MODEL';
exports.TransferOrderModel = mongoose_1.MongooseModule.forFeature([
    { name: 'TransferOrder', schema: exports.TransferOrderSchema }
]);
const getTransferOrderModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in transfer order model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Materials']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Materials', MaterialsSchema);
    }
    if (!connection.models['user']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('user', UserSchema);
    }
    const model = connection.models['TransferOrder'] || connection.model('TransferOrder', exports.TransferOrderSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTransferOrderModel = getTransferOrderModel;
