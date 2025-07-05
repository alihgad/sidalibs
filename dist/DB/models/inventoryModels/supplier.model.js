"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupplierModel = exports.supplierSchema = void 0;
const mongoose_1 = require("mongoose");
const connection_manager_1 = require("../../connection.manager");
const DataBase_repository_1 = require("../../DataBase.repository");
exports.supplierSchema = new mongoose_1.Schema({
    supplierCode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    contactPerson: {
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
const getSupplierModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in supplier model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Supplier'] || connection.model('Supplier', exports.supplierSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getSupplierModel = getSupplierModel;
