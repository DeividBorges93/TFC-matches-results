import { Request, Response } from 'express';
import MatchesService from '../services/matches';

export default class MatchController {
  constructor(private matchService = new MatchesService()) {}

  public findAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.findAll();

    return res.status(200).json(matches);
  };
}
