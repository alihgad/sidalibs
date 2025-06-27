"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneWithCountryCode = IsPhoneWithCountryCode;
const class_validator_1 = require("class-validator");
const libphonenumber_js_1 = require("libphonenumber-js");
function IsPhoneWithCountryCode(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsPhoneWithCountryCode',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(phoneNumber, args) {
                    const countryCode = args.object.countryCode;
                    if (!phoneNumber || !countryCode)
                        return false;
                    // لازم يبدأ بـ +
                    if (!phoneNumber.startsWith('+'))
                        return false;
                    try {
                        const parsed = (0, libphonenumber_js_1.parsePhoneNumberFromString)(phoneNumber);
                        if (!parsed?.isValid())
                            return false;
                        // لازم يكون نوع الرقم نفس البلد المختارة
                        if (parsed.country !== countryCode)
                            return false;
                        return true;
                    }
                    catch {
                        return false;
                    }
                },
                defaultMessage(args) {
                    return 'Phone number must start with "+" and match the selected country';
                },
            },
        });
    };
}
