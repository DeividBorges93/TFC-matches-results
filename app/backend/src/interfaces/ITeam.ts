import IGoals from './IGoals';

export default interface ITeam {
  id?: number,
  teamName: string,
  homeTeamMatches?: IGoals[]
  awayTeamMatches?: IGoals[]
}
