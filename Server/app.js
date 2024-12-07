import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "./config/mongoose-config.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const startServer = async () => {
  try {
    
    app.use("/users", userRouter);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {});
  } catch (error) {
    console.error("Error during server initialization:", error);
  }
};

// Start the server
startServer();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
