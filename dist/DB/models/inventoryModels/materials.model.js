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
exports.getMaterialsModel = exports.MaterialsModel = exports.MATERIALS_MODEL = exports.MaterialsSchema = exports.Materials = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const type_1 = require("../../../common/type");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
let Materials = class Materials {
};
exports.Materials = Materials;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 50 }),
    __metadata("design:type", String)
], Materials.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, maxlength: 50 }),
    __metadata("design:type", String)
], Materials.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, index: true }),
    __metadata("design:type", String)
], Materials.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Materials.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Materials.prototype, "storageUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Materials.prototype, "recipeUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Materials.prototype, "conversionFactor", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(type_1.CostCalculationMethod),
        required: true
    }),
    __metadata("design:type", String)
], Materials.prototype, "costCalculationMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Materials.prototype, "cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Materials.prototype, "reorderLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Materials.prototype, "barcode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Materials.prototype, "minLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Materials.prototype, "maxLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Supplier', required: false }),
    __metadata("design:type", Array)
], Materials.prototype, "suppliers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Tag', required: false }),
    __metadata("design:type", Array)
], Materials.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'Material', required: false }),
    __metadata("design:type", Array)
], Materials.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Materials.prototype, "isDeleted", void 0);
exports.Materials = Materials = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'materials'
    })
], Materials);
exports.MaterialsSchema = mongoose_1.SchemaFactory.createForClass(Materials);
// Indexes for better performance
exports.MaterialsSchema.index({ name: 1 });
exports.MaterialsSchema.index({ category: 1 });
exports.MaterialsSchema.index({ barcode: 1 });
exports.MaterialsSchema.index({ isDeleted: 1 });
exports.MaterialsSchema.index({ createdAt: -1 });
exports.MATERIALS_MODEL = 'MATERIALS_MODEL';
exports.MaterialsModel = mongoose_1.MongooseModule.forFeature([
    { name: 'Materials', schema: exports.MaterialsSchema }
]);
const getMaterialsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in materials model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['Tag']) {
        const { TagSchema } = require('../TenantModels/tags.model');
        connection.model('Tag', TagSchema);
    }
    if (!connection.models['Supplier']) {
        const { supplierSchema } = require('./supplier.model');
        connection.model('Supplier', supplierSchema);
    }
    const model = connection.models['Materials'] || connection.model('Materials', exports.MaterialsSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getMaterialsModel = getMaterialsModel;
