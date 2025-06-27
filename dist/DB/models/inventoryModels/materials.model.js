"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterialsModel = void 0;
const mongoose_1 = require("mongoose");
const materialsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    lastOrder: {
        type: Date,
        required: false
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlacklisted: {
        type: Boolean,
        default: false
    },
    creditAccount: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
const getMaterialsModel = (businessNumber) => {
    return (0, mongoose_1.model)(`materials_${businessNumber}`, materialsSchema);
};
exports.getMaterialsModel = getMaterialsModel;
