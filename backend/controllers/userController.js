const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * @desc authenticate a user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.json({ message: "login success" });
});

/**
 * @desc register new user
 * @route POST /api/users
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User alrealy exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10); // salt is a random string 加盐可以增加密码的随机性和保密性，防止攻击
  /**在这个代码片段中，'10'是用于生成salt的计算成本，
   * 它影响计算哈希值所需的时间和资源。计算成本越高，
   * 生成哈希值所需的时间和资源就越多，因此生成的哈希值
   * 也越难以被破解。在实际应用中，应根据特定的需求和资源
   * 限制选择适当的计算成本。 */
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    //201 indicate a successful response and include the location of the resource in the respobse body
    res.status(201).json({
      // _id ? id
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("INvalid user data");
  }
});

/**
 * @desc login new user
 * @route POST /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
