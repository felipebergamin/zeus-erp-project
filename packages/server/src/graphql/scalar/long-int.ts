import { GraphQLScalarType } from 'graphql';

export const longIntResolverMap = {
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
