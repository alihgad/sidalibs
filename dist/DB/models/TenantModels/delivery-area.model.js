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
exports.getDeliveryAreaModel = exports.DeliveryAreaModel = exports.DELIVERY_AREA_MODEL = exports.DeliveryAreaSchema = exports.DeliveryArea = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const branch_model_1 = require("./branch.model");
let DeliveryArea = class DeliveryArea {
};
exports.DeliveryArea = DeliveryArea;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryArea.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], DeliveryArea.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, unique: true }),
    __metadata("design:type", String)
], DeliveryArea.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }], required: false, default: [] }),
    __metadata("design:type", Array)
], DeliveryArea.prototype, "branches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DeliveryArea.prototype, "isDeleted", void 0);
exports.DeliveryArea = DeliveryArea = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], DeliveryArea);
exports.DeliveryAreaSchema = mongoose_1.SchemaFactory.createForClass(DeliveryArea);
exports.DELIVERY_AREA_MODEL = 'DeliveryArea';
exports.DeliveryAreaModel = mongoose_1.MongooseModule.forFeature([
    { name: DeliveryArea.name, schema: exports.DeliveryAreaSchema },
]);
const getDeliveryAreaModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in delivery area model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    if (!connection.models["Branch"]) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    const model = connection.models['DeliveryArea'] || connection.model('DeliveryArea', exports.DeliveryAreaSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getDeliveryAreaModel = getDeliveryAreaModel;
