const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
/**
 * @desc Get goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

/**
 * @desc set goals
 * @route POST /api/goals
 * @access Private
 *
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    // the middleware will handle
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

/**
 * @desc update goals
 * @route PUT /api/:id
 * @access Private
 *
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal creator
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});

/**
 * @desc delete goals
 * @route DELETE /api/:id
 * @access Private
 *
 */

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  try {
    const user = await User.findById(req.user.id);

    // check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // make sure the logged in user matches the goal creator
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    // remove()方法现在已经不用了
    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (e) {
    console.log("wrong when deleting");
  }
});
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
