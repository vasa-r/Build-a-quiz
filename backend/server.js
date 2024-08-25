const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/connectDb");
const userRouter = require("./routes/userRoute");
const quizRouter = require("./routes/quizRoute");
const quizPublicRouter = require("./routes/quizPublicRoute");
const verifyToken = require("./middleware/verifyToken");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/user", userRouter);

app.use("/api/v1/quiz", verifyToken, quizRouter);

app.use("/api/v1/live", quizPublicRouter);

//invalid path catcher
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

//global error catcher
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
});
