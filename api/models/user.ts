import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;

    static associate(models: any) {
      User.hasMany(models.Order, { foreignKey: 'waiterId' });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};