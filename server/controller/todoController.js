const express = require("express");
const router = express.Router();
const User = require("../model/user");
const path = require("path");
const jwt = require("jsonwebtoken");
const isAuthenticatedUser = require("../middleware/auth");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Task = require("../model/task");
router.post(
  "/create-task",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Access userId from req.user
      const userId = req.user._id;
      const { title, status, priority, deadline, description } = req.body;

      const newTask = new Task({
        userId,
        title,
        status,
        priority,
        deadline,
        description,
      });

      await newTask.save();

      res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      next(new ErrorHander(error.message, 500)); // Pass error to global error handler
    }
  })
);
router.get(
  "/all-tasks",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;

      const tasks = await Task.find({ userId });

      res.status(200).json({ tasks });
    } catch (error) {
      next(new ErrorHander(error.message, 500));
    }
  })
);

router.delete(
  "/delete-task/:taskId",
  catchAsyncErrors(async (req, res, next) => {
    const taskId = req.params.taskId;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return next(new ErrorHander("Task not found", 404));
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  })
);
router.put(
  "/update-task/:taskId",
  catchAsyncErrors(async (req, res, next) => {
    const taskId = req.params.taskId;
    const { title, status, priority, deadline, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, status, priority, deadline, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return next(new ErrorHander("Task not found", 404));
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  })
);
module.exports = router;
