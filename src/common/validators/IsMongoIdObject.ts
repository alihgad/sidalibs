import { registerDecorator, ValidationOptions } from 'class-validator';
import { Types } from 'mongoose';

export function IsMongoIdObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsMongoIdObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Types.ObjectId.isValid(value);
        },
      },
    });
  };
}
