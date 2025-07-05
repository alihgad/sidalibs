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
exports.getProductCategoriesModel = exports.additionsModel = exports.Product_CATEGORY_MODEL = exports.additionsSchema = exports.additions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let additions = class additions {
};
exports.additions = additions;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], additions.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], additions.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], additions.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], additions.prototype, "isDeleted", void 0);
exports.additions = additions = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], additions);
exports.additionsSchema = mongoose_1.SchemaFactory.createForClass(additions);
exports.Product_CATEGORY_MODEL = 'additions';
exports.additionsModel = mongoose_1.MongooseModule.forFeature([
    { name: additions.name, schema: exports.additionsSchema },
]);
const getProductCategoriesModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Product category model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['additions'] || connection.model('additions', exports.additionsSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getProductCategoriesModel = getProductCategoriesModel;
