import { isBoolean, isEmpty, isNil, pickBy, negate } from 'lodash';

export const clearFalsyProps = (obj): any => {
  const isNilOrEmpty = value => {
    return (isNil(value) || isEmpty(value)) && !isBoolean(value);
  };

  return pickBy(obj, negate(isNilOrEmpty));
};
