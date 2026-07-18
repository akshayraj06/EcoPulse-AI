import mongoose from "mongoose";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import {
  isDatabaseAuthError,
  loginOfflineUser,
  registerOfflineUser,
} from "../utils/offlineAuthStore.js";

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    success: true,
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = "citizen" } = req.body;

  if (mongoose.connection.readyState !== 1) {
    const user = await registerOfflineUser({ name, email, password, role });
    sendAuthResponse(res, 201, user);
    return;
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    if (!isDatabaseAuthError(error)) {
      throw error;
    }

    const user = await registerOfflineUser({ name, email, password, role });
    sendAuthResponse(res, 201, user);
    return;
  }

  if (existingUser) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }

  let user;

  try {
    user = await User.create({
      name,
      email,
      password,
      role,
    });
  } catch (error) {
    if (!isDatabaseAuthError(error)) {
      throw error;
    }

    user = await registerOfflineUser({ name, email, password, role });
  }

  sendAuthResponse(res, 201, user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (mongoose.connection.readyState !== 1) {
    const user = await loginOfflineUser({ email, password });
    sendAuthResponse(res, 200, user);
    return;
  }

  let user;

  try {
    user = await User.findOne({ email }).select("+password");
  } catch (error) {
    if (!isDatabaseAuthError(error)) {
      throw error;
    }

    const offlineUser = await loginOfflineUser({ email, password });
    sendAuthResponse(res, 200, offlineUser);
    return;
  }

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  sendAuthResponse(res, 200, user);
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
