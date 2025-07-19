"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuantityAdjustmentModel = exports.QuantityAdjustmentModel = exports.QUANTITY_ADJUSTMENT_MODEL = exports.QuantityAdjustmentSchema = exports.QuantityAdjustment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let QuantityAdjustment = class QuantityAdjustment {
};
exports.QuantityAdjustment = QuantityAdjustment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'Branch' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], QuantityAdjustment.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'reason' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], QuantityAdjustment.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], QuantityAdjustment.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], QuantityAdjustment.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], QuantityAdjustment.prototype, "sendBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], QuantityAdjustment.prototype, "sendAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], QuantityAdjustment.prototype, "productsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Material' },
                quantity: { type: Number },
                code: { type: String },
                price: { type: Number },
                total: { type: Number },
            }] }),
    __metadata("design:type", Array)
], QuantityAdjustment.prototype, "materials", void 0);
exports.QuantityAdjustment = QuantityAdjustment = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'quantityAdjustment'
    })
], QuantityAdjustment);
exports.QuantityAdjustmentSchema = mongoose_1.SchemaFactory.createForClass(QuantityAdjustment);
exports.QUANTITY_ADJUSTMENT_MODEL = 'QUANTITY_ADJUSTMENT_MODEL';
exports.QuantityAdjustmentModel = mongoose_1.MongooseModule.forFeature([
    { name: 'QuantityAdjustment', schema: exports.QuantityAdjustmentSchema }
]);
const getQuantityAdjustmentModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in quantity adjustment model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['QuantityAdjustment'] || connection.model('QuantityAdjustment', exports.QuantityAdjustmentSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getQuantityAdjustmentModel = getQuantityAdjustmentModel;
