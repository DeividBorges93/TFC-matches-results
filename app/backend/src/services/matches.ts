import IHomeTeams from '../interfaces/IHomeTeams';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import IReturnFindAndCountAllTeam from '../interfaces/IReturnFindAndCountAllTeam';

export default class MatchService {
  private _matches: MatchModel[];
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
}
