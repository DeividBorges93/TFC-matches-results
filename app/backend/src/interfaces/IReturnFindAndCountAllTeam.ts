import TeamModel from '../database/models/team';

export default interface IReturnFindAndCountAllTeam {
  rows: TeamModel[];
  count: number;
}
