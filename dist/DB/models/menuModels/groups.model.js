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
exports.getMenuGroupsModel = exports.MenuGroupModel = exports.MENU_GROUP_MODEL = exports.MenuGroupSchema = exports.MenuGroup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let MenuGroup = class MenuGroup {
};
exports.MenuGroup = MenuGroup;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MenuGroup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], MenuGroup.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'MenuGroup' }], default: [] }),
    __metadata("design:type", Array)
], MenuGroup.prototype, "subGroups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], MenuGroup.prototype, "isDeleted", void 0);
exports.MenuGroup = MenuGroup = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], MenuGroup);
exports.MenuGroupSchema = mongoose_1.SchemaFactory.createForClass(MenuGroup);
exports.MENU_GROUP_MODEL = 'MenuGroup';
exports.MenuGroupModel = mongoose_1.MongooseModule.forFeature([
    { name: MenuGroup.name, schema: exports.MenuGroupSchema },
]);
const getMenuGroupsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Menu group model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['MenuGroup'] || connection.model('MenuGroup', exports.MenuGroupSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getMenuGroupsModel = getMenuGroupsModel;
