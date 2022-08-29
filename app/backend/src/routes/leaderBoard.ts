import { Router } from 'express';
import MatchController from '../controllers/matches';

const matcheController = new MatchController();

const router = Router();

router.get('/leaderboard/home', matcheController.homeTeamRankings);
router.get('/leaderboard/away', matcheController.awayTeamRankings);

export default router;
