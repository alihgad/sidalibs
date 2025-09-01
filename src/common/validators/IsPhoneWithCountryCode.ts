import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { parsePhoneNumberFromString, getCountryCallingCode } from 'libphonenumber-js';

export function IsPhoneWithCountryCode(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPhoneWithCountryCode',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(phoneNumber: any, args: ValidationArguments) {
          const countryCode = (args.object as any).countryCode;

          if (!phoneNumber || !countryCode) return false;

          // لازم يبدأ بـ +
          if (!phoneNumber.startsWith('+')) return false;

          try {
            const parsed = parsePhoneNumberFromString(phoneNumber);
            if (!parsed?.isValid()) return false;

            // لازم يكون نوع الرقم نفس البلد المختارة
            if (parsed.country !== countryCode) return false;

            return true;
          } catch {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return 'Phone number must start with "+" and match the selected country';
        },
      },
    });
  };
}
