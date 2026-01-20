const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const { protect } = require("../middleware/auth");

/**
 * Admin creates a queue
 */
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  const queue = await Queue.create({
    name: req.body.name,
    admin: req.user._id,
  });

  res.status(201).json(queue);
});

/**
 * Get all queues
 */
router.get("/", protect, async (req, res) => {
  const queues = await Queue.find().populate("admin", "name email");
  res.json(queues);
});

/**
 * User joins a queue
 */
router.post("/:queueId/join", protect, async (req, res) => {
  const queue = await Queue.findById(req.params.queueId);
  if (!queue) return res.status(404).json({ message: "Queue not found" });

  const alreadyJoined = queue.users.find(
    (u) => u.user.toString() === req.user._id.toString()
  );

  if (alreadyJoined) {
    return res.status(400).json({ message: "Already in queue" });
  }

  queue.users.push({ user: req.user._id });
  await queue.save();

  // 🔴 Emit live update
  const io = req.app.get("io");
  if (io) {
    io.to(req.params.queueId).emit("queueUpdated", queue);
  }

  res.json(queue);
});

/**
 * User leaves a queue
 */
router.post("/:queueId/leave", protect, async (req, res) => {
  const queue = await Queue.findById(req.params.queueId);
  if (!queue) return res.status(404).json({ message: "Queue not found" });

  queue.users = queue.users.filter(
    (u) => u.user.toString() !== req.user._id.toString()
  );

  await queue.save();

  // 🔴 Emit live update
  const io = req.app.get("io");
  if (io) {
    io.to(req.params.queueId).emit("queueUpdated", queue);
  }

  res.json(queue);
});

/**
 * Get current user's position in a queue
 */
router.get("/:queueId/position", protect, async (req, res) => {
  const queue = await Queue.findById(req.params.queueId);
  if (!queue) {
    return res.status(404).json({ message: "Queue not found" });
  }

  const index = queue.users.findIndex(
    (u) => u.user.toString() === req.user._id.toString()
  );

  if (index === -1) {
    return res.status(400).json({ message: "User not in queue" });
  }

  res.json({
    queueName: queue.name,
    position: index + 1,           // index starts from 0
    totalUsers: queue.users.length,
  });
});


module.exports = router;
