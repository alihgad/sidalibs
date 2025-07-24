"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMongoIdObject = IsMongoIdObject;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
function IsMongoIdObject(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsMongoIdObject',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return mongoose_1.Types.ObjectId.isValid(value);
                },
            },
        });
    };
}
