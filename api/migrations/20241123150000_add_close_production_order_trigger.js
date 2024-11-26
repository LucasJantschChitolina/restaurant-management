'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION close_production_orders()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.status = 'CLOSED' THEN
              UPDATE "ProductionOrders"
              SET status = 'CANCELLED'
              WHERE "orderId" = NEW.id;
          END IF;

          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_close_production_orders
      AFTER UPDATE OF status ON "Orders"
      FOR EACH ROW
      EXECUTE FUNCTION close_production_orders();
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_close_production_orders ON "Orders";
    `);

    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS close_production_orders();
    `);
  }
};