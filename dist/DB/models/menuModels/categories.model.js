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
exports.getMenuCategoriesModel = exports.MenuCategoryModel = exports.Menu_CATEGORY_MODEL = exports.MenuCategorySchema = exports.MenuCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const groups_model_1 = require("./groups.model");
let MenuCategory = class MenuCategory {
};
exports.MenuCategory = MenuCategory;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MenuCategory.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], MenuCategory.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], MenuCategory.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], MenuCategory.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'MenuGroup', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MenuCategory.prototype, "menuGroup", void 0);
exports.MenuCategory = MenuCategory = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], MenuCategory);
exports.MenuCategorySchema = mongoose_1.SchemaFactory.createForClass(MenuCategory);
exports.Menu_CATEGORY_MODEL = 'MenuCategory';
exports.MenuCategoryModel = mongoose_1.MongooseModule.forFeature([
    { name: MenuCategory.name, schema: exports.MenuCategorySchema },
]);
const getMenuCategoriesModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Menu category model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['MenuCategory'] || connection.model('MenuCategory', exports.MenuCategorySchema);
    if (!connection.models['MenuGroup']) {
        connection.model('MenuGroup', groups_model_1.MenuGroupSchema);
    }
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getMenuCategoriesModel = getMenuCategoriesModel;
