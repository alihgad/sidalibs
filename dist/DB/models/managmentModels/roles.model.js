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
exports.getrolesModel = exports.rolesModel = exports.ROLES_MODEL = exports.rolesSchema = exports.roles = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const connection_manager_1 = require("../../connection.manager");
const DataBase_repository_1 = require("../../DataBase.repository");
const permission_model_1 = require("./permission.model");
let roles = class roles {
};
exports.roles = roles;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, maxlength: 50 }),
    __metadata("design:type", String)
], roles.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true, maxlength: 50 }),
    __metadata("design:type", String)
], roles.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, maxlength: 200 }),
    __metadata("design:type", String)
], roles.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true, ref: permission_model_1.permission.name }),
    __metadata("design:type", Array)
], roles.prototype, "permissions", void 0);
exports.roles = roles = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], roles);
exports.rolesSchema = mongoose_1.SchemaFactory.createForClass(roles);
exports.ROLES_MODEL = 'ROLES_MODEL';
exports.rolesModel = mongoose_1.MongooseModule.forFeature([
    { name: 'roles', schema: exports.rolesSchema },
]);
const getrolesModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in roles Model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['roles'] || connection.model('roles', exports.rolesSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getrolesModel = getrolesModel;
