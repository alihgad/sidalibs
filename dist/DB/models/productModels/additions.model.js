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
exports.getAdditionsModel = exports.AdditionModel = exports.ADDITION_MODEL = exports.AdditionSchema = exports.Addition = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Addition = class Addition {
};
exports.Addition = Addition;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Addition.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Addition.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Addition.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Addition.prototype, "isDeleted", void 0);
exports.Addition = Addition = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Addition);
exports.AdditionSchema = mongoose_1.SchemaFactory.createForClass(Addition);
exports.ADDITION_MODEL = 'Addition';
exports.AdditionModel = mongoose_1.MongooseModule.forFeature([
    { name: Addition.name, schema: exports.AdditionSchema },
]);
const getAdditionsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Addition model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Addition'] || connection.model('Addition', exports.AdditionSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getAdditionsModel = getAdditionsModel;
