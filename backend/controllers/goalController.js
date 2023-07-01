/**
 * @desc Get goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = (req, res) => {
  console.log(11);
  res.status(200).json({ message: "get Goals" });
};

/**
 * @desc set goals
 * @route POST /api/goals
 * @access Private
 *
 */
const setGoal = (req, res) => {
  res.status(200).json({ message: "set Goal" });
};

/**
 * @desc update goals
 * @route PUT /api/:id
 * @access Private
 *
 */
const updateGoal = (req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` });
};

/**
 * @desc delete goals
 * @route DELETE /api/:id
 * @access Private
 *
 */

const deleteGoal = (req, res) => {
  res.status(200).json({ message: `delete goal ${req.params.id}` });
};
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
