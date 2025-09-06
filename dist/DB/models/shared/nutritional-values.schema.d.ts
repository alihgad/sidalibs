export declare class NutritionalValues {
    servingSize: number;
    servingUnit: string;
    calories: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    salt: number;
    carbohydrates: number;
    fiber: number;
    totalSugars: number;
    addedSugars: number;
}
export declare const NutritionalValuesSchema: import("mongoose").Schema<NutritionalValues, import("mongoose").Model<NutritionalValues, any, any, any, import("mongoose").Document<unknown, any, NutritionalValues, any, {}> & NutritionalValues & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NutritionalValues, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<NutritionalValues>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<NutritionalValues> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=nutritional-values.schema.d.ts.map