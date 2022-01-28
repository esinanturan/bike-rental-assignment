const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Rating.init(
    {
      productId: DataTypes.NUMBER,
      userId: DataTypes.NUMBER,
      rate: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
