import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getOfflineUserById, isDatabaseAuthError } from "../utils/offlineAuthStore.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Authentication token is required");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let user;

  if (mongoose.connection.readyState !== 1) {
    user = await getOfflineUserById(decoded.id);
  } else {
    try {
      user = await User.findById(decoded.id);
    } catch (error) {
      if (!isDatabaseAuthError(error)) {
        throw error;
      }

      user = await getOfflineUserById(decoded.id);
    }
  }

  if (!user) {
    const offlineUser = await getOfflineUserById(decoded.id);

    if (!offlineUser) {
      res.status(401);
      throw new Error("User no longer exists");
    }

    user = offlineUser;
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      next(new Error("You do not have permission to access this resource"));
      return;
    }

    next();
  };
};
