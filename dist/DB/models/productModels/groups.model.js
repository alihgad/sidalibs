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
exports.getProductGroupsModel = exports.ProductGroupModel = exports.Product_GROUP_MODEL = exports.ProductGroupSchema = exports.ProductGroup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let ProductGroup = class ProductGroup {
};
exports.ProductGroup = ProductGroup;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductGroup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], ProductGroup.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ProductGroup.prototype, "isDeleted", void 0);
exports.ProductGroup = ProductGroup = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], ProductGroup);
exports.ProductGroupSchema = mongoose_1.SchemaFactory.createForClass(ProductGroup);
exports.Product_GROUP_MODEL = 'ProductGroup';
exports.ProductGroupModel = mongoose_1.MongooseModule.forFeature([
    { name: ProductGroup.name, schema: exports.ProductGroupSchema },
]);
const getProductGroupsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Product category model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['ProductGroup'] || connection.model('ProductGroup', exports.ProductGroupSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getProductGroupsModel = getProductGroupsModel;
