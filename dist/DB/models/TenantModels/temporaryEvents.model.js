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
exports.getTemporaryEventModel = exports.TemporaryEventModel = exports.TEMPORARY_EVENT_MODEL = exports.TemporaryEventSchema = exports.TemporaryEvent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
const branch_model_1 = require("./branch.model");
let TemporaryEvent = class TemporaryEvent {
};
exports.TemporaryEvent = TemporaryEvent;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TemporaryEvent.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TemporaryEvent.prototype, "secondaryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.TemporaryEventType, required: true }),
    __metadata("design:type", String)
], TemporaryEvent.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TemporaryEvent.prototype, "fixedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TemporaryEvent.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TemporaryEvent.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TemporaryEvent.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TemporaryEvent.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], TemporaryEvent.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: String, enum: type_1.DaysOfWeek }], required: true }),
    __metadata("design:type", Array)
], TemporaryEvent.prototype, "applicableDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: String, enum: type_1.OrderType }], required: true }),
    __metadata("design:type", Array)
], TemporaryEvent.prototype, "orderTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], TemporaryEvent.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Branch' }] }),
    __metadata("design:type", Array)
], TemporaryEvent.prototype, "branches", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Category' }] }),
    __metadata("design:type", Array)
], TemporaryEvent.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Product' }] }),
    __metadata("design:type", Array)
], TemporaryEvent.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'ProductTag' }] }),
    __metadata("design:type", Array)
], TemporaryEvent.prototype, "productTags", void 0);
exports.TemporaryEvent = TemporaryEvent = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], TemporaryEvent);
exports.TemporaryEventSchema = mongoose_1.SchemaFactory.createForClass(TemporaryEvent);
exports.TEMPORARY_EVENT_MODEL = 'TemporaryEvent';
exports.TemporaryEventModel = mongoose_1.MongooseModule.forFeature([
    { name: TemporaryEvent.name, schema: exports.TemporaryEventSchema },
]);
const getTemporaryEventModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in temporary event model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    if (!connection.models['Branch']) {
        connection.model('Branch', branch_model_1.BranchSchema);
    }
    const model = connection.models['TemporaryEvent'] || connection.model('TemporaryEvent', exports.TemporaryEventSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getTemporaryEventModel = getTemporaryEventModel;
