import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'section'
})
export class Section {
    @Prop({ type: String, unique: true })
    name!: string;

    @Prop({ type: String })
    seconderyName?: string;

    @Prop({ type: Types.ObjectId, ref: 'Branch' })
    branchId!: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isDeleted!: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy!: Types.ObjectId;

    // Timestamps (automatically added by Mongoose)
    createdAt?: Date;
    updatedAt?: Date;
}

export type SectionDocument = HydratedDocument<Section>;
export const SectionSchema = SchemaFactory.createForClass(Section);



export const SECTION_MODEL = 'SECTION_MODEL';
export const SectionModel = MongooseModule.forFeature([
    { name: 'Section', schema: SectionSchema }
]);

export const getSectionModel = (businessNumber: string): DataBaseRepository<SectionDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in section model")
    }
    let connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Section'] || connection.model('Section', SectionSchema) as unknown as Model<SectionDocument>;
    return new DataBaseRepository<SectionDocument>(model);
}
