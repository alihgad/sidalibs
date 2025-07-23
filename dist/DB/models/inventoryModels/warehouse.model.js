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
exports.WarehouseSchema = exports.Warehouse = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Warehouse = class Warehouse {
};
exports.Warehouse = Warehouse;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true, index: true }),
    __metadata("design:type", String)
], Warehouse.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Warehouse.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Warehouse.prototype, "endOfDayTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true, index: true }),
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
exports.Warehouse = Warehouse = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Warehouse);
exports.WarehouseSchema = mongoose_1.SchemaFactory.createForClass(Warehouse);
// Index for better query performance
exports.WarehouseSchema.index({ isActive: 1 });
