const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("req", req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token, before we did a jwt.sign({id}, process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from the token  .select('-password') means we won't get the password

      req.user = await User.findById(decoded.id).select("-password");
      next(); //pass control to the next middleware function in the stack
    } catch (err) {
      console.log(err);
      //HTTP status code 401, on the other hand, indicates that the client failed to provide valid authentication credentials for a protected resource.
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no right token");
  }
});

module.exports = { protect };
