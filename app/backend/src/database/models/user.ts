import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

UserModel.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default UserModel;
