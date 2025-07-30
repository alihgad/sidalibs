import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';

// Schema for combo sizes
@Schema({ _id: false })
export class ComboSize {
    @Prop({ required: true })
    name!: string;

    @Prop()
    secondaryName?: string;

    @Prop({ default: 0 })
    order!: number;

    @Prop({ default: false })
    isDefault!: boolean;

    @Prop({ default: true })
    isAvailable!: boolean;
}

// Schema for option prices by size
@Schema({ _id: false })
export class OptionPrice {
    @Prop({ required: true })
    size!: string;

    @Prop({ required: true })
    price!: number;
}

// Schema for combo options within groups
@Schema({ _id: false })
export class ComboOption {
    @Prop({ required: true })
    name!: string;

    @Prop()
    secondaryName?: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Products' })
    product!: Types.ObjectId;

    @Prop([OptionPrice])
    prices!: OptionPrice[];

    @Prop({ default: false })
    isDefault!: boolean;

    @Prop({ default: true })
    isAvailable!: boolean;

    @Prop({ default: 0 })
    order!: number;
}

// Schema for combo groups
@Schema({ _id: false })
export class ComboGroup {
    @Prop({ required: true })
    name!: string;

    @Prop()
    secondaryName?: string;

    @Prop({ default: 0 })
    order!: number;

    @Prop({ default: true })
    isRequired!: boolean;

    @Prop({ default: 1 })
    maxSelections!: number;

    @Prop({ default: 1 })
    minSelections!: number;

    @Prop({ default: true })
    isAvailable!: boolean;

    @Prop([ComboOption])
    options!: ComboOption[];
}

// Schema for custom branch prices
@Schema({ _id: false })
export class CustomBranchPrice {
    @Prop({ type: Types.ObjectId, required: true })
    branch!: Types.ObjectId;

    @Prop([{
        size: { type: String, required: true },
        group: { type: String, required: true },
        price: { type: Number, required: true }
    }])
    prices!: Array<{
        size: string;
        group: string;
        price: number;
    }>;
}

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Combos {
    @Prop({ required: true })
    name!: string;

    @Prop()
    secondaryName?: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'MenuCategories' })
    category!: Types.ObjectId;

    @Prop({ required: true, unique: true })
    referenceCode!: string;

    @Prop()
    barcode?: string;

    @Prop()
    description?: string;

    @Prop()
    image?: string;

    @Prop({ default: true })
    isActive!: boolean;

    @Prop({ default: false })
    isDeleted!: boolean;

    @Prop([{ type: Types.ObjectId, ref: 'Tags' }])
    tags?: Types.ObjectId[];

    @Prop([{ type: Types.ObjectId, ref: 'Branches' }])
    inactiveBranches?: Types.ObjectId[];

    @Prop([CustomBranchPrice])
    customBranchPrices?: CustomBranchPrice[];

    @Prop([ComboSize])
    sizes!: ComboSize[];

    @Prop([ComboGroup])
    groups!: ComboGroup[];

    @Prop({ type: Types.ObjectId, ref: 'Users' })
    createdBy?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Users' })
    updatedBy?: Types.ObjectId;
}

export type CombosDocument = HydratedDocument<Combos> & { _id: string };
export const CombosSchema = SchemaFactory.createForClass(Combos);
export const COMBO_MODEL = 'Combos';
export const CombosModel = MongooseModule.forFeature([
    { name: Combos.name, schema: CombosSchema },
]);

export const getCombosModel = (businessNumber: string): DataBaseRepository<CombosDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Combos model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Combos'] || connection.model('Combos', CombosSchema) as unknown as Model<CombosDocument>;
    return new DataBaseRepository<CombosDocument>(model);
} 