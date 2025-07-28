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
exports.getAdditionsOptionModel = exports.AdditionsOptionModel = exports.ADDITIONS_OPTION_MODEL = exports.AdditionsOptionSchema = exports.AdditionsOption = exports.PriceTagApplySchema = exports.PriceTagApply = exports.CustomAddationsOptionsBranchPriceSchema = exports.CustomAddationsOptionsBranchPrice = exports.IngredientSchema = exports.Ingredient = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
const nutritional_values_schema_1 = require("../shared/nutritional-values.schema");
const groups_model_1 = require("./groups.model");
const tax_groups_model_1 = require("../TenantModels/tax-groups.model");
const materials_model_1 = require("../inventoryModels/materials.model");
const branch_model_1 = require("../TenantModels/branch.model");
const priceTagApplies_model_1 = require("../TenantModels/priceTagApplies.model");
const additions_model_1 = require("./additions.model");
let Ingredient = class Ingredient {
};
exports.Ingredient = Ingredient;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Material', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Ingredient.prototype, "materialId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Ingredient.prototype, "quantity", void 0);
exports.Ingredient = Ingredient = __decorate([
    (0, mongoose_1.Schema)()
], Ingredient);
exports.IngredientSchema = mongoose_1.SchemaFactory.createForClass(Ingredient);
let CustomAddationsOptionsBranchPrice = class CustomAddationsOptionsBranchPrice {
};
exports.CustomAddationsOptionsBranchPrice = CustomAddationsOptionsBranchPrice;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Branch', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomAddationsOptionsBranchPrice.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], CustomAddationsOptionsBranchPrice.prototype, "price", void 0);
exports.CustomAddationsOptionsBranchPrice = CustomAddationsOptionsBranchPrice = __decorate([
    (0, mongoose_1.Schema)()
], CustomAddationsOptionsBranchPrice);
exports.CustomAddationsOptionsBranchPriceSchema = mongoose_1.SchemaFactory.createForClass(CustomAddationsOptionsBranchPrice);
let PriceTagApply = class PriceTagApply {
};
exports.PriceTagApply = PriceTagApply;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PriceTagApplies', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PriceTagApply.prototype, "priceTag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PriceTagApply.prototype, "price", void 0);
exports.PriceTagApply = PriceTagApply = __decorate([
    (0, mongoose_1.Schema)()
], PriceTagApply);
exports.PriceTagApplySchema = mongoose_1.SchemaFactory.createForClass(PriceTagApply);
let AdditionsOption = class AdditionsOption {
};
exports.AdditionsOption = AdditionsOption;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AdditionsOption.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AdditionsOption.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AdditionsOption.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AdditionsOption.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], AdditionsOption.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'TaxGroup' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AdditionsOption.prototype, "taxGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.CostCalculationMethod, required: true }),
    __metadata("design:type", String)
], AdditionsOption.prototype, "costCalculationMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'MenuGroup' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AdditionsOption.prototype, "menuGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Addition', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AdditionsOption.prototype, "addition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.IngredientSchema], default: [] }),
    __metadata("design:type", Array)
], AdditionsOption.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: type_1.OrderType, default: [] }),
    __metadata("design:type", Array)
], AdditionsOption.prototype, "orderTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], AdditionsOption.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Combo' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AdditionsOption.prototype, "comboException", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nutritional_values_schema_1.NutritionalValuesSchema }),
    __metadata("design:type", nutritional_values_schema_1.NutritionalValues)
], AdditionsOption.prototype, "nutritionalValues", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.CustomAddationsOptionsBranchPriceSchema], default: [] }),
    __metadata("design:type", Array)
], AdditionsOption.prototype, "CustomAddationsOptionsBranchPrices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], AdditionsOption.prototype, "inactiveBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], AdditionsOption.prototype, "outOfStockBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.PriceTagApplySchema], default: [] }),
    __metadata("design:type", Array)
], AdditionsOption.prototype, "priceTagApplies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], AdditionsOption.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], AdditionsOption.prototype, "isDeleted", void 0);
exports.AdditionsOption = AdditionsOption = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], AdditionsOption);
exports.AdditionsOptionSchema = mongoose_1.SchemaFactory.createForClass(AdditionsOption);
exports.ADDITIONS_OPTION_MODEL = 'AdditionsOption';
exports.AdditionsOptionModel = mongoose_1.MongooseModule.forFeature([
    { name: exports.ADDITIONS_OPTION_MODEL, schema: exports.AdditionsOptionSchema },
]);
const getAdditionsOptionModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in AdditionsOption model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    if (!connection.models['TaxGroup']) {
        connection.model('TaxGroup', tax_groups_model_1.TaxGroupSchema);
    }
    if (!connection.models['Material']) {
        connection.model('Material', materials_model_1.MaterialsSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    if (!connection.models['PriceTagApplies']) {
        connection.model('PriceTagApplies', priceTagApplies_model_1.PriceTagAppliesSchema);
    }
    if (!connection.models['MenuGroup']) {
        connection.model('MenuGroup', groups_model_1.MenuGroupSchema);
    }
    if (!connection.models['Addition']) {
        connection.model('Addition', additions_model_1.AdditionSchema);
    }
    if (!connection.models['Combo']) {
        connection.model('Combo', new mongoose_2.Schema({})); // Replace when Combo schema is ready
    }
    const model = connection.models[exports.ADDITIONS_OPTION_MODEL] || connection.model(exports.ADDITIONS_OPTION_MODEL, exports.AdditionsOptionSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getAdditionsOptionModel = getAdditionsOptionModel;
