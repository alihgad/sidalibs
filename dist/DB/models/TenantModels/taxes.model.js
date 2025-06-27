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
exports.getTaxModel = exports.TaxModel = exports.TAX_MODEL = exports.TaxSchema = exports.Tax = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Tax = class Tax {
};
exports.Tax = Tax;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tax.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tax.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Tax.prototype, "percentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: Object.values(type_1.OrderType), required: true }),
    __metadata("design:type", Array)
], Tax.prototype, "appliesTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Tax.prototype, "isDeleted", void 0);
exports.Tax = Tax = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Tax);
exports.TaxSchema = mongoose_1.SchemaFactory.createForClass(Tax);
exports.TAX_MODEL = 'Tax';
exports.TaxModel = mongoose_1.MongooseModule.forFeature([
    { name: Tax.name, schema: exports.TaxSchema },
]);
const getTaxModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in tax model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Tax'] || connection.model('Tax', exports.TaxSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTaxModel = getTaxModel;
