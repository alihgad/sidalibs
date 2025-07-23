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
exports.getWarehouseModel = exports.WarehouseModel = exports.WAREHOUSE_MODEL = exports.WarehouseSchema = exports.Warehouse = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Warehouse = class Warehouse {
};
exports.Warehouse = Warehouse;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], Warehouse.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Warehouse.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, enum: type_1.DeliveryTime }),
    __metadata("design:type", String)
], Warehouse.prototype, "endOfDayTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], Warehouse.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Warehouse.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Warehouse.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Warehouse.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Warehouse.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Warehouse.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Warehouse.prototype, "isDeleted", void 0);
exports.Warehouse = Warehouse = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'warehouses'
    })
], Warehouse);
exports.WarehouseSchema = mongoose_1.SchemaFactory.createForClass(Warehouse);
// Indexes for better performance
exports.WarehouseSchema.index({ name: 1 });
exports.WarehouseSchema.index({ referenceNumber: 1 });
exports.WarehouseSchema.index({ isActive: 1 });
exports.WarehouseSchema.index({ isDeleted: 1 });
exports.WarehouseSchema.index({ createdAt: -1 });
// Compound index for unique name per business
exports.WarehouseSchema.index({ name: 1, isDeleted: 1 });
exports.WAREHOUSE_MODEL = 'WAREHOUSE_MODEL';
exports.WarehouseModel = mongoose_1.MongooseModule.forFeature([
    { name: 'Warehouse', schema: exports.WarehouseSchema }
]);
const getWarehouseModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in warehouse model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Warehouse'] || connection.model('Warehouse', exports.WarehouseSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getWarehouseModel = getWarehouseModel;
