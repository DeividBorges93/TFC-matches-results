import IAwayTeams from '../interfaces/IAwayTeams';
import IHomeTeams from '../interfaces/IHomeTeams';
import IGoals from '../interfaces/IGoals';

function favorGoals(homeTeamGoals:IGoals[]) {
  return homeTeamGoals?.reduce((initial, current) => initial + current.homeTeamGoals, 0);
}

function concededGoals(awayTeamGoals:IGoals[]) {
  return awayTeamGoals?.reduce((initial, current) => initial + current.awayTeamGoals, 0);
}

function differenceGoals(homeTeamGoals = 0, awayTeamGoals = 0) {
  return homeTeamGoals - awayTeamGoals;
}

export function totalGoalsHomeTeam(team: IHomeTeams) {
  const totalFavorGoals = favorGoals(team.homeTeamMatches);
  const totalConcededGoals = concededGoals(team.homeTeamMatches);
  const totalDifferenceGoals = differenceGoals(totalFavorGoals, totalConcededGoals);

  return { totalFavorGoals, totalConcededGoals, totalDifferenceGoals };
}

export function totalGoalsAwayTeam(team: IAwayTeams) {
  const totalFavorGoals = concededGoals(team.awayTeamMatches);
  const totalConcededGoals = favorGoals(team.awayTeamMatches);
  const totalDifferenceGoals = differenceGoals(totalFavorGoals, totalConcededGoals);

  return { totalFavorGoals, totalConcededGoals, totalDifferenceGoals };
}
