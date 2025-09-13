import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
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
    materialId: Types.ObjectId,
    price: number,
    closeDate:Date,
    inputs:Transaction[],
    outputs:Transaction[],
    startPrice:number,
    oldInputs:Transaction[],
    oldOutputs:Transaction[],
    branchId:Types.ObjectId,
    totalQuantity:number,
    totalAmount:number
    ) {
        this.materialId = materialId
        this.branchId = branchId
        this.price = price
        this.closeDate = closeDate   
        this.inputs = inputs  
        this.outputs = outputs 
        this.startPrice = startPrice
        this.oldInputs = oldInputs
        this.oldOutputs = oldOutputs
        this.totalQuantity = totalQuantity
        this.totalAmount = totalAmount 
    }
    @Prop({ type: Types.ObjectId  , ref : "Materials"})
    materialId: Types.ObjectId;

    @Prop({ type: Types.ObjectId  , ref : "Branch"})
    branchId: Types.ObjectId

    @Prop({ type: Number , default: 0 })
    price: number

    @Prop({ type: Date  , default : null})
    closeDate:Date

    @Prop({ type: [] })
    inputs : Transaction[]

    @Prop({ type: [] })
    outputs : Transaction[]

    @Prop({ type: [] })
    oldInputs : Transaction[]

    @Prop({ type: [] })
    oldOutputs : Transaction[]

    @Prop({ type: Number , default:0}) 
    startPrice : number

    @Prop({ type: Number , default:0})
    totalQuantity : number

    @Prop({ type: Number , default:0})
    totalAmount : number

}

export type materialCardDocument = HydratedDocument<materialCard>;
export const materialCardSchema = SchemaFactory.createForClass(materialCard);
let calculating = (doc : materialCard)=>{
    doc.inputs.forEach(input => {
        doc.totalQuantity += input.quantity
        doc.totalAmount += input.amount
    })

    doc.price = doc.totalAmount / doc.totalQuantity

}
// Hook واحد لجميع عمليات البحث
materialCardSchema.pre(/^find/, function() {
    calculating(this as unknown as materialCard)
})

materialCardSchema.pre("updateOne", function() {
    throw new Error("not allowed use findOneAndUpdate")
})



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