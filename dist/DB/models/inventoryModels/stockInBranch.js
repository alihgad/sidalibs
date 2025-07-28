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
exports.getStockInBranchModel = exports.StockInBranchModel = exports.STOCK_IN_BRANCH_MODEL = exports.StockInBranchSchema = exports.StockInBranch = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let StockInBranch = class StockInBranch {
};
exports.StockInBranch = StockInBranch;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Branch ', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StockInBranch.prototype, "branchId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Warehouse ', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StockInBranch.prototype, "warehouseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Materials', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StockInBranch.prototype, "materialId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], StockInBranch.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], StockInBranch.prototype, "price", void 0);
exports.StockInBranch = StockInBranch = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'stockInBranch'
    })
], StockInBranch);
exports.StockInBranchSchema = mongoose_1.SchemaFactory.createForClass(StockInBranch);
// Compound index for unique branch-material combination
exports.StockInBranchSchema.index({ branchId: 1, materialId: 1 }, { unique: true });
// Indexes for better performance
exports.StockInBranchSchema.index({ branchId: 1 });
exports.StockInBranchSchema.index({ materialId: 1 });
exports.StockInBranchSchema.index({ quantity: 1 });
exports.StockInBranchSchema.index({ createdAt: -1 });
exports.STOCK_IN_BRANCH_MODEL = 'STOCK_IN_BRANCH_MODEL';
exports.StockInBranchModel = mongoose_1.MongooseModule.forFeature([
    { name: 'StockInBranch', schema: exports.StockInBranchSchema }
]);
const getStockInBranchModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in stock in branch model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Branch']) {
        const { BranchSchema } = require('../TenantModels/branch.model');
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['Material']) {
        const { MaterialSchema } = require('./materials.model');
        connection.model('Material', MaterialSchema);
    }
    const model = connection.models['StockInBranch'] || connection.model('StockInBranch', exports.StockInBranchSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getStockInBranchModel = getStockInBranchModel;
