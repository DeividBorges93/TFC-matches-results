import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/login';
import LoginService from '../services/login';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const router = Router();

router.post('/login', validateLogin, loginController.create);

export default router;
