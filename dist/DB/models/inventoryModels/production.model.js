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
exports.getProductionModel = exports.ProductionModel = exports.PRODUCTION_MODEL = exports.ProductionSchema = exports.Production = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Production = class Production {
};
exports.Production = Production;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Production.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.ProductionStatus), default: type_1.ProductionStatus.PENDING }),
    __metadata("design:type", String)
], Production.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.ProductionType) }),
    __metadata("design:type", String)
], Production.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {
            branchId: { type: mongoose_2.Types.ObjectId, ref: 'branch' },
            branchName: { type: String }
        } }),
    __metadata("design:type", Object)
], Production.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {
            userId: { type: mongoose_2.Types.ObjectId, ref: 'user' },
            userName: { type: String }
        } }),
    __metadata("design:type", Object)
], Production.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {
            userId: { type: mongoose_2.Types.ObjectId, ref: 'user' },
            userName: { type: String }
        } }),
    __metadata("design:type", Object)
], Production.prototype, "sendBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Production.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Production.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Production.prototype, "sendAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Production.prototype, "totalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Production.prototype, "itemsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Materials' },
                materialName: String,
                code: Number,
                quantity: Number,
                cost: Number,
                finalCost: Number,
            }] }),
    __metadata("design:type", Array)
], Production.prototype, "materials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Materials' },
                materialName: String,
                materialCode: String,
                quantity: Number,
                unitCost: Number,
                totalCost: Number,
            }] }),
    __metadata("design:type", Object)
], Production.prototype, "consumingDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Production.prototype, "notes", void 0);
exports.Production = Production = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'production'
    })
], Production);
exports.ProductionSchema = mongoose_1.SchemaFactory.createForClass(Production);
exports.PRODUCTION_MODEL = 'PRODUCTION_MODEL';
exports.ProductionModel = mongoose_1.MongooseModule.forFeature([
    { name: 'Production', schema: exports.ProductionSchema }
]);
const getProductionModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in production model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Production'] || connection.model('Production', exports.ProductionSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getProductionModel = getProductionModel;
