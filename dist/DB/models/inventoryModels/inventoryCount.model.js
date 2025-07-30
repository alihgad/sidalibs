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
exports.getInventoryCountModel = exports.InventoryCountModel = exports.INVENTORY_COUNT_MODEL = exports.InventoryCountSchema = exports.InventoryCount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let InventoryCount = class InventoryCount {
};
exports.InventoryCount = InventoryCount;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], InventoryCount.prototype, "refrenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {
            branchId: { type: mongoose_2.Types.ObjectId },
            branchName: { type: String }
        } }),
    __metadata("design:type", Object)
], InventoryCount.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.InventoryCountStatus), default: type_1.InventoryCountStatus.DRAFT }),
    __metadata("design:type", String)
], InventoryCount.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                itemId: { type: mongoose_2.Types.ObjectId },
                itemName: { type: String },
                itemCode: { type: String },
                itemStorageUnit: { type: String },
                itemInputQuantity: { type: Number },
                itemQuantity: { type: Number },
                itemVarianceQuantity: { type: Number },
                itemVariancePercentage: { type: Number },
                itemVarianceCost: { type: Number },
                itemCost: { type: Number },
            }], default: [] }),
    __metadata("design:type", Array)
], InventoryCount.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], InventoryCount.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventoryCount.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], InventoryCount.prototype, "isSubmitted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventoryCount.prototype, "submittedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], InventoryCount.prototype, "submittedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], InventoryCount.prototype, "totalVarianceCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], InventoryCount.prototype, "itemsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], InventoryCount.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventoryCount.prototype, "deletedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], InventoryCount.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], InventoryCount.prototype, "notes", void 0);
exports.InventoryCount = InventoryCount = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'inventoryCounts'
    })
], InventoryCount);
exports.InventoryCountSchema = mongoose_1.SchemaFactory.createForClass(InventoryCount);
exports.INVENTORY_COUNT_MODEL = 'InventoryCount';
exports.InventoryCountModel = mongoose_1.MongooseModule.forFeature([
    { name: exports.INVENTORY_COUNT_MODEL, schema: exports.InventoryCountSchema }
]);
const getInventoryCountModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in inventoryCount model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models[exports.INVENTORY_COUNT_MODEL] || connection.model(exports.INVENTORY_COUNT_MODEL, exports.InventoryCountSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getInventoryCountModel = getInventoryCountModel;
