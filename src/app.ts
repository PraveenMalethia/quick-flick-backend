import 'reflect-metadata';
require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { accessLogStream } from "./utils/logger";
import auth_router from "./routes/app/auth.routes";
import { errorHandler } from "./middleware/errorHandler";
import address_router from './routes/app/address.routes';


// MongoDB connection URL
const mongoURI = process.env.MONGO_URI!;

// Basic route
const app = express();

const logger = morgan("combined", { stream: accessLogStream });
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);



const APP_API_BASE = "/api";
const ADMIN_API_BASE = "/admin/api";

app.use(`/health-check`, (req, res) => {
  res.status(200).json({
    message: "Server is running...",
    health: "Good",
  });
  return;
});

// App routes
app.use(`${APP_API_BASE}/auth`, auth_router);
app.use(`${APP_API_BASE}/address`, address_router);

app.use(errorHandler);
// Start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected...");
    
    // Start the cron job for bet resolution
    // In development mode, run immediately for testing
    const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';
    
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error: ", err));
