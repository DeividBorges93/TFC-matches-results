import { Op } from 'sequelize';
import IError from '../interfaces/IError';
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

  public newMatch =
  async (newMatch: IMatch): Promise<IMatch | IError> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;

    const message = 'It is not possible to create a match with two equal teams';
    if (homeTeam === awayTeam) return { code: 401, message };

    const result = await this.findAndCountAll([homeTeam, awayTeam]);
    if (result !== 2) return { code: 404, message: 'There is no team with such id!' };

    this._matcheCreated = await MatchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return this._matcheCreated as IMatch;
  };

  public gameOver = async (id: number) => {
    [this._result] = await MatchModel.update({ inProgress: false }, { where: { id } });

    return this._result;
  };
}
