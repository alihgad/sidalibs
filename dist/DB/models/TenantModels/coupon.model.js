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
exports.getCouponModel = exports.CouponModel = exports.COUPON_MODEL = exports.CouponSchema = exports.Coupon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const discounts_model_1 = require("./discounts.model");
let Coupon = class Coupon {
};
exports.Coupon = Coupon;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Coupon.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Discount', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Coupon.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "maxUsage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Coupon.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Coupon.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isActive", void 0);
exports.Coupon = Coupon = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Coupon);
exports.CouponSchema = mongoose_1.SchemaFactory.createForClass(Coupon);
exports.COUPON_MODEL = 'Coupon';
exports.CouponModel = mongoose_1.MongooseModule.forFeature([
    { name: Coupon.name, schema: exports.CouponSchema },
]);
const getCouponModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in coupon model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    if (!connection.models["Discount"]) {
        connection.model('Discount', discounts_model_1.DiscountSchema);
    }
    const model = connection.models['Coupon'] || connection.model('Coupon', exports.CouponSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getCouponModel = getCouponModel;
