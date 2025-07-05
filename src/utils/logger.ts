import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";
import "winston-daily-rotate-file";

// Set up logger with daily log rotation
export const LOGGER = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export const accessLogStream = fs.createWriteStream(
  path.join("logs", "access.log"),
  { flags: "a" }
);
