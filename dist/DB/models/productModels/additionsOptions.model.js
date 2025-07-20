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
exports.getAdditionsModel = exports.AdditionModel = exports.ADDITION_MODEL = exports.AdditionSchema = exports.Addition = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
const nutritional_values_schema_1 = require("../shared/nutritional-values.schema");
let Addition = class Addition {
};
exports.Addition = Addition;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Addition.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Addition.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Addition.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Addition.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Addition.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'TaxGroup', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Addition.prototype, "taxGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.CostCalculationMethod, required: true }),
    __metadata("design:type", String)
], Addition.prototype, "costCalculationMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Addition.prototype, "cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Material' }], default: [] }),
    __metadata("design:type", Array)
], Addition.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: type_1.OrderType, default: [] }),
    __metadata("design:type", Array)
], Addition.prototype, "orderTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], Addition.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Combo', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Addition.prototype, "comboException", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nutritional_values_schema_1.NutritionalValuesSchema, required: false }),
    __metadata("design:type", Object)
], Addition.prototype, "nutritionalValues", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ branch: { type: mongoose_2.Types.ObjectId, ref: 'Branch' }, price: Number }], default: [] }),
    __metadata("design:type", Array)
], Addition.prototype, "customBranchPrices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], Addition.prototype, "inactiveBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], Addition.prototype, "outOfStockBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ priceTag: { type: mongoose_2.Types.ObjectId, ref: 'PriceTagApplies' }, price: Number }], default: [] }),
    __metadata("design:type", Array)
], Addition.prototype, "priceTagApplies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Addition.prototype, "isDeleted", void 0);
exports.Addition = Addition = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Addition);
exports.AdditionSchema = mongoose_1.SchemaFactory.createForClass(Addition);
exports.ADDITION_MODEL = 'Addition';
exports.AdditionModel = mongoose_1.MongooseModule.forFeature([
    { name: Addition.name, schema: exports.AdditionSchema },
]);
const getAdditionsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Addition model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Addition'] || connection.model('Addition', exports.AdditionSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getAdditionsModel = getAdditionsModel;
