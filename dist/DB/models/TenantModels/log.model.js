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
exports.getLogModel = exports.LogModel = exports.LOG_MODEL = exports.LogSchema = exports.Log = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const type_1 = require("../../../common/type");
let Log = class Log {
};
exports.Log = Log;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: type_1.LogActionType, required: true }),
    __metadata("design:type", String)
], Log.prototype, "actionType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Log.prototype, "actionName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Log.prototype, "actionDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Log.prototype, "performedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Log.prototype, "module", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Log.prototype, "entityType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Log.prototype, "entityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Log.prototype, "oldData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Log.prototype, "newData", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Map,
        of: {
            LSID: { type: String, required: true },
            userAgent: { type: String },
            ipAddress: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
        default: {},
    }),
    __metadata("design:type", Map)
], Log.prototype, "loginDevicesSession", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['SUCCESS', 'FAILURE'], default: 'SUCCESS' }),
    __metadata("design:type", String)
], Log.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Log.prototype, "context", void 0);
exports.Log = Log = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Log);
exports.LogSchema = mongoose_1.SchemaFactory.createForClass(Log);
// إضافة indexes للبحث السريع
exports.LogSchema.index({ actionType: 1, createdAt: -1 });
exports.LogSchema.index({ userId: 1, createdAt: -1 });
exports.LogSchema.index({ entityType: 1, entityId: 1 });
exports.LogSchema.index({ createdAt: -1 });
exports.LOG_MODEL = 'Log_MODEL';
exports.LogModel = mongoose_1.MongooseModule.forFeature([
    { name: Log.name, schema: exports.LogSchema },
]);
const getLogModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in log model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Log'] || connection.model('Log', exports.LogSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getLogModel = getLogModel;
