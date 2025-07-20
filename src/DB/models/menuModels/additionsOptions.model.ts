import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import {  CostCalculationMethod, OrderType } from '../../../common/type';
import { NutritionalValuesSchema } from '../shared/nutritional-values.schema';
import { MenuGroupSchema } from './groups.model';

// الحقول بالترتيب:
// 1. الاسم (name)
// 2. الاسم الثانوي (secondaryName)
// 3. الوصف (description)
// 4. كود التعريف (referenceNumber)
// 5. السعر (price)
// 6. مجموعة ضريبية (taxGroup)
// 7. طريقة حساب التكلفة (costCalculationMethod)
// 8. تكلفة المكونات (cost)
// 9. المكونات (ingredients) - ريف على المواد
// 10. أنواع الأوردر (orderTypes) - أنواع الطلبات
// 11. الكمية (quantity)
// 12. استثناء من الكومبو (comboException) - ريف على كومبو
// 13. القيم الغذائية (nutritionalValues)
// 14. أسعار مخصصة للفروع (customBranchPrices)
// 15. غير نشط في فرع معين (inactiveBranches)
// 16. نفذ من المخزون في فرع معين (outOfStockBranches)
// 17. ينطبق على وسم سعر (priceTagApplies)
// 18. نشط أو معطل (isActive)
// 19. محذوف (isDeleted)

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

    @Prop({ type: Types.ObjectId, ref: 'MenuGroup', required: false })
    menuGroup?: Types.ObjectId;

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

    @Prop({ type: Boolean, default: true })
    isActive!: boolean;

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
    // Register all dependent models if not already registered
    if (!connection.models['TaxGroup']) {
        connection.model('TaxGroup', TaxGroupSchema);
    }
    if (!connection.models['Material']) {
        connection.model('Material', materialsSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['PriceTagApplies']) {
        connection.model('PriceTagApplies', PriceTagAppliesSchema);
    }
    if (!connection.models['MenuGroup']) {
        connection.model('MenuGroup', MenuGroupSchema);
    }
    // Combo model placeholder (to be implemented)
    if (!connection.models['Combo']) {
        // Placeholder schema for Combo, replace with actual schema when implemented
        const ComboSchema = new (require('mongoose').Schema)({});
        connection.model('Combo', ComboSchema);
        // TODO: Replace ComboSchema with actual Combo schema when available
    }
    const model = connection.models['Addition'] || connection.model('Addition', AdditionSchema) as unknown as Model<AdditionDocument>;
    return new DataBaseRepository<AdditionDocument>(model);
} 