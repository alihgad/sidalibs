import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { TransferStatus, TransferType } from '../../../common/type';
export declare class Transfer {
    referenceNumber: string;
    source: {
        sourceId: Types.ObjectId;
        sourceName: string;
    };
    destination: {
        destinationId: Types.ObjectId;
        destinationName: string;
    };
    createdBy: Types.ObjectId;
    submittedBy?: Types.ObjectId;
    submittedAt?: Date;
    workDate: Date;
    transferType: TransferType;
    status: TransferStatus;
    items?: [
        {
            materialId: Types.ObjectId;
            materialName: string;
            materialCode: string;
            quantity: number;
            receivedQuantity: number;
            transferVariance: number;
            unitCost: number;
            totalCost: number;
        }
    ];
    dateDueToReceive?: Date;
    notes?: string;
    transferReceivingReference?: string;
    transferSendingReference?: string;
    totalCost?: number;
    totalItems?: number;
    isDeleted: boolean;
    deletedBy?: Types.ObjectId;
    deletedAt?: Date;
}
export type TransferDocument = HydratedDocument<Transfer>;
export declare const TransferSchema: import("mongoose").Schema<Transfer, Model<Transfer, any, any, any, import("mongoose").Document<unknown, any, Transfer, any> & Transfer & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transfer, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Transfer>, {}> & import("mongoose").FlatRecord<Transfer> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TRANSFER_MODEL = "TRANSFER_MODEL";
export declare const TransferModel: import("@nestjs/common").DynamicModule;
export declare const getTransferModel: (businessNumber: string) => DataBaseRepository<TransferDocument>;
//# sourceMappingURL=transfer.model.d.ts.map