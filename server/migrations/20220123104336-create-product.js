module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.NUMBER,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
      },
      availabilityStartDate: {
        type: Sequelize.DATE,
      },
      availabilityEndDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
