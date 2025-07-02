"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaterialsModel = void 0;
const mongoose_1 = require("mongoose");
const type_1 = require("../../../common/type");
const connection_manager_1 = require("../../connection.manager");
const DataBase_repository_1 = require("../../DataBase.repository");
const tags_model_1 = require("../TenantModels/tags.model");
const supplier_model_1 = require("./supplier.model");
const materialsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    secondaryName: {
        type: String,
        required: false,
        maxlength: 50
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    storageUnit: {
        type: String,
        required: true
    },
    recipeUnit: {
        type: String,
        required: true
    },
    conversionFactor: {
        type: Number,
        required: true
    },
    costCalculationMethod: {
        type: String,
        enum: Object.values(type_1.CostCalculationMethod),
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    reorderLevel: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: false
    },
    minLevel: {
        type: Number,
        required: true
    },
    maxLevel: {
        type: Number,
        required: true
    },
    suppliers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: false
        }],
    tags: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tag',
            required: false
        }],
    ingredients: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Material',
            required: false
        }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const getMaterialsModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in materials model');
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    // Register Tag model in the same connection if not already registered
    if (!connection.models['Tag']) {
        connection.model('Tag', tags_model_1.TagSchema);
    }
    // Register Supplier model in the same connection if not already registered
    if (!connection.models['Supplier']) {
        connection.model('Supplier', supplier_model_1.supplierSchema);
    }
    const model = connection.models['Material'] || connection.model('Material', materialsSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getMaterialsModel = getMaterialsModel;
