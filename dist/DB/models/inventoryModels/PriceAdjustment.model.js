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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceAdjustmentCollection = exports.getPriceAdjustmentModel = exports.PriceAdjustmentModel = exports.PRICE_ADJUSTMENT_MODEL = exports.PriceAdjustmentSchema = exports.PriceAdjustment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let PriceAdjustment = class PriceAdjustment {
};
exports.PriceAdjustment = PriceAdjustment;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PriceAdjustment.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PriceAdjustment.prototype, "branch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'Reason' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PriceAdjustment.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PriceAdjustment.prototype, "workDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PriceAdjustment.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PriceAdjustment.prototype, "sendBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PriceAdjustment.prototype, "sendAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PriceAdjustment.prototype, "productsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], PriceAdjustment.prototype, "isSent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                materialId: { type: mongoose_2.Types.ObjectId, ref: 'Material' },
                name: { type: String },
                oldPrice: { type: Number },
                newPrice: { type: Number },
                code: { type: String },
                storageUnit: { type: String }
            }] }),
    __metadata("design:type", Array)
], PriceAdjustment.prototype, "materials", void 0);
exports.PriceAdjustment = PriceAdjustment = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'priceAdjustment'
    })
], PriceAdjustment);
exports.PriceAdjustmentSchema = mongoose_1.SchemaFactory.createForClass(PriceAdjustment);
// Indexes for better performance
exports.PriceAdjustmentSchema.index({ referenceNumber: 1 });
exports.PriceAdjustmentSchema.index({ branch: 1 });
exports.PriceAdjustmentSchema.index({ reason: 1 });
exports.PriceAdjustmentSchema.index({ createdBy: 1 });
exports.PriceAdjustmentSchema.index({ workDate: -1 });
exports.PriceAdjustmentSchema.index({ isSent: 1 });
exports.PriceAdjustmentSchema.index({ createdAt: -1 });
exports.PRICE_ADJUSTMENT_MODEL = 'PRICE_ADJUSTMENT_MODEL';
exports.PriceAdjustmentModel = mongoose_1.MongooseModule.forFeature([
    { name: 'PriceAdjustment', schema: exports.PriceAdjustmentSchema }
]);
const getPriceAdjustmentModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in price adjustment model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['User']) {
        const { UserSchema } = require('../userModels/users.model');
        connection.model('User', UserSchema);
    }
    if (!connection.models['Material']) {
        const { MaterialsSchema } = require('./materials.model');
        connection.model('Material', MaterialsSchema);
    }
    if (!connection.models['Reason']) {
        const { ReasonSchema } = require('../TenantModels/reason.model');
        connection.model('Reason', ReasonSchema);
    }
    const model = connection.models['PriceAdjustment'] || connection.model('PriceAdjustment', exports.PriceAdjustmentSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getPriceAdjustmentModel = getPriceAdjustmentModel;
const getPriceAdjustmentCollection = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in price adjustment model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const collection = connection.collection('priceAdjustment');
    return collection;
};
exports.getPriceAdjustmentCollection = getPriceAdjustmentCollection;
