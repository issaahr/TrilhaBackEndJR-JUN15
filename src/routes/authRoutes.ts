import { Router } from 'express';
import { AuthController } from '../controllers';

const authRouter = Router();

authRouter.post('/auth', new AuthController().login);

export default authRouter;
