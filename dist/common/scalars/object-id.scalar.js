"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdScalar = exports.ObjectIdScalarType = void 0;
const graphql_1 = require("graphql");
const mongoose_1 = require("mongoose");
exports.ObjectIdScalarType = new graphql_1.GraphQLScalarType({
    name: 'ObjectId',
    description: 'MongoDB ObjectId scalar type',
    serialize(value) {
        if (value instanceof mongoose_1.Types.ObjectId) {
            return value.toHexString();
        }
        return value;
    },
    parseValue(value) {
        return new mongoose_1.Types.ObjectId(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return new mongoose_1.Types.ObjectId(ast.value);
        }
        return new mongoose_1.Types.ObjectId();
    },
});
exports.ObjectIdScalar = {
    provide: 'ObjectIdScalar',
    useValue: exports.ObjectIdScalarType
};
