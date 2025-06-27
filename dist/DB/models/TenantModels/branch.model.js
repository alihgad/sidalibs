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
exports.getBranchModel = exports.BranchModel = exports.Branch_MODEL = exports.BranchSchema = exports.Branch = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DataBase_repository_1 = require("../../DataBase.repository");
const connection_manager_1 = require("../../connection.manager");
let Branch = class Branch {
};
exports.Branch = Branch;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Branch.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Branch.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Branch.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Branch.prototype, "secondName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Branch.prototype, "onlineOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Branch.prototype, "reservations", void 0);
exports.Branch = Branch = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Branch);
exports.BranchSchema = mongoose_1.SchemaFactory.createForClass(Branch);
exports.Branch_MODEL = 'Branch';
exports.BranchModel = mongoose_1.MongooseModule.forFeature([
    { name: Branch.name, schema: exports.BranchSchema },
]);
const getBranchModel = (businessNumber) => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in branch model");
    }
    let connection = connection_manager_1.ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Branch'] || connection.model('Branch', exports.BranchSchema);
    return new DataBase_repository_1.DataBaseRepository(model);
};
exports.getBranchModel = getBranchModel;
