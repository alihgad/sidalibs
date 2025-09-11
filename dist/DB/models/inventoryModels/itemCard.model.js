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
exports.getmaterialCardModel = exports.materialCardModel = exports.material_CARD_MODEL = exports.materialCardSchema = exports.materialCard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let materialCard = class materialCard {
    constructor(materialId, price, closeDate, inputs, outputs, startPrice, oldInputs, oldOutputs) {
        this.materialId = materialId;
        this.price = price;
        this.closeDate = closeDate;
        this.inputs = inputs;
        this.outputs = outputs;
        this.startPrice = startPrice;
        this.oldInputs = oldInputs;
        this.oldOutputs = oldOutputs;
    }
};
exports.materialCard = materialCard;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Materials" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], materialCard.prototype, "materialId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], materialCard.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], materialCard.prototype, "closeDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [] }),
    __metadata("design:type", Array)
], materialCard.prototype, "inputs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [] }),
    __metadata("design:type", Array)
], materialCard.prototype, "outputs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [] }),
    __metadata("design:type", Array)
], materialCard.prototype, "oldInputs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [] }),
    __metadata("design:type", Array)
], materialCard.prototype, "oldOutputs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], materialCard.prototype, "startPrice", void 0);
exports.materialCard = materialCard = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }),
    __metadata("design:paramtypes", [mongoose_2.Types.ObjectId, Number, Date, Array, Array, Number, Array, Array])
], materialCard);
exports.materialCardSchema = mongoose_1.SchemaFactory.createForClass(materialCard);
exports.material_CARD_MODEL = 'material_CARD_MODEL';
exports.materialCardModel = mongoose_1.MongooseModule.forFeature([
    { name: 'materialCard', schema: exports.materialCardSchema }
]);
const getmaterialCardModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in material card model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['materialCard'] || connection.model('materialCard', exports.materialCardSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getmaterialCardModel = getmaterialCardModel;
