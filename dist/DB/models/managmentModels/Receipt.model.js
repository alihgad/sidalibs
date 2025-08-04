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
exports.getReceiptModel = exports.ReceiptModel = exports.RECEIPT_MODEL = exports.ReceiptSchema = exports.Receipt = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Receipt = class Receipt {
};
exports.Receipt = Receipt;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Object)
], Receipt.prototype, "logoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: ['main', 'localized', "main & localized"], default: ["main & localized"] }),
    __metadata("design:type", Array)
], Receipt.prototype, "printLanguages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['ar', 'en'], default: 'ar' }),
    __metadata("design:type", String)
], Receipt.prototype, "primaryLanguage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['ar', 'en'], default: 'en' }),
    __metadata("design:type", String)
], Receipt.prototype, "secondaryLanguage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Receipt.prototype, "headerText", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Receipt.prototype, "footerText", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Receipt.prototype, "invoiceTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showOrderNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showCalories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showSubtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showRounding", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showClosedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showCreatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "showCheckNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "hideFreeModiferOptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "printCustomerPhoneNumberInPickupOrders", void 0);
exports.Receipt = Receipt = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'receipts'
    })
], Receipt);
exports.ReceiptSchema = mongoose_1.SchemaFactory.createForClass(Receipt);
exports.RECEIPT_MODEL = 'Receipt';
exports.ReceiptModel = mongoose_1.MongooseModule.forFeature([
    { name: exports.RECEIPT_MODEL, schema: exports.ReceiptSchema }
]);
const getReceiptModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in receipt model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['User']) {
        const { UserSchema } = require('./users.model');
        connection.model('User', UserSchema);
    }
    const model = connection.models[exports.RECEIPT_MODEL] || connection.model(exports.RECEIPT_MODEL, exports.ReceiptSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getReceiptModel = getReceiptModel;
