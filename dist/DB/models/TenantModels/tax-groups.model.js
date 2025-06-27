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
exports.getTaxGroupModel = exports.TaxGroupModel = exports.TAX_GROUP_MODEL = exports.TaxGroupSchema = exports.TaxGroup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const taxes_model_1 = require("./taxes.model");
let TaxGroup = class TaxGroup {
};
exports.TaxGroup = TaxGroup;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TaxGroup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TaxGroup.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], TaxGroup.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Tax' }], required: true }),
    __metadata("design:type", Array)
], TaxGroup.prototype, "taxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TaxGroup.prototype, "isDeleted", void 0);
exports.TaxGroup = TaxGroup = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], TaxGroup);
exports.TaxGroupSchema = mongoose_1.SchemaFactory.createForClass(TaxGroup);
exports.TAX_GROUP_MODEL = 'TaxGroup';
exports.TaxGroupModel = mongoose_1.MongooseModule.forFeature([
    { name: TaxGroup.name, schema: exports.TaxGroupSchema },
]);
const getTaxGroupModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in tax group model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    if (!connection.models["Tax"]) {
        connection.model('Tax', taxes_model_1.TaxSchema);
    }
    const model = connection.models['TaxGroup'] || connection.model('TaxGroup', exports.TaxGroupSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTaxGroupModel = getTaxGroupModel;
