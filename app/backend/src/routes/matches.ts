import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = Router();

router.get('/matches', matchesController.findAll);
router.post('/matches', authMiddleware, matchesController.newMatch);
router.patch('/matches/:id/finish', matchesController.gameOver);

export default router;
