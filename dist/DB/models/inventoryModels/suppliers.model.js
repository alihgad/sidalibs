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
exports.getSuppliersModel = exports.SupplierModel = exports.SUPPLIER_MODEL = exports.SupplierSchema = exports.Supplier = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Supplier = class Supplier {
};
exports.Supplier = Supplier;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "companyName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, match: /^[A-Za-z0-9]+$/ }),
    __metadata("design:type", String)
], Supplier.prototype, "supplierCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "contactName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, mongoose_1.Prop)({ type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }),
    __metadata("design:type", String)
], Supplier.prototype, "primaryEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    (0, mongoose_1.Prop)({ type: String, required: false, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(,[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*$/ }),
    __metadata("design:type", String)
], Supplier.prototype, "secondaryEmails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Material' }] }),
    __metadata("design:type", Array)
], Supplier.prototype, "materials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isDeleted", void 0);
exports.Supplier = Supplier = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Supplier);
exports.SupplierSchema = mongoose_1.SchemaFactory.createForClass(Supplier);
exports.SUPPLIER_MODEL = 'Supplier';
exports.SupplierModel = mongoose_1.MongooseModule.forFeature([
    { name: Supplier.name, schema: exports.SupplierSchema },
]);
const getSuppliersModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in supplier model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Supplier'] || connection.model('Supplier', exports.SupplierSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getSuppliersModel = getSuppliersModel;
