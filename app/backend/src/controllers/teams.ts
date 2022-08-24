import { Request, Response } from 'express';
import TeamService from '../services/teams';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public findAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.findAll();

    return res.status(200).json(teams);
  };

  public findByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.findByPk(Number(id));

    return res.status(200).json(team);
  };
}
