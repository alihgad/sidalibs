import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
export declare class Branch {
    name: string;
    type: string;
    description: string;
    secondName: string;
    onlineOrder: boolean;
    reservations: boolean;
    workStartTime: string;
    workEndTime: string;
    referenceNumber: string;
    taxGroup: string;
    branchTaxRegistrationName: string;
    phone: string;
    address: string;
    streetName: string;
    buildingNumber: string;
    subNumber: string;
    city: string;
    district: string;
    postalCode: string;
    commercialRegistrationNumber: string;
    latitude: number;
    longitude: number;
    orderViewerApp: {
        public_id: string;
        secure_url: string;
    };
    invoiceTop: string;
    invoiceBottom: string;
    receiveCallCenterAndApiOrders: boolean;
}
export type BranchDocument = HydratedDocument<Branch> & {
    _id: string;
};
export declare const BranchSchema: import("mongoose").Schema<Branch, Model<Branch, any, any, any, import("mongoose").Document<unknown, any, Branch, any> & Branch & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Branch, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Branch>, {}> & import("mongoose").FlatRecord<Branch> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Branch_MODEL = "Branch";
export declare const BranchModel: import("@nestjs/common").DynamicModule;
export declare const getBranchModel: (businessNumber: string) => DataBaseRepository<BranchDocument>;
//# sourceMappingURL=branch.model.d.ts.map