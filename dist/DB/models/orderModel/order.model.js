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
exports.getOrderModel = exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const type_1 = require("../../../common/type");
const connection_manager_1 = require("../../connection.manager");
const DataBase_repository_1 = require("../../DataBase.repository");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Number)
], Order.prototype, "refranceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            branchId: { type: mongoose_2.Types.ObjectId, ref: 'Branch' },
            name: { type: String, required: true },
        }, trim: true
    }),
    __metadata("design:type", Object)
], Order.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Order.prototype, "orderType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Date)
], Order.prototype, "openedTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Date)
], Order.prototype, "closedTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Date)
], Order.prototype, "receivedTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Number)
], Order.prototype, "visitorsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "closedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", Number)
], Order.prototype, "checkNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            customerId: { type: mongoose_2.Types.ObjectId, ref: 'Customer' },
            name: { type: String },
            phone: { type: String },
            address: { type: String },
        }
    }),
    __metadata("design:type", Object)
], Order.prototype, "customer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.DeliveryStatus, default: type_1.DeliveryStatus.PENDING, trim: true }),
    __metadata("design:type", String)
], Order.prototype, "deliveryStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            driverName: String,
            driberPhoneNumber: String
        }
    }),
    __metadata("design:type", Object)
], Order.prototype, "deriver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Order.prototype, "subTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalFees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalTaxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "roundingAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "finalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: "tags" }),
    __metadata("design:type", Array)
], Order.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                productId: mongoose_2.Types.ObjectId,
                quantity: Number,
                price: Number,
                discount: Number,
                note: String,
                total: Number,
            }], ref: "products" }),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                taxId: mongoose_2.Types.ObjectId,
                taxName: String,
                taxValue: Number,
            }], ref: "taxes" }),
    __metadata("design:type", Array)
], Order.prototype, "taxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                name: String,
                value: Number,
                addedAt: Date,
                refundReferenceNumber: mongoose_2.Types.ObjectId
            }] }),
    __metadata("design:type", Array)
], Order.prototype, "payments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
const getOrderModel = (bussinessNumber) => {
    if (!bussinessNumber) {
        throw new Error("bussinessNumber is required in Order model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(bussinessNumber);
    const model = connection.models['Order'] || connection.model('Order', exports.OrderSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getOrderModel = getOrderModel;
