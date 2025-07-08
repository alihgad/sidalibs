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
exports.getDeviceCollection = exports.getDevices = exports.DeviceModel = exports.Device_MODEL = exports.DeviceSchema = exports.Device = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const type_1 = require("../../../common/type");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Device = class Device {
};
exports.Device = Device;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Device.prototype, "deviceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Branch' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Device.prototype, "branchId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Device.prototype, "activationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Device.prototype, "isActivated", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Device.prototype, "jwtSecret", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Device.prototype, "lastActivatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Device.prototype, "lastOnlineAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            plan: { type: String, enum: Object.values(type_1.PlanType), required: true },
            duration: { type: String, enum: Object.values(type_1.PlanDuration), required: true },
            paid: { type: Boolean, default: false },
            startDate: { type: Date },
            endDate: { type: Date },
            branchId: { type: mongoose_2.Types.ObjectId, ref: 'Branch' },
            receiptUrl: { type: String },
            amountPaid: { type: Number },
            currency: { type: String },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Device.prototype, "currentSubscription", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            plan: { type: String, enum: Object.values(type_1.PlanType), required: true },
            duration: { type: String, enum: Object.values(type_1.PlanDuration), required: true },
            paid: { type: Boolean, default: false },
            startDate: { type: Date, required: true },
            receiptUrl: { type: String },
            amountPaid: { type: Number },
            currency: { type: String },
            endDate: { type: Date },
        },
    ]),
    __metadata("design:type", Array)
], Device.prototype, "subscriptionHistory", void 0);
exports.Device = Device = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Device);
exports.DeviceSchema = mongoose_1.SchemaFactory.createForClass(Device);
exports.Device_MODEL = 'Device_MODEL';
exports.DeviceModel = mongoose_1.MongooseModule.forFeature([
    { name: Device.name, schema: exports.DeviceSchema },
]);
const getDevices = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in device model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Device'] || connection.model('Device', exports.DeviceSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getDevices = getDevices;
const getDeviceCollection = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in device model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const collection = connection.collection('Device');
    return collection;
};
exports.getDeviceCollection = getDeviceCollection;
