import IHomeTeams from '../interfaces/IHomeTeams';
import IAwayTeams from '../interfaces/IAwayTeams';
import { totalGoalsHomeTeam, totalGoalsAwayTeam } from './calculateGoals';
import {
  allDraws,
  allLosses,
  allPoints,
  allWins,
  gamesWon,
} from './calculateMatchesResults';

export function homeTeamResults(team: IHomeTeams) {
  const allGoalsHomeTeam = totalGoalsHomeTeam(team);
  const totalVictories = allWins(team.homeTeamMatches);
  const totalDraws = allDraws(team.homeTeamMatches);
  const totalLosses = allLosses(team.homeTeamMatches);
  const totalPoints = allPoints(totalVictories, totalLosses, totalDraws);
  const efficiency = gamesWon(totalPoints, team.homeTeamMatches?.length);

  return {
    name: team.teamName,
    totalPoints,
    totalGames: team.homeTeamMatches?.length,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor: allGoalsHomeTeam.totalFavorGoals,
    goalsOwn: allGoalsHomeTeam.totalConcededGoals,
    goalsBalance: allGoalsHomeTeam.totalDifferenceGoals,
    efficiency,
  };
}

export function awayTeamResults(team: IAwayTeams) {
  const allGoalsAwayTeam = totalGoalsAwayTeam(team);
  const totalVictories = allLosses(team.awayTeamMatches);
  const totalDraws = allDraws(team.awayTeamMatches);
  const totalLosses = allWins(team.awayTeamMatches);
  const totalPoints = allPoints(totalVictories, totalLosses, totalDraws);
  const efficiency = gamesWon(totalPoints, team.awayTeamMatches?.length);

  return {
    name: team.teamName,
    totalPoints,
    totalGames: team.awayTeamMatches?.length,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor: allGoalsAwayTeam.totalFavorGoals,
    goalsOwn: allGoalsAwayTeam.totalConcededGoals,
    goalsBalance: allGoalsAwayTeam.totalDifferenceGoals,
    efficiency,
  };
}
