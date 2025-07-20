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
exports.getGiftCardsModel = exports.GiftCardModel = exports.GIFT_CARD_MODEL = exports.GiftCardSchema = exports.GiftCard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
const categories_model_1 = require("./categories.model");
const tags_model_1 = require("../TenantModels/tags.model");
const branch_model_1 = require("../TenantModels/branch.model");
const groups_model_1 = require("./groups.model");
let GiftCard = class GiftCard {
};
exports.GiftCard = GiftCard;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GiftCard.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], GiftCard.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], GiftCard.prototype, "referenceCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], GiftCard.prototype, "barcode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'MenuCategory', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GiftCard.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.PricingMethod), required: true }),
    __metadata("design:type", String)
], GiftCard.prototype, "pricingMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], GiftCard.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], GiftCard.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Tag', default: [] }),
    __metadata("design:type", Array)
], GiftCard.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Branch', default: [] }),
    __metadata("design:type", Array)
], GiftCard.prototype, "inactiveBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'MenuGroup', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GiftCard.prototype, "menuGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], GiftCard.prototype, "isDeleted", void 0);
exports.GiftCard = GiftCard = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], GiftCard);
exports.GiftCardSchema = mongoose_1.SchemaFactory.createForClass(GiftCard);
exports.GIFT_CARD_MODEL = 'GiftCard';
exports.GiftCardModel = mongoose_1.MongooseModule.forFeature([
    { name: GiftCard.name, schema: exports.GiftCardSchema },
]);
const getGiftCardsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in GiftCard model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models in connection
    if (!connection.models['MenuCategory']) {
        connection.model('MenuCategory', categories_model_1.MenuCategorySchema);
    }
    if (!connection.models['Tag']) {
        connection.model('Tag', tags_model_1.TagSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    if (!connection.models['MenuGroup']) {
        connection.model('MenuGroup', groups_model_1.MenuGroupSchema);
    }
    const model = connection.models['GiftCard'] || connection.model('GiftCard', exports.GiftCardSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getGiftCardsModel = getGiftCardsModel;
