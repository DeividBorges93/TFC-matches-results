import { Router } from 'express';
import MatchesController from '../controllers/matches';

const matchesController = new MatchesController();

const router = Router();

router.get('/matches', matchesController.findAll);
// router.get('/matches/:id', matchesController.findByPk);

export default router;
