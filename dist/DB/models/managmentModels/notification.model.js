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
exports.getManagmentNotificationModel = exports.NotificationModel = exports.NOTIFICATION_MODEL = exports.NotificationSchema = exports.Notification = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
const roles_model_1 = require("./roles.model");
const users_model_1 = require("./users.model");
const notifications_1 = require("../../../notifications/notifications");
// Validation function to check if applyOn values are valid
const validateNotificationsKyes = (input) => {
    return input.every(value => Object.values(notifications_1.notificationsKyes).includes(value));
};
let Notification = class Notification {
    constructor(name, triggerType, applyOn, frequency, usersToBeNotified, rolesToBeNotified, isActive, customSchedule, triggerCount) {
        this.name = name;
        this.triggerType = triggerType;
        this.applyOn = applyOn;
        this.frequency = frequency;
        this.usersToBeNotified = usersToBeNotified || [];
        this.rolesToBeNotified = rolesToBeNotified || [];
        this.isActive = isActive !== undefined ? isActive : true;
        this.customSchedule = customSchedule;
        this.triggerCount = triggerCount || 0;
    }
};
exports.Notification = Notification;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, minlength: 2, maxlength: 100 }),
    __metadata("design:type", String)
], Notification.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        default: 'Action'
    }),
    __metadata("design:type", String)
], Notification.prototype, "triggerType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: true,
        validate: {
            validator: validateNotificationsKyes,
            message: 'applyOn values must be from the predefined list in notifications.ts'
        }
    }),
    __metadata("design:type", Array)
], Notification.prototype, "applyOn", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        default: 'Each action'
    }),
    __metadata("design:type", String)
], Notification.prototype, "frequency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'User', default: [] }),
    __metadata("design:type", Array)
], Notification.prototype, "usersToBeNotified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: 'roles', default: [] }),
    __metadata("design:type", Array)
], Notification.prototype, "rolesToBeNotified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Notification.prototype, "customSchedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Notification.prototype, "lastTriggered", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Notification.prototype, "triggerCount", void 0);
exports.Notification = Notification = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }),
    __metadata("design:paramtypes", [String, String, Array, String, Array, Array, Boolean, String, Number])
], Notification);
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
exports.NOTIFICATION_MODEL = 'NOTIFICATION_MODEL';
exports.NotificationModel = mongoose_1.MongooseModule.forFeature([{ name: 'Notification', schema: exports.NotificationSchema }]);
// Pre-save hook to validate applyOn values
exports.NotificationSchema.pre('save', function (next) {
    if (this.applyOn && this.applyOn.length > 0) {
        if (!validateNotificationsKyes(this.applyOn)) {
            return next(new Error('Invalid applyOn values. All values must be from the predefined list in notifications.ts'));
        }
    }
    next();
});
// Index for better query performance
exports.NotificationSchema.index({ isActive: 1, triggerType: 1 });
exports.NotificationSchema.index({ usersToBeNotified: 1 });
exports.NotificationSchema.index({ rolesToBeNotified: 1 });
const getManagmentNotificationModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in notification model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register required models for refs
    if (!connection.models['roles']) {
        connection.model('roles', roles_model_1.rolesSchema);
    }
    if (!connection.models['User']) {
        connection.model('User', users_model_1.UserSchema);
    }
    const model = connection.models['Notification'] || connection.model('Notification', exports.NotificationSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getManagmentNotificationModel = getManagmentNotificationModel;
