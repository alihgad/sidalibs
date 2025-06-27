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
exports.getpermissionModel = exports.permissionModel = exports.permission_MODEL = exports.permissionSchema = exports.permission = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const connection_manager_1 = require("../../connection.manager");
const DataBase_repository_1 = require("../../DataBase.repository");
let permission = class permission {
};
exports.permission = permission;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], permission.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], permission.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], permission.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], permission.prototype, "category", void 0);
exports.permission = permission = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        versionKey: false
    })
], permission);
exports.permissionSchema = mongoose_1.SchemaFactory.createForClass(permission);
exports.permission_MODEL = 'PERMISSION_MODEL';
exports.permissionModel = mongoose_1.MongooseModule.forFeature([
    { name: permission.name, schema: exports.permissionSchema },
]);
const getpermissionModel = () => {
    let connection = connection_manager_1.ConnectionManager.getConnection("main");
    const model = connection.models['permission'] || connection.model('permission', exports.permissionSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getpermissionModel = getpermissionModel;
