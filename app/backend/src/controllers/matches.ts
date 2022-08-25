import { Request, Response } from 'express';
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
}
