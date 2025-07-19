import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import {  CostCalculationMethod, OrderType } from '../../../common/type';
import { NutritionalValuesSchema } from '../shared/nutritional-values.schema';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Addition {
    @Prop({ required: true })
    name!: string;

    @Prop({ type: String, required: false })
    secondaryName?: string;

    @Prop({ type: String, required: false })
    description?: string;

    @Prop({ type: String, required: true })
    referenceNumber!: string;

    @Prop({ type: Number, required: false })
    price?: number;

    @Prop({ type: Types.ObjectId, ref: 'TaxGroup', required: false })
    taxGroup?: Types.ObjectId;

    @Prop({ type: String, enum: CostCalculationMethod, required: true })
    costCalculationMethod!: CostCalculationMethod;

    @Prop({ type: Number, required: false })
    cost?: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Material' }], default: [] })
    ingredients!: Types.ObjectId[];

    @Prop({ type: [String], enum: OrderType, default: [] })
    orderTypes!: OrderType[];

    @Prop({ type: Number, required: false })
    quantity?: number;

    @Prop({ type: Types.ObjectId, ref: 'Combo', required: false })
    comboException?: Types.ObjectId;

    @Prop({ type: NutritionalValuesSchema, required: false })
    nutritionalValues?: any;

    @Prop({ type: [{ branch: { type: Types.ObjectId, ref: 'Branch' }, price: Number }], default: [] })
    customBranchPrices!: { branch: Types.ObjectId, price: number }[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
    inactiveBranches!: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
    outOfStockBranches!: Types.ObjectId[];

    @Prop({ type: [{ priceTag: { type: Types.ObjectId, ref: 'PriceTagApplies' }, price: Number }], default: [] })
    priceTagApplies!: { priceTag: Types.ObjectId, price: number }[];

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;
}

export type AdditionDocument = HydratedDocument<Addition> & { _id: string };
export const AdditionSchema = SchemaFactory.createForClass(Addition);
export const ADDITION_MODEL = 'Addition';
export const AdditionModel = MongooseModule.forFeature([
    { name: Addition.name, schema: AdditionSchema },
]);

export const getAdditionsModel = (businessNumber: string): DataBaseRepository<AdditionDocument> => {
    if(!businessNumber){
        throw new Error("businessNumber is required in Addition model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Addition'] || connection.model('Addition', AdditionSchema) as unknown as Model<AdditionDocument>;
    return new DataBaseRepository<AdditionDocument>(model);
} 