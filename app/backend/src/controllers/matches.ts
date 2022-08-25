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
    const createdMatch = await this.matchService.create(req.body, req.headers.authorization);

    if (createdMatch.code) {
      next(createdMatch);
      return;
    }

    return res.status(201).json(createdMatch);
  };

  public gameOver = async (req:Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.gameOver(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}
