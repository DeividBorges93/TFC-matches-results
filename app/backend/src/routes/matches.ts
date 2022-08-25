import { Router } from 'express';
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = Router();

router.get('/matches', matchesController.findAll);
router.post('/matches', matchesController.newMatch);
router.patch('/matches/:id/finish', matchesController.gameOver);

export default router;
