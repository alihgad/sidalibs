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
exports.getPaymentModel = exports.PaymentSchema = exports.paymentModel = exports.payment_MODEL = exports.paymentSchema = exports.Payment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Payment = class Payment {
};
exports.Payment = Payment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Payment.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['subscription', 'purchase', 'other'], default: 'subscription' }),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'completed', enum: ['completed', 'failed', 'pending'] }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Payment.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Payment.prototype, "paidAt", void 0);
exports.Payment = Payment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Payment);
exports.paymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
exports.payment_MODEL = 'payment_MODEL';
exports.paymentModel = mongoose_1.MongooseModule.forFeature([
    { name: Payment.name, schema: exports.paymentSchema },
]);
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
const getPaymentModel = () => {
    let connection = connection_manager_1.ConnectionManager.getConnection("main");
    const model = connection.models['payment'] || connection.model('payment', exports.paymentSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPaymentModel = getPaymentModel;
