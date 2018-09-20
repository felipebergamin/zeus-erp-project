import { Op } from 'sequelize';

export const applyLikeOp = (queryObj) => (field) => {
  if (queryObj[field]) {
    queryObj[field] = {
      [Op.like]: `%${queryObj[field]}%`,
    };
  }
};
