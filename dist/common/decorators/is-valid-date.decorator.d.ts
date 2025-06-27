import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsStartDateNotPast implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
export declare class IsEndDateAfterStartDate implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
//# sourceMappingURL=is-valid-date.decorator.d.ts.map