import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { TransferStatus } from '../../../common/type';
export declare class TransferOrder {
    referenceNumber: string;
    warehouse: {
        warehouseId: string;
        warehouseName: string;
    };
    destination: {
        destinationId: string;
        destinationName: string;
    };
    workDate: Date;
    createdBy: {
        userId: string;
        userName: string;
    };
    notes?: string;
    status: TransferStatus;
    items: {
        itemId: string;
        itemName: string;
        itemCode: string;
        quantity: number;
        availableQuantity: number;
    }[];
    isSubmitted: boolean;
    submittedBy?: string;
    submittedAt?: Date;
    isSent: boolean;
    sentBy?: string;
    sentAt?: Date;
    isDeleted: boolean;
    deletedBy?: string;
    deletedAt?: Date;
}
export type TransferOrderDocument = HydratedDocument<TransferOrder>;
export declare const TransferOrderSchema: import("mongoose").Schema<TransferOrder, Model<TransferOrder, any, any, any, import("mongoose").Document<unknown, any, TransferOrder, any> & TransferOrder & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TransferOrder, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TransferOrder>, {}> & import("mongoose").FlatRecord<TransferOrder> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TRANSFER_ORDER_MODEL = "TRANSFER_ORDER_MODEL";
export declare const TransferOrderModel: import("@nestjs/common").DynamicModule;
export declare const getTransferOrderModel: (businessNumber: string) => DataBaseRepository<TransferOrderDocument>;
//# sourceMappingURL=transferOrders.model.d.ts.map