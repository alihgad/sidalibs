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
exports.getChargesModel = exports.ChargesModel = exports.CHARGES_MODEL = exports.chargeschema = exports.Charges = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Charges = class Charges {
};
exports.Charges = Charges;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Charges.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Charges.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: type_1.ChargeType, required: true }),
    __metadata("design:type", String)
], Charges.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, required: true }),
    __metadata("design:type", Boolean)
], Charges.prototype, "isOpenValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: function () {
            return !this.isOpenValue;
        } }),
    __metadata("design:type", Number)
], Charges.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [type_1.OrderType], required: true }),
    __metadata("design:type", Array)
], Charges.prototype, "applyOnOrderTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'TaxGroup' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Charges.prototype, "taxGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Charges.prototype, "applyOnAllBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Branch', required: function () {
            return !this.applyOnAllBranches;
        } }),
    __metadata("design:type", Array)
], Charges.prototype, "applyOnBranches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Charges.prototype, "autoApply", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Charges.prototype, "withoutDiscounts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Charges.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Charges.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Charges.prototype, "deletedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Charges.prototype, "deletedAt", void 0);
exports.Charges = Charges = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'charges'
    })
], Charges);
exports.chargeschema = mongoose_1.SchemaFactory.createForClass(Charges);
// Indexes for better performance
exports.chargeschema.index({ name: 1 });
exports.chargeschema.index({ type: 1 });
exports.chargeschema.index({ isOpenValue: 1 });
exports.chargeschema.index({ applyOnOrderTypes: 1 });
exports.chargeschema.index({ taxGroup: 1 });
exports.chargeschema.index({ applyOnAllBranches: 1 });
exports.chargeschema.index({ applyOnBranches: 1 });
exports.chargeschema.index({ autoApply: 1 });
exports.chargeschema.index({ withoutDiscounts: 1 });
exports.chargeschema.index({ createdBy: 1 });
exports.chargeschema.index({ isDeleted: 1 });
exports.chargeschema.index({ deletedBy: 1 });
exports.chargeschema.index({ deletedAt: 1 });
exports.chargeschema.index({ createdAt: -1 });
exports.chargeschema.index({ updatedAt: -1 });
// Compound indexes
exports.chargeschema.index({ type: 1, isDeleted: 1 });
exports.chargeschema.index({ applyOnAllBranches: 1, isDeleted: 1 });
exports.chargeschema.index({ autoApply: 1, isDeleted: 1 });
exports.chargeschema.index({ createdBy: 1, isDeleted: 1 });
exports.chargeschema.index({ name: 1, isDeleted: 1 });
exports.CHARGES_MODEL = 'Charges';
exports.ChargesModel = mongoose_1.MongooseModule.forFeature([
    { name: exports.CHARGES_MODEL, schema: exports.chargeschema }
]);
const getChargesModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in charges model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['TaxGroup']) {
        const { TaxGroupSchema } = require('../TenantModels/tax-groups.model');
        connection.model('TaxGroup', TaxGroupSchema);
    }
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('./users.model');
        connection.model('User', UserSchema);
    }
    const model = connection.models[exports.CHARGES_MODEL] || connection.model(exports.CHARGES_MODEL, exports.chargeschema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getChargesModel = getChargesModel;
