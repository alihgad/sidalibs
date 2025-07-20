import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { PricingMethod, SaleMethod, CostCalculationMethod, ServingUnit } from '../../../common/type';
import { MenuCategorySchema } from './categories.model';
import { TaxGroupSchema } from '../TenantModels/tax-groups.model';
import { TagSchema } from '../TenantModels/tags.model';
import { BranchSchema } from '../TenantModels/branch.model';
import { PriceTagAppliesSchema } from '../TenantModels/priceTagApplies.model';
import { AdditionSchema } from './additions.model';
import { MenuGroupSchema } from './groups.model';
import { MaterialsSchema } from '../inventoryModels/materials.model';

// Custom Branch Price Schema
@Schema({ _id: false })
export class CustomBranchPrice {
    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    branch!: Types.ObjectId;

    @Prop({ type: Number, required: true })
    price!: number;
}

export const CustomBranchPriceSchema = SchemaFactory.createForClass(CustomBranchPrice);

// Nutritional Values Schema
@Schema({ _id: false })
export class NutritionalValues {
    @Prop({ type: Number, default: 1 })
    servingSize!: number;

    @Prop({ type: String, enum: ServingUnit, default: ServingUnit.SERVING })
    servingUnit!: ServingUnit;

    @Prop({ type: Number, default: 0 })
    calories!: number; // كيلو كالوري

    @Prop({ type: Number, default: 0 })
    protein!: number; // البروتين (غرام)

    @Prop({ type: Number, default: 0 })
    totalFat!: number; // الدهون الكلية (غرام)

    @Prop({ type: Number, default: 0 })
    saturatedFat!: number; // الدهون المشبعة (غرام)

    @Prop({ type: Number, default: 0 })
    transFat!: number; // الدهون المتحولة (غرام)

    @Prop({ type: Number, default: 0 })
    cholesterol!: number; // الكوليسترول (ملغرام)

    @Prop({ type: Number, default: 0 })
    sodium!: number; // الصوديوم (ملغرام)

    @Prop({ type: Number, default: 0 })
    salt!: number; // الملح (غرام)

    @Prop({ type: Number, default: 0 })
    carbohydrates!: number; // الكربوهيدرات (غرام)

    @Prop({ type: Number, default: 0 })
    fiber!: number; // الألياف (غرام)

    @Prop({ type: Number, default: 0 })
    totalSugars!: number; // مجموع السكريات (غرام)

    @Prop({ type: Number, default: 0 })
    addedSugars!: number; // السكريات المضافة (غرام)
}

export const NutritionalValuesSchema = SchemaFactory.createForClass(NutritionalValues);

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Product {
    @Prop({ required: true })
    name!: string; // الاسم

    @Prop({ type: String, required: false })
    secondaryName?: string; // الاسم الثانوي

    @Prop({ type: String, required: false })
    description?: string; // الوصف

    @Prop({ type: String, required: false })
    secondaryDescription?: string; // الوصف الثانوي

    @Prop({ type: Types.ObjectId, ref: 'ProductCategory', required: true })
    category!: Types.ObjectId; // التصنيف

    @Prop({ type: Boolean, default: false })
    isRetailProduct!: boolean; // منتج يباع بالتجزئة

    @Prop({ type: String, required: true, unique: true })
    referenceCode!: string; // كود التعريف

    @Prop({ type: String, enum: PricingMethod, required: true })
    pricingMethod!: PricingMethod; // طريقة التسعير

    @Prop({ type: Number, required: function(this: Product) {
        return this.pricingMethod === PricingMethod.FIXED;
    }})
    price?: number; // السعر (مطلوب إذا كان التسعير ثابت)

    @Prop({ type: Types.ObjectId, ref: 'TaxGroup', required: false })
    taxGroup?: Types.ObjectId; // مجموعة ضريبية

    @Prop({ type: String, enum: CostCalculationMethod, required: true })
    costCalculationMethod!: CostCalculationMethod; // طريقة حساب التكلفة

    @Prop({ type: Number, required: function(this: Product) {
        return this.costCalculationMethod === CostCalculationMethod.FIXED || this.pricingMethod === PricingMethod.FIXED;
    }})
    cost?: number; // التكلفة (مطلوبة إذا كان ثابت)

    @Prop({ type: String, enum: SaleMethod, required: true })
    saleMethod!: SaleMethod; // طريقة البيع

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }], default: [] })
    tags!: Types.ObjectId[]; // الوسوم

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Addition' }], default: [] })
    additions!: Types.ObjectId[]; // الإضافات
    
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Material' }], default: [] })
    ingredients!: Types.ObjectId[]; // المكونات

    @Prop({ type: [CustomBranchPriceSchema], default: [] })
    customBranchPrices!: CustomBranchPrice[]; // أسعار مخصصة للفروع

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
    inactiveBranches!: Types.ObjectId[]; // فروع غير نشطة   

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Branch' }], default: [] })
    outOfStockBranches!: Types.ObjectId[]; // فروع نفذت من المخزون

    @Prop({ type: [{ type: Types.ObjectId, ref: 'PriceTagApplies' }], default: [] })
    priceTagApplies!: Types.ObjectId[]; // وسوم الأسعار

    @Prop({ type: Types.ObjectId, ref: 'MenuGroup', required: false })
    menuGroup?: Types.ObjectId;

    @Prop({ type: Number, default: 5, min: 0 })
    walkTime!: number; // وقت المشي - الوقت المقدر لتوصيل المنتج للعميل (بالدقائق)

    @Prop({ type: NutritionalValuesSchema, required: false })
    nutritionalValues?: NutritionalValues; // القيم الغذائية

    @Prop({ type: Boolean, default: true })
    isActive!: boolean; // المنتج نشط

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean; // المنتج محذوف

    @Prop({ type: Boolean, default: false })
    containsHighSalt!: boolean; // يحتوي على نسبة عالية من الملح
}

export type ProductDocument = HydratedDocument<Product> & { _id: string };
export const ProductSchema = SchemaFactory.createForClass(Product);
export const PRODUCT_MODEL = 'Product';
export const ProductModel = MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
]);

export const getProductModel = (businessNumber: string): DataBaseRepository<ProductDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in Product model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    
    // Register all dependent models if not already registered
    if (!connection.models['MenuCategorySchema']) {
        connection.model('MenuCategorySchema', MenuCategorySchema);
    }
    if (!connection.models['TaxGroup']) {
        connection.model('TaxGroup', TaxGroupSchema);
    }
    if (!connection.models['Tag']) {
        connection.model('Tag', TagSchema); 
    }
    if (!connection.models['Material']) {
        connection.model('Material', MaterialsSchema);
    }
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }
    if (!connection.models['PriceTagApplies']) {
        connection.model('PriceTagApplies', PriceTagAppliesSchema);
    }
    if (!connection.models['Addition']) {
        connection.model('Addition', AdditionSchema);
    }
    if (!connection.models['MenuGroup']) {
        connection.model('MenuGroup', MenuGroupSchema);
    }
    const model = connection.models['Product'] || connection.model('Product', ProductSchema) as unknown as Model<ProductDocument>;
    return new DataBaseRepository<ProductDocument>(model);
} 