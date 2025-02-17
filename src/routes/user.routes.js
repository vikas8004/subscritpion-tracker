import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.route('/').get(getUsers);
userRouter.route('/:id').get(authorize,getUser);
userRouter.route('/').post((req, res) => {
  return res.status(201).json({ message: 'create a user' });
});
userRouter.route('/:id').put((req, res) => {
  return res.status(200).json({ message: 'update a user', id: req.params.id });
});
userRouter.route('/:id').delete((req, res) => {
  return res
    .status(200)
    .json({ message: 'user deleted successfully', id: req.params.id });
});

export default userRouter;
