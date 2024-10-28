module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        comandaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Comandas',
                key: 'id'
            }
        }
    })
    //verificar se é necessario incluir mais

    Item.associate = models => {
        // Associação de N:1 com o modelo Comanda
        Item.belongsTo(models.Comanda, { foreignKey: 'comandaId' })
    }

    return Item
}