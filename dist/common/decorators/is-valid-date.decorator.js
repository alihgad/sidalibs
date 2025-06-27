"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEndDateAfterStartDate = exports.IsStartDateNotPast = void 0;
const class_validator_1 = require("class-validator");
let IsStartDateNotPast = class IsStartDateNotPast {
    validate(value, args) {
        if (!value)
            return true;
        const obj = args.object;
        const startDate = new Date(value);
        const now = new Date();
        // If start date is today, check if start time has passed
        if (startDate.toDateString() === now.toDateString()) {
            const [startHours, startMinutes] = obj.startTime.split(':').map(Number);
            const startTimeInMinutes = startHours * 60 + startMinutes;
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTimeInMinutes = currentHours * 60 + currentMinutes;
            return startTimeInMinutes > currentTimeInMinutes;
        }
        // If different day, just compare dates
        startDate.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        return startDate.getTime() >= now.getTime();
    }
    defaultMessage() {
        return 'Start time cannot be in the past';
    }
};
exports.IsStartDateNotPast = IsStartDateNotPast;
exports.IsStartDateNotPast = IsStartDateNotPast = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsStartDateNotPast', async: false })
], IsStartDateNotPast);
let IsEndDateAfterStartDate = class IsEndDateAfterStartDate {
    validate(value, args) {
        if (!value)
            return true;
        const obj = args.object;
        if (!obj.startDate)
            return true;
        const endDate = new Date(value);
        const startDate = new Date(obj.startDate);
        const now = new Date();
        // If end date is today, check if end time has passed
        if (endDate.toDateString() === now.toDateString()) {
            const [endHours, endMinutes] = obj.endTime.split(':').map(Number);
            const endTimeInMinutes = endHours * 60 + endMinutes;
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTimeInMinutes = currentHours * 60 + currentMinutes;
            if (endTimeInMinutes <= currentTimeInMinutes) {
                return false;
            }
        }
        // If dates are different, just compare dates
        if (endDate.toDateString() !== startDate.toDateString()) {
            return endDate.getTime() > startDate.getTime();
        }
        // If same day, compare times
        const [startHours, startMinutes] = obj.startTime.split(':').map(Number);
        const [endHours, endMinutes] = obj.endTime.split(':').map(Number);
        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;
        return endTimeInMinutes > startTimeInMinutes;
    }
    defaultMessage() {
        return 'End time must be after start time and cannot be in the past';
    }
};
exports.IsEndDateAfterStartDate = IsEndDateAfterStartDate;
exports.IsEndDateAfterStartDate = IsEndDateAfterStartDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsEndDateAfterStartDate', async: false })
], IsEndDateAfterStartDate);
