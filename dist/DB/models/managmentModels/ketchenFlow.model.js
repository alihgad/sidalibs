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
exports.getKitchenFlowModel = exports.KitchenFlowModel = exports.KITCHEN_FLOW_MODEL = exports.KitchenFlowSchema = exports.KitchenFlow = exports.Station = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
// Embedded schema for stations
let Station = class Station {
};
exports.Station = Station;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Station.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Device', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Station.prototype, "kitchenDisplayId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Station.prototype, "order", void 0);
exports.Station = Station = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Station);
let KitchenFlow = class KitchenFlow {
};
exports.KitchenFlow = KitchenFlow;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], KitchenFlow.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Branch', required: true }),
    __metadata("design:type", Array)
], KitchenFlow.prototype, "branches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Station], required: true, default: [] }),
    __metadata("design:type", Array)
], KitchenFlow.prototype, "stations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Product', required: true }),
    __metadata("design:type", Array)
], KitchenFlow.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], KitchenFlow.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], KitchenFlow.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], KitchenFlow.prototype, "deletedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], KitchenFlow.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Date)
], KitchenFlow.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Date)
], KitchenFlow.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], KitchenFlow.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], KitchenFlow.prototype, "updatedBy", void 0);
exports.KitchenFlow = KitchenFlow = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'kitchenFlows'
    })
], KitchenFlow);
exports.KitchenFlowSchema = mongoose_1.SchemaFactory.createForClass(KitchenFlow);
// Indexes for better performance
exports.KitchenFlowSchema.index({ name: 1 });
exports.KitchenFlowSchema.index({ branches: 1 });
exports.KitchenFlowSchema.index({ products: 1 });
exports.KitchenFlowSchema.index({ isActive: 1 });
exports.KitchenFlowSchema.index({ isDeleted: 1 });
exports.KitchenFlowSchema.index({ deletedBy: 1 });
exports.KitchenFlowSchema.index({ deletedAt: 1 });
exports.KitchenFlowSchema.index({ createdAt: -1 });
exports.KitchenFlowSchema.index({ updatedAt: -1 });
// Compound indexes
exports.KitchenFlowSchema.index({ name: 1, isDeleted: 1 });
exports.KitchenFlowSchema.index({ isActive: 1, isDeleted: 1 });
exports.KitchenFlowSchema.index({ branches: 1, isActive: 1 });
exports.KitchenFlowSchema.index({ branches: 1, isDeleted: 1 });
exports.KitchenFlowSchema.index({ products: 1, isActive: 1 });
exports.KitchenFlowSchema.index({ products: 1, isDeleted: 1 });
exports.KITCHEN_FLOW_MODEL = 'KitchenFlow';
exports.KitchenFlowModel = mongoose_1.MongooseModule.forFeature([
    { name: exports.KITCHEN_FLOW_MODEL, schema: exports.KitchenFlowSchema }
]);
const getKitchenFlowModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in kitchen flow model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['Product']) {
        const { ProductSchema } = require('../menuModels/product.model');
        connection.model('Product', ProductSchema);
    }
    if (!connection.models['Device']) {
        const { DeviceSchema } = require('../TenantModels/device.model');
        connection.model('Device', DeviceSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('./users.model');
        connection.model('User', UserSchema);
    }
    const model = connection.models[exports.KITCHEN_FLOW_MODEL] || connection.model(exports.KITCHEN_FLOW_MODEL, exports.KitchenFlowSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getKitchenFlowModel = getKitchenFlowModel;
