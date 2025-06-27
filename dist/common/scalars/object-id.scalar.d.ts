import { GraphQLScalarType } from 'graphql';
import { Types } from 'mongoose';
export declare const ObjectIdScalarType: GraphQLScalarType<Types.ObjectId, string>;
export declare const ObjectIdScalar: {
    provide: string;
    useValue: GraphQLScalarType<Types.ObjectId, string>;
};
//# sourceMappingURL=object-id.scalar.d.ts.map