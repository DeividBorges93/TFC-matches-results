import { Router } from 'express';
import LoginController from '../controllers/login';

const loginController = new LoginController();

const router = Router();

router.get('/login/validate', loginController.validate);
router.post('/login', loginController.login);

export default router;
