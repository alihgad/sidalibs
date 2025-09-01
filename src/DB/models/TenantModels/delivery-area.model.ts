import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { BranchSchema } from './branch.model';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class DeliveryArea {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ required: false })
    secondaryName?: string; // الاسم الثانوي

    @Prop({ required: false, unique: true })
    referenceNumber?: string; // الرقم المرجعي

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], required: false, default: [] })
    branches!: Types.ObjectId[]; // الفروع المسؤولة عن المنطقة

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف

    // // GeoJSON Polygon for area coordinates
    // if u want include location GPS -
    // @Prop({
    //     type: {
    //         type: String,
    //         enum: ['Polygon'],
    //         default: 'Polygon',
    //     },
    //     coordinates: {
    //         type: [[[Number]]], // Array of arrays of coordinates
    //         required: true,
    //     },
    // })
    // area!: {
    //     type: 'Polygon',
    //     coordinates: number[][][];
    // };
}

export type DeliveryAreaDocument = HydratedDocument<DeliveryArea> & { _id: string };
export const DeliveryAreaSchema = SchemaFactory.createForClass(DeliveryArea);
export const DELIVERY_AREA_MODEL = 'DeliveryArea';
export const DeliveryAreaModel = MongooseModule.forFeature([
    { name: DeliveryArea.name, schema: DeliveryAreaSchema },
]);
export const getDeliveryAreaModel = (businessNumber: string): DataBaseRepository<DeliveryAreaDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in delivery area model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    if(!connection.models["Branch"]){
        connection.model('Branch', BranchSchema);
    }
    const model = connection.models['DeliveryArea'] || connection.model('DeliveryArea', DeliveryAreaSchema) as unknown as Model<DeliveryAreaDocument>;
    return new DataBaseRepository<DeliveryAreaDocument>(model);
}