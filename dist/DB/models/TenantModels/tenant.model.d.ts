import { HydratedDocument, Model } from 'mongoose';
import { PlanDuration, PlanType } from '../../../common/type';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Tenant {
    ownerFirstName: string;
    ownerLastName: string;
    companyName: string;
    businessNumber: string;
    Email: string;
    countryCode: string;
    phoneNumber: string;
    confirmed: boolean;
    seconderyNameing: boolean;
    pricesWithVat: boolean;
    specficSupplier: boolean;
    timeZone: string;
    requestedPlan?: {
        plan: PlanType;
        duration: PlanDuration;
    };
}
export type TenantDocument = HydratedDocument<Tenant> & {
    _id: string;
};
export declare const TenantSchema: import("mongoose").Schema<Tenant, Model<Tenant, any, any, any, import("mongoose").Document<unknown, any, Tenant, any> & Tenant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tenant, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Tenant>, {}> & import("mongoose").FlatRecord<Tenant> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TENANT_MODEL = "TENANT_MODEL";
export declare const TenantModel: import("@nestjs/common").DynamicModule;
export declare const getTenantModel: () => DataBaseRepository<TenantDocument>;
//# sourceMappingURL=tenant.model.d.ts.map