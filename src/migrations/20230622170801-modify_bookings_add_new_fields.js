"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "Bookings", //table name in which we want to add new column
      "numberOfSeats", // new column name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }
    );

    await queryInterface.addColumn(
      "Bookings", //table name in which we want to add new column
      "totalCost", // new column name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Bookings", "numberOfSeats");
    await queryInterface.removeColumn("Bookings", "totalCost");
  },
};
