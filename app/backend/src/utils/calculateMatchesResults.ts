import IGoals from '../interfaces/IGoals';

export function allWins(homeTeamMatches:IGoals[]) {
  return homeTeamMatches?.map((data) => {
    let wins = 0;
    if (data.homeTeamGoals > data.awayTeamGoals) wins += 1;

    return wins;
  }).reduce((initial, current) => initial + current, 0);
}

export function allDraws(homeTeamMatches:IGoals[]) {
  return homeTeamMatches?.map((data) => {
    let draws = 0;
    if (data.homeTeamGoals === data.awayTeamGoals) draws += 1;

    return draws;
  }).reduce((initial, current) => initial + current, 0);
}

export function allLosses(homeTeamMatches:IGoals[]) {
  return homeTeamMatches?.map((data) => {
    let defeats = 0;
    if (data.awayTeamGoals > data.homeTeamGoals) defeats += 1;

    return defeats;
  }).reduce((initial, current) => initial + current, 0);
}

export function allPoints(victories = 0, defeats = 0, draws = 0) {
  const VP = victories * 3;
  const DP = defeats * 0;
  const TP = draws;

  return VP + DP + TP;
}

export function gamesWon(totalPoints:number, totalGames = 0) {
  return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
}
