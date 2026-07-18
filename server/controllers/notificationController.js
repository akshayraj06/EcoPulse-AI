import Notification from "../models/Notification.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    $or: [{ user: req.user._id }, { user: null }],
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    notifications,
  });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();

  res.json({
    success: true,
    notification,
  });
});
