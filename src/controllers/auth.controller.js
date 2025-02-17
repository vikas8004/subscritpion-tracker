//KEEP IN MIND WHENEVER U ARE USING A SESSION U HAVE TO PASS AN ARRAY TO THE CREATE METHOD NOT NORMAL OBJECT
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bacryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../env.js';
import validateEmailUsingArcjet from '../config/arcjetEmail.config.js';

export const singUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, password, name } = req.body;
    // check if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists.');
      error.statusCode = 409; //already exists (409)
      throw error;
    }

    // validating the email
    const decision = await validateEmailUsingArcjet.protect(req, { email });
    // console.log(decision);
    
    if (decision.isDenied()) {
      console.log('decision', decision);
      const error = new Error('Email is not valid..');
      error.statusCode = 403;
      throw error;
    }

    // hashing the pass
    const salt = await bacryptjs.genSalt(10);
    const hashedPass = await bacryptjs.hash(password, salt);
    const newUsers = await User.create(
      [{ name, email, password: hashedPass }],
      { session }
    );
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const singIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const error = new Error('User not found...');
      error.statusCode = 404;
      throw error;
    }

    // matching the pass
    const isValidPass = await bacryptjs.compare(password, foundUser.password);

    if (!isValidPass) {
      const error = new Error('Invalid credentials...');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: foundUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user: foundUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
