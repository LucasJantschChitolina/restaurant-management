'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('OrderItems', 'fk_orderItems_menuItem');
      await queryInterface.removeConstraint('Orders', 'fk_orders_waiter');
      await queryInterface.removeConstraint('OrderItems', 'fk_orderItems_order');
      await queryInterface.removeConstraint('ProductionOrders', 'fk_productionOrders_order');
      await queryInterface.removeConstraint('ProductionOrders', 'fk_productionOrders_orderItem');
    } catch (error) {
      console.log('Some constraints might not exist yet');
    }

    await queryInterface.changeColumn('MenuItems', 'id', {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    });

    try {
      await queryInterface.addConstraint('MenuItems', {
        fields: ['id'],
        type: 'primary key',
        name: 'menuItems_pkey'
      });
    } catch (error) {
      console.log('Primary key might already exist on MenuItems');
    }

    const constraints = [
      {
        table: 'OrderItems',
        field: 'menuItemId',
        name: 'fk_orderItems_menuItem',
        references: {
          table: 'MenuItems',
          field: 'id'
        }
      },
      {
        table: 'Orders',
        field: 'waiterId',
        name: 'fk_orders_waiter',
        references: {
          table: 'user',
          field: 'id'
        }
      },
      {
        table: 'OrderItems',
        field: 'orderId',
        name: 'fk_orderItems_order',
        references: {
          table: 'Orders',
          field: 'id'
        }
      },
      {
        table: 'ProductionOrders',
        field: 'orderId',
        name: 'fk_productionOrders_order',
        references: {
          table: 'Orders',
          field: 'id'
        }
      },
      {
        table: 'ProductionOrders',
        field: 'orderItemId',
        name: 'fk_productionOrders_orderItem',
        references: {
          table: 'OrderItems',
          field: 'id'
        }
      }
    ];

    for (const constraint of constraints) {
      try {
        await queryInterface.addConstraint(constraint.table, {
          fields: [constraint.field],
          type: 'foreign key',
          name: constraint.name,
          references: constraint.references,
          onUpdate: 'CASCADE'
        });
      } catch (error) {
        console.log(`Error adding constraint ${constraint.name}:`, error.message);
      }
    }

    const indexes = [
      { table: 'Orders', fields: ['waiterId'], name: 'idx_orders_waiterId' },
      { table: 'OrderItems', fields: ['orderId'], name: 'idx_orderItems_orderId' },
      { table: 'OrderItems', fields: ['menuItemId'], name: 'idx_orderItems_menuItemId' },
      { table: 'ProductionOrders', fields: ['orderId'], name: 'idx_productionOrders_orderId' },
      { table: 'ProductionOrders', fields: ['orderItemId'], name: 'idx_productionOrders_orderItemId' }
    ];

    for (const index of indexes) {
      try {
        await queryInterface.addIndex(index.table, index.fields, {
          name: index.name
        });
      } catch (error) {
        console.log(`Error adding index ${index.name}:`, error.message);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const indexes = [
      'idx_orders_waiterId',
      'idx_orderItems_orderId',
      'idx_orderItems_menuItemId',
      'idx_productionOrders_orderId',
      'idx_productionOrders_orderItemId'
    ];

    for (const indexName of indexes) {
      try {
        await queryInterface.removeIndex('Orders', indexName);
      } catch (error) {
        console.log(`Error removing index ${indexName}:`, error.message);
      }
    }

    const constraints = [
      { table: 'Orders', name: 'fk_orders_waiter' },
      { table: 'OrderItems', name: 'fk_orderItems_order' },
      { table: 'OrderItems', name: 'fk_orderItems_menuItem' },
      { table: 'ProductionOrders', name: 'fk_productionOrders_order' },
      { table: 'ProductionOrders', name: 'fk_productionOrders_orderItem' }
    ];

    for (const constraint of constraints) {
      try {
        await queryInterface.removeConstraint(constraint.table, constraint.name);
      } catch (error) {
        console.log(`Error removing constraint ${constraint.name}:`, error.message);
      }
    }
  }
};