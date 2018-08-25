import { GraphQLScalarType } from 'graphql';
import { GraphQLUpload  } from 'apollo-upload-server';

export const longIntResolverMap = {
  Upload: GraphQLUpload,

  LongInt: new GraphQLScalarType({
    description: 'Integer values',
    name: 'LongInt',
    parseValue(value) {
      return parseInt(value, 10);
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return parseInt(ast['value'], 10);
    }
  })
};
