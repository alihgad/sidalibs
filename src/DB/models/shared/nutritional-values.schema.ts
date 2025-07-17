import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NutritionalValues {
    @Prop({ type: Number, default: 1 })
    servingSize!: number;

    @Prop({ type: String, enum: 'ServingUnit', default: 'SERVING' })
    servingUnit!: string;

    @Prop({ type: Number, default: 0 })
    calories!: number;
    @Prop({ type: Number, default: 0 })
    protein!: number;
    @Prop({ type: Number, default: 0 })
    totalFat!: number;
    @Prop({ type: Number, default: 0 })
    saturatedFat!: number;
    @Prop({ type: Number, default: 0 })
    transFat!: number;
    @Prop({ type: Number, default: 0 })
    cholesterol!: number;
    @Prop({ type: Number, default: 0 })
    sodium!: number;
    @Prop({ type: Number, default: 0 })
    salt!: number;
    @Prop({ type: Number, default: 0 })
    carbohydrates!: number;
    @Prop({ type: Number, default: 0 })
    fiber!: number;
    @Prop({ type: Number, default: 0 })
    totalSugars!: number;
    @Prop({ type: Number, default: 0 })
    addedSugars!: number;
}

export const NutritionalValuesSchema = SchemaFactory.createForClass(NutritionalValues); 