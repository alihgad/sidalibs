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
exports.getReasonModel = exports.ReasonModel = exports.REASON_MODEL = exports.ReasonSchema = exports.Reason = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Reason = class Reason {
};
exports.Reason = Reason;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Reason.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Reason.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: type_1.ReasonType }),
    __metadata("design:type", String)
], Reason.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Reason.prototype, "isDeleted", void 0);
exports.Reason = Reason = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Reason);
exports.ReasonSchema = mongoose_1.SchemaFactory.createForClass(Reason);
exports.REASON_MODEL = 'Reason';
exports.ReasonModel = mongoose_1.MongooseModule.forFeature([
    { name: Reason.name, schema: exports.ReasonSchema },
]);
const getReasonModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in reason model");
    }
    const connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Reason'] || connection.model('Reason', exports.ReasonSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getReasonModel = getReasonModel;
