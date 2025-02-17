import { Router } from 'express';
import { signOut, singIn, singUp } from '../controllers/auth.controller.js';

const authRouter = Router();

// path:/api/v1/auth
authRouter.route('/sign-up').post(singUp);
authRouter.route('/sign-in').post(singIn);
authRouter.route('/sign-out').post(signOut);

export default authRouter;
