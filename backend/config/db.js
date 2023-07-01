const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    // This is a common practice in Node.js applications to ensure that the process exits with a non-zero exit code when an error occurs, which can be useful for error handling and debugging purposes.
    process.exit(1);
  }
};

module.exports = connectDB;
