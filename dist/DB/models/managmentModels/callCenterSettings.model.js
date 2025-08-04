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
exports.getCallCenterSettingsModel = exports.CallCenterSettingsSchema = exports.CallCenterSettings = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let CallCenterSettings = class CallCenterSettings {
};
exports.CallCenterSettings = CallCenterSettings;
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'User' }),
    __metadata("design:type", Array)
], CallCenterSettings.prototype, "agents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: "PaymentMethod", default: [] }),
    __metadata("design:type", Array)
], CallCenterSettings.prototype, "acceptedPaymentModes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Branch', default: [] }),
    __metadata("design:type", Array)
], CallCenterSettings.prototype, "inactiveBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Group', default: [] }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CallCenterSettings.prototype, "menuGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], enum: Object.values(type_1.OrderType) }),
    __metadata("design:type", Array)
], CallCenterSettings.prototype, "inactiveOrderTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CallCenterSettings.prototype, "allowDiscounts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CallCenterSettings.prototype, "allowEditingOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CallCenterSettings.prototype, "allowVoidingActiveOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CallCenterSettings.prototype, "allowAgentsToReadAllCCOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CallCenterSettings.prototype, "allowAgentsToReadAllOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CallCenterSettings.prototype, "allowPriceTags", void 0);
exports.CallCenterSettings = CallCenterSettings = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'CallCenterSettings'
    })
], CallCenterSettings);
exports.CallCenterSettingsSchema = mongoose_1.SchemaFactory.createForClass(CallCenterSettings);
const getCallCenterSettingsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in call center settings model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['CallCenterSettings'] || connection.model('CallCenterSettings', exports.CallCenterSettingsSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getCallCenterSettingsModel = getCallCenterSettingsModel;
