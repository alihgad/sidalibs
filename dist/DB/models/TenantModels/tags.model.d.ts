import { HydratedDocument, Model } from 'mongoose';
import { DataBaseRepository } from '../../DataBase.repository';
import { TagType } from '../../../common/type';
export declare class Tag {
    type: TagType;
    name: string;
    secondName: string;
    isDeleted: boolean;
}
export type TagDocument = HydratedDocument<Tag> & {
    _id: string;
};
export declare const TagSchema: import("mongoose").Schema<Tag, Model<Tag, any, any, any, import("mongoose").Document<unknown, any, Tag, any> & Tag & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tag, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Tag>, {}> & import("mongoose").FlatRecord<Tag> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TAG_MODEL = "Tag";
export declare const TagModel: import("@nestjs/common").DynamicModule;
export declare const getTagModel: (businessNumber: string) => DataBaseRepository<TagDocument>;
//# sourceMappingURL=tags.model.d.ts.map