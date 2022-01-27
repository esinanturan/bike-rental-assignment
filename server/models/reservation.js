const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Reservation.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Reservation.init(
    {
      productId: DataTypes.NUMBER,
      userId: DataTypes.NUMBER,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
