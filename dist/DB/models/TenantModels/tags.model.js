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
exports.getTagModel = exports.TagModel = exports.TAG_MODEL = exports.TagSchema = exports.Tag = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Tag = class Tag {
};
exports.Tag = Tag;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(type_1.TagType), required: true }),
    __metadata("design:type", String)
], Tag.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tag.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Tag.prototype, "isDeleted", void 0);
exports.Tag = Tag = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Tag);
exports.TagSchema = mongoose_1.SchemaFactory.createForClass(Tag);
exports.TAG_MODEL = 'Tag';
exports.TagModel = mongoose_1.MongooseModule.forFeature([
    { name: Tag.name, schema: exports.TagSchema },
]);
const getTagModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in tag model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Tag'] || connection.model('Tag', exports.TagSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTagModel = getTagModel;
