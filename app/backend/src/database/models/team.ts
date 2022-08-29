import { STRING, INTEGER, Model } from 'sequelize';
import IGoals from '../../interfaces/IGoals';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
  homeTeamMatches?: IGoals[];
  awayTeamMatches?: IGoals[];
}

Team.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
