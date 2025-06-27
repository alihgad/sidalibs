export type AuthOptions = {
    permissions?: string[];
    ownerOnly?: boolean;
    allowAny?: boolean;
};
export declare function Auth(options?: AuthOptions): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
//# sourceMappingURL=auth.decorator.d.ts.map