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
exports.getCountSheetModel = exports.CountSheetModel = exports.COUNT_SHEET_MODEL = exports.CountSheetSchema = exports.CountSheet = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let CountSheet = class CountSheet {
};
exports.CountSheet = CountSheet;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true }),
    __metadata("design:type", String)
], CountSheet.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], CountSheet.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CountSheet.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [{
                itemId: { type: String },
                itemName: { type: String },
                itemCode: { type: String },
                itemStorageUnit: { type: String },
                itemRecipeUnit: { type: String },
                isDeleted: { type: Boolean, default: false },
            }] }),
    __metadata("design:type", Array)
], CountSheet.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CountSheet.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], CountSheet.prototype, "deletedAt", void 0);
exports.CountSheet = CountSheet = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'countSheets'
    })
], CountSheet);
exports.CountSheetSchema = mongoose_1.SchemaFactory.createForClass(CountSheet);
// Indexes for better performance
exports.CountSheetSchema.index({ referenceNumber: 1 });
exports.CountSheetSchema.index({ name: 1 });
exports.CountSheetSchema.index({ secondaryName: 1 });
exports.CountSheetSchema.index({ isDeleted: 1 });
exports.CountSheetSchema.index({ createdAt: -1 });
// Compound index for unique reference number per business
exports.CountSheetSchema.index({ referenceNumber: 1, isDeleted: 1 }, { unique: true });
exports.COUNT_SHEET_MODEL = 'COUNT_SHEET_MODEL';
exports.CountSheetModel = mongoose_1.MongooseModule.forFeature([
    { name: 'CountSheet', schema: exports.CountSheetSchema }
]);
const getCountSheetModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in count sheet model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['CountSheet'] || connection.model('CountSheet', exports.CountSheetSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getCountSheetModel = getCountSheetModel;
