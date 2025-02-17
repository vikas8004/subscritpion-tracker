import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscriptions.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.route('/').post(authorize,createSubscription);
subscriptionRouter.route('/').get((req, res) => {
  return res.status(200).json({ message: 'get all subscriptions' });
});
subscriptionRouter.route('/:id').get((req, res) => {
  return res.status(200).json({ message: 'get subscription details', id: req.params.id });
});
subscriptionRouter.route('/:id').put((req, res) => {
  return res.status(200).json({ message: 'update a subscription', id: req.params.id });
});
subscriptionRouter.route('/:id').delete((req, res) => {
  return res.status(200).json({ message: 'subscription deleted successfully', id: req.params.id });
});
subscriptionRouter.route('/user/:id').get(authorize,getUserSubscriptions);
subscriptionRouter.route('/:id/cancel').put((req, res) => {
  return res.status(200).json({ message: 'cancel a subscription', id: req.params.id });
});
subscriptionRouter.route('/upcoming-renewals').get((req, res) => {
  return res.status(200).json({ message: 'get upcoming renewals' });
});

export default subscriptionRouter;
