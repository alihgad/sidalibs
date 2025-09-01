import { GraphQLScalarType, Kind } from 'graphql';
import { Types } from 'mongoose';

export const ObjectIdScalarType = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId scalar type',
  serialize(value: any): string {
    if (value instanceof Types.ObjectId) {
      return value.toHexString();
    }
    return value;
  },
  parseValue(value: any): Types.ObjectId {
    return new Types.ObjectId(value);
  },
  parseLiteral(ast: any): Types.ObjectId {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value);
    }
    return new Types.ObjectId();
  },
});

export const ObjectIdScalar = {
  provide: 'ObjectIdScalar',
  useValue: ObjectIdScalarType
}; 