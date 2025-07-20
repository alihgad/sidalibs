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
exports.NutritionalValuesSchema = exports.NutritionalValues = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let NutritionalValues = class NutritionalValues {
};
exports.NutritionalValues = NutritionalValues;
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "servingSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: 'ServingUnit', default: 'SERVING' }),
    __metadata("design:type", String)
], NutritionalValues.prototype, "servingUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "calories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "protein", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "totalFat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "saturatedFat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "transFat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "cholesterol", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "sodium", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "salt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "carbohydrates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "fiber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "totalSugars", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "addedSugars", void 0);
exports.NutritionalValues = NutritionalValues = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NutritionalValues);
exports.NutritionalValuesSchema = mongoose_1.SchemaFactory.createForClass(NutritionalValues);
