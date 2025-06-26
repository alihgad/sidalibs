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
    name!: string;

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