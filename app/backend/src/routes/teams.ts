import { Router } from 'express';
import TeamController from '../controllers/teams';

const teamController = new TeamController();

const router = Router();

router.get('/teams', teamController.findAll);
router.get('/teams/:id', teamController.findByPk);

export default router;
