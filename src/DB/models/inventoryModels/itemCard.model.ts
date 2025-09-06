import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { Transaction } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class materialCard {
    constructor(
    materialId: string,
    price: number,
    closeDate:Date,
    inputs:Transaction[],
    outputs:Transaction[],
    startPrice:number,
    ) {
        this.materialId = materialId
        this.price = price
        this.closeDate = closeDate   
        this.inputs = inputs  
        this.outputs = outputs 
        this.startPrice = startPrice 
    }
    @Prop({ type: String })
    materialId: string;

    @Prop({ type: Number })
    price: number

    @Prop({ type: Date })
    closeDate:Date

    @Prop({ type: [] })
    inputs : Transaction[]

    @Prop({ type: [] })
    outputs : Transaction[]

    @Prop({ type: Number , default:0}) 
    startPrice : number

}

export type materialCardDocument = HydratedDocument<materialCard>;
export const materialCardSchema = SchemaFactory.createForClass(materialCard);

export const material_CARD_MODEL = 'material_CARD_MODEL';
export const materialCardModel = MongooseModule.forFeature([
    { name: 'materialCard', schema: materialCardSchema }
]);

export const getmaterialCardModel = (businessNumber: string): DataBaseRepository<materialCardDocument> => {
    if (!businessNumber) {
        throw new Error('businessNumber is required in material card model');
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['materialCard'] || connection.model('materialCard', materialCardSchema) as unknown as Model<materialCardDocument>;
    return new DataBaseRepository<materialCardDocument>(model);
};