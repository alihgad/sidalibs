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
exports.getPriceTagAppliesModel = exports.PriceTagAppliesModel = exports.PRICE_TAG_APPLIES_MODEL = exports.PriceTagAppliesSchema = exports.PriceTagApplies = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const tags_model_1 = require("./tags.model");
const branch_model_1 = require("./branch.model");
let PriceTagApplies = class PriceTagApplies {
};
exports.PriceTagApplies = PriceTagApplies;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PriceTagApplies.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PriceTagApplies.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Tag', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PriceTagApplies.prototype, "orderTag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PriceTagApplies.prototype, "autoApplyToNewBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], default: [] }),
    __metadata("design:type", Array)
], PriceTagApplies.prototype, "specificBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PriceTagApplies.prototype, "isDeleted", void 0);
exports.PriceTagApplies = PriceTagApplies = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], PriceTagApplies);
exports.PriceTagAppliesSchema = mongoose_1.SchemaFactory.createForClass(PriceTagApplies);
exports.PRICE_TAG_APPLIES_MODEL = 'PriceTagApplies';
exports.PriceTagAppliesModel = mongoose_1.MongooseModule.forFeature([
    { name: PriceTagApplies.name, schema: exports.PriceTagAppliesSchema },
]);
const getPriceTagAppliesModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in price tag applies model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // تسجيل الـ models المطلوبة للـ refs
    if (!connection.models['Tag']) {
        connection.model('Tag', tags_model_1.TagSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    const model = connection.models['PriceTagApplies'] || connection.model('PriceTagApplies', exports.PriceTagAppliesSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPriceTagAppliesModel = getPriceTagAppliesModel;
