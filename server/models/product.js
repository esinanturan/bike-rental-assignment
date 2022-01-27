const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      model: DataTypes.STRING,
      color: DataTypes.STRING,
      location: DataTypes.STRING,
      rating: DataTypes.NUMBER,
      isAvailable: DataTypes.BOOLEAN,
      availabilityStartDate: DataTypes.DATE,
      availabilityEndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
