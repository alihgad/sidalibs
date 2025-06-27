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
exports.getPaymentMethodModel = exports.PaymentMethodModel = exports.PAYMENT_METHOD_MODEL = exports.PaymentMethodSchema = exports.PaymentMethod = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let PaymentMethod = class PaymentMethod {
};
exports.PaymentMethod = PaymentMethod;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.PaymentMethodType), required: true }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PaymentMethod.prototype, "autoOpenDrawer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], PaymentMethod.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PaymentMethod.prototype, "isDeleted", void 0);
exports.PaymentMethod = PaymentMethod = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], PaymentMethod);
exports.PaymentMethodSchema = mongoose_1.SchemaFactory.createForClass(PaymentMethod);
exports.PAYMENT_METHOD_MODEL = 'PaymentMethod';
exports.PaymentMethodModel = mongoose_1.MongooseModule.forFeature([
    { name: PaymentMethod.name, schema: exports.PaymentMethodSchema },
]);
const getPaymentMethodModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in payment method model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['PaymentMethod'] || connection.model('PaymentMethod', exports.PaymentMethodSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPaymentMethodModel = getPaymentMethodModel;
