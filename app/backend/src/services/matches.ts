import { Op } from 'sequelize';
import IHomeTeams from '../interfaces/IHomeTeams';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import IReturnFindAndCountAllTeam from '../interfaces/IReturnFindAndCountAllTeam';

export default class MatchService {
  private _matches: IMatch[];
  private _matcheCreated: IMatch;
  private _result: number;
  private _teams: IReturnFindAndCountAllTeam;
  private _teamRankings: IHomeTeams[];
  private _homeTeams: TeamModel[];

  public findAll = async () => {
    this._matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return this._matches;
  };

  public isInProgress = async (inProgress: boolean) => {
    this._matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });

    return this._matches;
  };

  public findAndCountAll = async (teams: number[]) => {
    this._teams = await TeamModel.findAndCountAll({
      where: {
        id: {
          [Op.or]: [teams],
        },
      },
    });

    return this._teams.count;
  };
}
