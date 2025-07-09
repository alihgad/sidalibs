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
exports.getTenantModel = exports.TenantModel = exports.TENANT_MODEL = exports.TenantSchema = exports.Tenant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const type_1 = require("../../../common/type");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Tenant = class Tenant {
};
exports.Tenant = Tenant;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 1, maxlength: 20 }),
    __metadata("design:type", String)
], Tenant.prototype, "ownerFirstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 1, maxlength: 20 }),
    __metadata("design:type", String)
], Tenant.prototype, "ownerLastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 1, maxlength: 20 }),
    __metadata("design:type", String)
], Tenant.prototype, "companyName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "businessNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "Email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Tenant.prototype, "countryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Tenant.prototype, "countryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "confirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "seconderyNameing", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "pricesWithVat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "specficSupplier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "Asia/Riyadh" }),
    __metadata("design:type", String)
], Tenant.prototype, "timeZone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Tenant.prototype, "branchesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            software: [{
                    type: { type: String, enum: Object.values(type_1.licencesEnum), required: true },
                    name: { type: String, required: true },
                    duration: { type: String, enum: Object.values(type_1.PlanDuration), required: true }
                }],
            hardware: [{
                    type: { type: String, enum: Object.values(type_1.ProductsTypeEnum), required: true },
                    quantity: { type: Number, required: true, min: 1 }
                }]
        },
        required: false,
    }),
    __metadata("design:type", Object)
], Tenant.prototype, "requestedItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "notConfirmed"
    }),
    __metadata("design:type", String)
], Tenant.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(type_1.PlanType),
        required: false,
    }),
    __metadata("design:type", String)
], Tenant.prototype, "plan", void 0);
exports.Tenant = Tenant = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Tenant);
exports.TenantSchema = mongoose_1.SchemaFactory.createForClass(Tenant);
exports.TENANT_MODEL = 'TENANT_MODEL';
exports.TenantModel = mongoose_1.MongooseModule.forFeature([
    { name: Tenant.name, schema: exports.TenantSchema },
]);
const getTenantModel = () => {
    let connection = connection_manager_1.ConnectionManager.getConnection("main");
    const model = connection.models['Tenant'] || connection.model('Tenant', exports.TenantSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTenantModel = getTenantModel;
