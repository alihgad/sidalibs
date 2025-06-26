import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Supplier {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    companyName!: string;

    @Prop({ required: true, unique: true })
    @Prop({ type: String, required: true, unique: true, match: /^[A-Za-z0-9]+$/ })
    supplierCode!: string;

    @Prop({ required: true })
    contactName!: string;

    @Prop({ required: true })
    phone!: string;

    @Prop({ required: true })
    @Prop({ type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })
    primaryEmail!: string;

    @Prop({ type: String, required: false })
    @Prop({ type: String, required: false, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(,[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*$/ })
    secondaryEmails?: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Material' }] })
    materials?: Types.ObjectId[];

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type SupplierDocument = HydratedDocument<Supplier> & { _id: string };
export const SupplierSchema = SchemaFactory.createForClass(Supplier);
export const SUPPLIER_MODEL = 'Supplier';
export const SupplierModel = MongooseModule.forFeature([
    { name: Supplier.name, schema: SupplierSchema },
]);

export const getSuppliersModel = (businessNumber: string): DataBaseRepository<SupplierDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in supplier model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Supplier'] || connection.model('Supplier', SupplierSchema) as unknown as Model<SupplierDocument>;
    return new DataBaseRepository<SupplierDocument>(model);
} 