import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchController {
  constructor(private matchService = new MatchesService()) {}

  public findAll = async (req: Request, res: Response) => {
    let matches;

    const { inProgress } = req.query;

    if (!inProgress) matches = await this.matchService.findAll();
    else {
      const progressTrue = inProgress === 'true';
      matches = await this.matchService.isInProgress(progressTrue);
    }

    return res.status(200).json(matches);
  };

  public newMatch = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.matchService.newMatch(req.body);

    if (result.code) {
      next(result);
      return;
    }

    return res.status(201).json(result);
  };

  public changeScore = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matchService.changeScore({ id, homeTeamGoals, awayTeamGoals });

    return res.status(200).json({ message: 'score changed' });
  };

  public gameOver = async (req:Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.gameOver(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  public homeTeamRankings = async (_req: Request, res: Response) => {
    const matches = await this.matchService.homeTeamRankings();

    return res.status(200).json(matches);
  };

  public awayTeamRankings = async (_req: Request, res: Response) => {
    const matches = await this.matchService.awayTeamRankings();

    return res.status(200).json(matches);
  };
}
