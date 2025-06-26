import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { ConnectionManager } from '../../connection.manager';
import { TagType } from '../../../common/type';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Tag {
    @Prop({ type: String, enum: Object.values(TagType), required: true })
    type!: TagType; // نوع الوسم

    @Prop({ required: true })
    name!: string; // الاسم الأول

    @Prop({ required: true })
    secondName!: string; // الاسم الثانوي

    @Prop({ default: false })
    isDeleted!: boolean; // محذوف
}

export type TagDocument = HydratedDocument<Tag> & { _id: string };
export const TagSchema = SchemaFactory.createForClass(Tag);
export const TAG_MODEL = 'Tag';
export const TagModel = MongooseModule.forFeature([
    { name: Tag.name, schema: TagSchema },
]);

export const getTagModel = (businessNumber: string): DataBaseRepository<TagDocument> => {
    if (!businessNumber) {
        throw new Error("businessNumber is required in tag model")
    }
    const connection = ConnectionManager.getConnection(businessNumber);
    const model = connection.models['Tag'] || connection.model('Tag', TagSchema) as unknown as Model<TagDocument>;
    return new DataBaseRepository<TagDocument>(model);
}