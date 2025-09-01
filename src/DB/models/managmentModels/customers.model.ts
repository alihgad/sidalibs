/* eslint-disable prettier/prettier */
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { Hash } from '../../../secuirty/Hash.helper';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { rolesSchema } from './roles.model';
import { BranchSchema } from '../TenantModels/branch.model';
import { CryptoExporter } from '../../../secuirty/crypto.exporter';
import { languages } from '../../../common/type';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class customers {
    constructor(
        name: string,
        phone: string,
        totalOrders: number = 0,
        favoriteBranch: Types.ObjectId,
        accountBalance: number = 0,
        isDeleted: boolean = false,
        isBlacklisted: boolean = false,
        creditAccount: boolean = false,
        favoriteItem: Types.ObjectId,
        notes?: string,
        lastOrder?: Date
    ) {
        this.name = name;
        this.phone = phone;
        this.totalOrders = totalOrders;
        this.favoriteBranch = favoriteBranch;
        this.favoriteItem = favoriteItem;
        this.lastOrder = lastOrder;
        this.accountBalance = accountBalance;
        this.isDeleted = isDeleted;
        this.isBlacklisted = isBlacklisted;
        this.creditAccount = creditAccount;
        this.notes = notes;
    }

    @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
    name: string;

    @Prop({ type: String, required: true })
    email?: string;

    @Prop({ type: String, required: true, })
    phone: string;

    @Prop({ type: Number, default: 0 })
    totalOrders: number;

    @Prop({ type: Date, required: false })
    lastOrder?: Date;

    @Prop({ type: Number, default: 0 })
    accountBalance: number;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

    @Prop({ type: Boolean, default: false })
    isBlacklisted: boolean;

    @Prop({ type: Boolean, default: false })
    creditAccount: boolean;

    @Prop({ type: Types.ObjectId, ref: 'Branch' })
    favoriteBranch: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product' })
    favoriteItem: Types.ObjectId;

    @Prop({ type: String, required: false })
    notes?: string;

}

export type customersDocument = HydratedDocument<customers>;
export const customersSchema = SchemaFactory.createForClass(customers);
export const customers_MODEL = 'customers_MODEL';
export const customersModel = MongooseModule.forFeature([{ name: 'customers', schema: customersSchema }]);

// customersSchema.pre("save", function (next) {
//     if (this.isModified('phone')) {
//         if (this.phone !== undefined) {
//             this.phone = CryptoExporter.encrypt(this.phone, process.env.CRYPTO_SECRET) as string;
//         }
//     }
//     next();
// })
export const getcustomersModel = (businessNumber: string): DataBaseRepository<customersDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in customers model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    
    // تسجيل الـ models المطلوبة للـ refs
    if (!connection.models['Branch']) {
        connection.model('Branch', BranchSchema);
    }
    // Note: Product model registration will be handled by its own getModel function when needed
    
    const model = connection.models['customers'] || connection.model('customers', customersSchema) as unknown as Model<customersDocument>;
    return new DataBaseRepository<customersDocument>(model);
}
