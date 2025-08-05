"use strict";
// cashier-settings.schema.ts
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
exports.getCashierSettingsModel = exports.CashierSettingsModel = exports.CASHIER_SETTINGS_MODEL = exports.CashierSettingsSchema = exports.CashierSettings = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let CashierSettings = class CashierSettings {
};
exports.CashierSettings = CashierSettings;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], CashierSettings.prototype, "businessNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '50,100' }),
    __metadata("design:type", String)
], CashierSettings.prototype, "preApprovedPaymentAmounts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], CashierSettings.prototype, "paymentCurrencies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], CashierSettings.prototype, "predefinedTipPercentages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CashierSettings.prototype, "orderRaisingDelayMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 30 }),
    __metadata("design:type", Number)
], CashierSettings.prototype, "inactiveUserLogoutMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['limited', 'notAllowed', 'unlimited'], default: 'limited' }),
    __metadata("design:type", String)
], CashierSettings.prototype, "returnPeriodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1200 }),
    __metadata("design:type", Number)
], CashierSettings.prototype, "returnPeriodMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], CashierSettings.prototype, "requiredOrderTags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['none', 'round', 'floor', 'ceil'], default: 'none' }),
    __metadata("design:type", String)
], CashierSettings.prototype, "roundingMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "enableTips", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "discountsRequireCustomerInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "cancellationRequiresCustomerInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "tableSelectionRequiredForLocalOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "alwaysAskCancellationReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "autoSendOrderToKitchenAfterPayment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "autoSyncDataAtWorkdayStart", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "autoPrintProductReport", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "autoPrintLiabilitiesReport", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "preventEndDayBeforeInventoryCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "autoCloseSelfServiceOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "preventSellingOutOfStockProducts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "printPaymentReceiptForActiveOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "allowOpeningOneLiability", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CashierSettings.prototype, "requireCustomerInfoBeforeClosingOrder", void 0);
exports.CashierSettings = CashierSettings = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], CashierSettings);
exports.CashierSettingsSchema = mongoose_1.SchemaFactory.createForClass(CashierSettings);
exports.CASHIER_SETTINGS_MODEL = 'CASHIER_SETTINGS_MODEL';
exports.CashierSettingsModel = mongoose_1.MongooseModule.forFeature([{ name: 'CashierSettings', schema: exports.CashierSettingsSchema }]);
const getCashierSettingsModel = () => {
    let connection = connection_manager_1.ConnectionManager.getConnection("main");
    const model = connection.models['CashierSettings'] || connection.model('CashierSettings', exports.CashierSettingsSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getCashierSettingsModel = getCashierSettingsModel;
