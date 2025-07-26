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
exports.getInventorySpotModel = exports.InventorySpotModel = exports.INVENTORY_SPOT_MODEL = exports.InventorySpotSchema = exports.InventorySpot = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let InventorySpot = class InventorySpot {
};
exports.InventorySpot = InventorySpot;
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            branchId: { type: mongoose_2.Types.ObjectId, ref: 'Branch' },
            branchName: { type: String },
        },
        required: true
    }),
    __metadata("design:type", Object)
], InventorySpot.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], InventorySpot.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventorySpot.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventorySpot.prototype, "sendBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], InventorySpot.prototype, "sendAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], InventorySpot.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], InventorySpot.prototype, "totalDiffCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                materialId: mongoose_2.Types.ObjectId,
                materialName: String,
                materialCode: String,
                insertedQuantity: Number,
                materialQuantity: Number,
                diffQuantity: Number,
                diffPercent: String,
                diffCost: String,
            }] }),
    __metadata("design:type", Array)
], InventorySpot.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventorySpot.prototype, "deletedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], InventorySpot.prototype, "deletedAt", void 0);
exports.InventorySpot = InventorySpot = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'inventorySpots'
    })
], InventorySpot);
exports.InventorySpotSchema = mongoose_1.SchemaFactory.createForClass(InventorySpot);
// Indexes for better performance
exports.InventorySpotSchema.index({ locationType: 1 });
exports.InventorySpotSchema.index({ locationId: 1 });
exports.InventorySpotSchema.index({ section: 1 });
exports.InventorySpotSchema.index({ isActive: 1 });
exports.InventorySpotSchema.index({ isDeleted: 1 });
exports.InventorySpotSchema.index({ createdAt: -1 });
exports.InventorySpotSchema.index({ updatedBy: 1 });
exports.InventorySpotSchema.index({ deletedBy: 1 });
// Compound indexes
exports.InventorySpotSchema.index({ locationId: 1, section: 1 });
exports.InventorySpotSchema.index({ locationId: 1, isDeleted: 1 });
exports.InventorySpotSchema.index({ code: 1, isDeleted: 1 }, { unique: true });
exports.INVENTORY_SPOT_MODEL = 'INVENTORY_SPOT_MODEL';
exports.InventorySpotModel = mongoose_1.MongooseModule.forFeature([
    { name: 'InventorySpot', schema: exports.InventorySpotSchema }
]);
const getInventorySpotModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in inventory spot model');
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
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }
    const model = connection.models['InventorySpot'] || connection.model('InventorySpot', exports.InventorySpotSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getInventorySpotModel = getInventorySpotModel;
