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
exports.getReceiptFormModel = exports.ReceiptFormModel = exports.RECEIPT_FORM_MODEL = exports.ReceiptFormSchema = exports.ReceiptForm = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let ReceiptForm = class ReceiptForm {
};
exports.ReceiptForm = ReceiptForm;
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            public_id: { type: String },
            secure_url: { type: String },
        },
        required: false,
        default: null,
    }),
    __metadata("design:type", Object)
], ReceiptForm.prototype, "logoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: ['main', 'localized', "main & localized"], default: ["main & localized"] }),
    __metadata("design:type", Array)
], ReceiptForm.prototype, "printLanguages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['ar', 'en'], default: 'ar' }),
    __metadata("design:type", String)
], ReceiptForm.prototype, "primaryLanguage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['ar', 'en'], default: 'en' }),
    __metadata("design:type", String)
], ReceiptForm.prototype, "secondaryLanguage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ReceiptForm.prototype, "headerText", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ReceiptForm.prototype, "footerText", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ReceiptForm.prototype, "invoiceTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showOrderNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showCalories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showSubtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showRounding", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showClosedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showCreatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "showCheckNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "hideFreeModiferOptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ReceiptForm.prototype, "printCustomerPhoneNumberInPickupOrders", void 0);
exports.ReceiptForm = ReceiptForm = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'receipts'
    })
], ReceiptForm);
exports.ReceiptFormSchema = mongoose_1.SchemaFactory.createForClass(ReceiptForm);
exports.RECEIPT_FORM_MODEL = 'ReceiptForm';
exports.ReceiptFormModel = mongoose_1.MongooseModule.forFeature([
    { name: exports.RECEIPT_FORM_MODEL, schema: exports.ReceiptFormSchema }
]);
const getReceiptFormModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in receipt form model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['User']) {
        const { UserSchema } = require('./users.model');
        connection.model('User', UserSchema);
    }
    const model = connection.models[exports.RECEIPT_FORM_MODEL] || connection.model(exports.RECEIPT_FORM_MODEL, exports.ReceiptFormSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getReceiptFormModel = getReceiptFormModel;
