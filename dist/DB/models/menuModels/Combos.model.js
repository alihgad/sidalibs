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
exports.getCombosModel = exports.CombosModel = exports.COMBO_MODEL = exports.CombosSchema = exports.Combos = exports.CustomBranchPrice = exports.ComboGroup = exports.ComboOption = exports.OptionPrice = exports.ComboSize = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
// Schema for combo sizes
let ComboSize = class ComboSize {
};
exports.ComboSize = ComboSize;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ComboSize.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ComboSize.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ComboSize.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ComboSize.prototype, "isDefault", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ComboSize.prototype, "isAvailable", void 0);
exports.ComboSize = ComboSize = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ComboSize);
// Schema for option prices by size
let OptionPrice = class OptionPrice {
};
exports.OptionPrice = OptionPrice;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OptionPrice.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OptionPrice.prototype, "price", void 0);
exports.OptionPrice = OptionPrice = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], OptionPrice);
// Schema for combo options within groups
let ComboOption = class ComboOption {
};
exports.ComboOption = ComboOption;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ComboOption.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ComboOption.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'Products' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ComboOption.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)([OptionPrice]),
    __metadata("design:type", Array)
], ComboOption.prototype, "prices", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ComboOption.prototype, "isDefault", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ComboOption.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ComboOption.prototype, "order", void 0);
exports.ComboOption = ComboOption = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ComboOption);
// Schema for combo groups
let ComboGroup = class ComboGroup {
};
exports.ComboGroup = ComboGroup;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ComboGroup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ComboGroup.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ComboGroup.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ComboGroup.prototype, "isRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], ComboGroup.prototype, "maxSelections", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], ComboGroup.prototype, "minSelections", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ComboGroup.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)([ComboOption]),
    __metadata("design:type", Array)
], ComboGroup.prototype, "options", void 0);
exports.ComboGroup = ComboGroup = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ComboGroup);
// Schema for custom branch prices
let CustomBranchPrice = class CustomBranchPrice {
};
exports.CustomBranchPrice = CustomBranchPrice;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CustomBranchPrice.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            size: { type: String, required: true },
            group: { type: String, required: true },
            price: { type: Number, required: true }
        }]),
    __metadata("design:type", Array)
], CustomBranchPrice.prototype, "prices", void 0);
exports.CustomBranchPrice = CustomBranchPrice = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], CustomBranchPrice);
let Combos = class Combos {
};
exports.Combos = Combos;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Combos.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Combos.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'MenuCategories' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Combos.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Combos.prototype, "referenceCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Combos.prototype, "barcode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Combos.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Combos.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Combos.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Combos.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Tags' }]),
    __metadata("design:type", Array)
], Combos.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Branches' }]),
    __metadata("design:type", Array)
], Combos.prototype, "inactiveBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)([CustomBranchPrice]),
    __metadata("design:type", Array)
], Combos.prototype, "customBranchPrices", void 0);
__decorate([
    (0, mongoose_1.Prop)([ComboSize]),
    __metadata("design:type", Array)
], Combos.prototype, "sizes", void 0);
__decorate([
    (0, mongoose_1.Prop)([ComboGroup]),
    __metadata("design:type", Array)
], Combos.prototype, "groups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Combos.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Combos.prototype, "updatedBy", void 0);
exports.Combos = Combos = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Combos);
exports.CombosSchema = mongoose_1.SchemaFactory.createForClass(Combos);
exports.COMBO_MODEL = 'Combos';
exports.CombosModel = mongoose_1.MongooseModule.forFeature([
    { name: Combos.name, schema: exports.CombosSchema },
]);
const getCombosModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Combos model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Combos'] || connection.model('Combos', exports.CombosSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getCombosModel = getCombosModel;
