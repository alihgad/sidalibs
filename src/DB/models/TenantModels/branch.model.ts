import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Branch {
    @Prop({ required: true })
    name!: string; // وقت التسجيل

    @Prop({ type: String, required: true })
    type!: string;

    @Prop({ type: String, required: true })
    description!: string;

    @Prop({ type: String, required: true })
    secondName!: string;
    
    @Prop({ type: Boolean, default: false })
    onlineOrder!: boolean

    @Prop({ type: Boolean, default: false })
    reservations!: boolean;

    @Prop({ 
        type: String, 
        required: false,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    })
    workStartTime!: string;

    @Prop({ 
        type: String, 
        required: false,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    })
    workEndTime!: string;

    @Prop({ type: String, required: false })
    referenceNumber!: string; // وقت التسجيل

    @Prop({ type: String, required: false })
    taxGroup!: string; // وقت التسجيل

    @Prop({ type: String, required: false })
    branchTaxRegistrationName!: string;

    @Prop({ type: String, required: false })
    phone!: string;

    @Prop({ type: String, required: false })
    address!: string;

    @Prop({ type: String, required: false })
    streetName!: string;

    @Prop({ type: String, required: false })
    buildingNumber!: string;

    @Prop({ type: String, required: false })
    subNumber!: string;

    @Prop({ type: String, required: false })
    city!: string;

    @Prop({ type: String, required: false })
    district!: string;

    @Prop({ type: String, required: false })
    postalCode!: string;

    @Prop({ type: String, required: false })
    commercialRegistrationNumber!: string;

    @Prop({ type: Number, required: false })
    latitude!: number;

    @Prop({ type: Number, required: false })
    longitude!: number;

    @Prop({ type: String, required: false })
    orderViewerApp!: {
        public_id: string,
        secure_url: string,
    }; // URL للصورة المرفوعة

    @Prop({ type: String, required: false })
    invoiceTop!: string;

    @Prop({ type: String, required: false })
    invoiceBottom!: string; 

    @Prop({ type: Boolean, default: false })
    receiveCallCenterAndApiOrders!: boolean;

    
}
export type BranchDocument = HydratedDocument<Branch> & { _id: string };
export const BranchSchema = SchemaFactory.createForClass(Branch);
export const Branch_MODEL = 'Branch';
export const BranchModel = MongooseModule.forFeature([
    { name: Branch.name, schema: BranchSchema },
]);


export const getBranchModel = (businessNumber: string): DataBaseRepository<BranchDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in branch model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Branch'] || connection.model('Branch', BranchSchema) as unknown as Model<BranchDocument>;
    return new DataBaseRepository<BranchDocument>(model);
}