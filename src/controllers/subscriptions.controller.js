import Subscriptions from '../models/subscriptions.model.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscriptions.create({
      ...req.body,
      user: req.user._id,
    });
    if (!subscription) {
      const error = new Error('Internal server error');
      error.statusCode = 500;
      throw error;
    }
    res.status(201).json({
      message: 'Subscription created successfully',
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

// getting user subscription
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.statusCode = 403;
      throw error;
    }
    const subscriptions = await Subscriptions.find({ user: req.params.id });
    res.status(200).json({
      message: 'User subscriptions retrieved successfully',
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    next(error);
  }
};
