module.exports = (sequelize, DataTypes) => {
    const Comanda = sequelize.define('Comanda', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mesa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    //verificar se precisa de mais

    Comanda.associate = models => {
        // Associação de 1:N com o modelo Item
        Comanda.hasMany(models.Item, { foreignKey: 'comandaId' })
    }

    return Comanda
}