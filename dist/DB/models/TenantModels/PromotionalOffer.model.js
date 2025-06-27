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
exports.getPromotionalOfferModel = exports.PromotionalOfferModel = exports.PROMOTIONAL_OFFER_MODEL = exports.PromotionalOfferSchema = exports.PromotionalOffer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const branch_model_1 = require("./branch.model");
const type_1 = require("../../../common/type");
let PromotionalOffer = class PromotionalOffer {
};
exports.PromotionalOffer = PromotionalOffer;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PromotionalOffer.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PromotionalOffer.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], PromotionalOffer.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], PromotionalOffer.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PromotionalOffer.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PromotionalOffer.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: type_1.DaysOfWeek, required: true }),
    __metadata("design:type", Array)
], PromotionalOffer.prototype, "applicableDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: type_1.OrderType, required: true }),
    __metadata("design:type", Array)
], PromotionalOffer.prototype, "orderType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    __metadata("design:type", Number)
], PromotionalOffer.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PromotionalOffer.prototype, "includeAddons", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: type_1.PromotionType, required: true }),
    __metadata("design:type", Array)
], PromotionalOffer.prototype, "promotionType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], required: true }),
    __metadata("design:type", Array)
], PromotionalOffer.prototype, "branches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], PromotionalOffer.prototype, "isActive", void 0);
exports.PromotionalOffer = PromotionalOffer = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], PromotionalOffer);
exports.PromotionalOfferSchema = mongoose_1.SchemaFactory.createForClass(PromotionalOffer);
exports.PROMOTIONAL_OFFER_MODEL = 'PromotionalOffer';
exports.PromotionalOfferModel = mongoose_1.MongooseModule.forFeature([
    { name: PromotionalOffer.name, schema: exports.PromotionalOfferSchema },
]);
const getPromotionalOfferModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in promotional offer model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Check if Branch model is already registered
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    const model = connection.models['PromotionalOffer'] || connection.model('PromotionalOffer', exports.PromotionalOfferSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPromotionalOfferModel = getPromotionalOfferModel;
