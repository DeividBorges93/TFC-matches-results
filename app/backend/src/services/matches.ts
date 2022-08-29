import { Op } from 'sequelize';
import IError from '../interfaces/IError';
import IHomeTeams from '../interfaces/IHomeTeams';
import IAwayTeams from '../interfaces/IAwayTeams';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import IReturnFindAndCountAllTeam from '../interfaces/IReturnFindAndCountAllTeam';
import IGoals from '../interfaces/IGoals';
import { homeTeamResults, awayTeamResults } from '../utils/calculateTeamsResults';

export default class MatchService {
  private _matches: IMatch[];
  private _matcheCreated: IMatch;
  private _result: number;
  private _teams: IReturnFindAndCountAllTeam;
  private _teamRankings: IHomeTeams[] | IAwayTeams[];
  private _homeTeams: ITeam[];
  private _awayTeams: ITeam[];

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

  public changeScore = async (goals: IGoals) => {
    const { id, homeTeamGoals, awayTeamGoals } = goals;
    [this._result] = await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return this._result;
  };

  public gameOver = async (id: number) => {
    [this._result] = await MatchModel.update({ inProgress: false }, { where: { id } });

    return this._result;
  };

  private getAllHomeTeams = async () => {
    this._homeTeams = await TeamModel.findAll({
      attributes: { exclude: ['id'] },
      include: [{
        model: MatchModel,
        as: 'homeTeamMatches',
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
        where: { inProgress: false },
      }],
    });

    return this._homeTeams.map((team) => ({
      teamName: team.teamName,
      homeTeamMatches: team.homeTeamMatches,
    }));
  };

  public homeTeamRankings = async () => {
    this._teamRankings = (await this.getAllHomeTeams()) as IHomeTeams[];

    const result = this._teamRankings.map((team) => homeTeamResults(team));

    return result
      .sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  private getAllAwayTeams = async () => {
    this._awayTeams = await TeamModel.findAll({
      attributes: { exclude: ['id'] },
      include: [{
        model: MatchModel,
        as: 'awayTeamMatches',
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
        where: { inProgress: false },
      }],
    });

    return this._awayTeams.map((team) => ({
      teamName: team.teamName,
      awayTeamMatches: team.awayTeamMatches,
    }));
  };

  public awayTeamRankings = async () => {
    this._teamRankings = (await this.getAllAwayTeams()) as IAwayTeams[];

    const result = this._teamRankings.map((team) => awayTeamResults(team));

    return result
      .sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };
}
