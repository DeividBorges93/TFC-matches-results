import TeamModel from '../database/models/team';
import ITeam from '../interfaces/Iteam';

export default class TeamService {
  public findAll = async (): Promise<ITeam[]> => TeamModel.findAll();

  public findByPk = async (id: number): Promise<ITeam | null> => TeamModel.findByPk(id);
}
