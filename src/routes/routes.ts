import { Router } from 'express';
import { HelloController } from '../controllers/HelloController';

const router = Router();

router.get('/hello', new HelloController().Hello);

export default router;
