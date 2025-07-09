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
exports.getProductModel = exports.ProductModel = exports.PRODUCT_MODEL = exports.ProductSchema = exports.Product = exports.NutritionalValuesSchema = exports.NutritionalValues = exports.CustomBranchPriceSchema = exports.CustomBranchPrice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
const categories_model_1 = require("./categories.model");
const tax_groups_model_1 = require("../TenantModels/tax-groups.model");
const tags_model_1 = require("../TenantModels/tags.model");
const materials_model_1 = require("../inventoryModels/materials.model");
const branch_model_1 = require("../TenantModels/branch.model");
const priceTagApplies_model_1 = require("../TenantModels/priceTagApplies.model");
const additions_model_1 = require("./additions.model");
// Custom Branch Price Schema
let CustomBranchPrice = class CustomBranchPrice {
};
exports.CustomBranchPrice = CustomBranchPrice;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Branch', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomBranchPrice.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], CustomBranchPrice.prototype, "price", void 0);
exports.CustomBranchPrice = CustomBranchPrice = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], CustomBranchPrice);
exports.CustomBranchPriceSchema = mongoose_1.SchemaFactory.createForClass(CustomBranchPrice);
// Nutritional Values Schema
let NutritionalValues = class NutritionalValues {
};
exports.NutritionalValues = NutritionalValues;
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], NutritionalValues.prototype, "servingSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.ServingUnit, default: type_1.ServingUnit.SERVING }),
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
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Product.prototype, "secondaryDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'ProductCategory', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isRetailProduct", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "referenceCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.PricingMethod, required: true }),
    __metadata("design:type", String)
], Product.prototype, "pricingMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: function () {
            return this.pricingMethod === type_1.PricingMethod.FIXED;
        } }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'TaxGroup', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "taxGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.CostCalculationMethod, required: true }),
    __metadata("design:type", String)
], Product.prototype, "costCalculationMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: function () {
            return this.costCalculationMethod === type_1.CostCalculationMethod.FIXED || this.pricingMethod === type_1.PricingMethod.FIXED;
        } }),
    __metadata("design:type", Number)
], Product.prototype, "cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.SaleMethod, required: true }),
    __metadata("design:type", String)
], Product.prototype, "saleMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Tag' }], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Addition' }], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "additions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Material' }], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.CustomBranchPriceSchema], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "customBranchPrices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "inactiveBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "outOfStockBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'PriceTagApplies' }], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "priceTagApplies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 5, min: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "walkTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.NutritionalValuesSchema, required: false }),
    __metadata("design:type", NutritionalValues)
], Product.prototype, "nutritionalValues", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "containsHighSalt", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.PRODUCT_MODEL = 'Product';
exports.ProductModel = mongoose_1.MongooseModule.forFeature([
    { name: Product.name, schema: exports.ProductSchema },
]);
const getProductModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Product model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register all dependent models if not already registered
    if (!connection.models['ProductCategory']) {
        connection.model('ProductCategory', categories_model_1.ProductCategorySchema);
    }
    if (!connection.models['TaxGroup']) {
        connection.model('TaxGroup', tax_groups_model_1.TaxGroupSchema);
    }
    if (!connection.models['Tag']) {
        connection.model('Tag', tags_model_1.TagSchema);
    }
    if (!connection.models['Material']) {
        connection.model('Material', materials_model_1.materialsSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    if (!connection.models['PriceTagApplies']) {
        connection.model('PriceTagApplies', priceTagApplies_model_1.PriceTagAppliesSchema);
    }
    if (!connection.models['Addition']) {
        connection.model('Addition', additions_model_1.AdditionSchema);
    }
    const model = connection.models['Product'] || connection.model('Product', exports.ProductSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getProductModel = getProductModel;
