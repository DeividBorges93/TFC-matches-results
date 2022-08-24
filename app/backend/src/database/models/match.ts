import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  private readonly id?: number;
  private readonly homeTeam: number;
  private readonly homeTeamGoals: number;
  private readonly awayTeam: number;
  private readonly awayTeamGoals: number;
  private readonly inProgress: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

export default Match;
