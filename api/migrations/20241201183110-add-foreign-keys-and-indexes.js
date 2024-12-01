'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'userId', {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.addConstraint('Orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_orders_user',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addIndex('Orders', ['tableNumber'], {
      name: 'idx_orders_tableNumber',
    });

    await queryInterface.addColumn('OrderItem', 'menuItemId', {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.addConstraint('OrderItem', {
      fields: ['menuItemId'],
      type: 'foreign key',
      name: 'fk_orderItem_menuItem',
      references: {
        table: 'MenuItem',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addIndex('MenuItem', ['name'], {
      name: 'idx_menuItem_name',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Orders', 'fk_orders_user');
    await queryInterface.removeColumn('Orders', 'userId');
    await queryInterface.removeIndex('Orders', 'idx_orders_tableNumber');
    await queryInterface.removeConstraint('OrderItem', 'fk_orderItem_menuItem');
    await queryInterface.removeColumn('OrderItem', 'menuItemId');
    await queryInterface.removeIndex('MenuItem', 'idx_menuItem_name');
  },
};
