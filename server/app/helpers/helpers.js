const { Op } = require('sequelize');

async function findBy(model, columnName, value) {
  try {
    console.log(model, columnName, value)
    const result = await model.findOne({
      where: {
        [columnName]: {
          [Op.eq]: value
        }
      }
    });
    return result;
  } catch (error) {
    throw new Error(`Error finding ${model.name}: ${error.message}`);
  }
}

module.exports = findBy;