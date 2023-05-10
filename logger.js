const winston = require("winston");

const mongoose = require("mongoose");
require("winston-mongodb");

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: Date,
});
const Log = mongoose.model("Log", logSchema);

///
// Create a logger with a Console transport and two File transports
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/all.log" }),
    new winston.transports.MongoDB({
      level: "info",
      db: "mongodb://0.0.0.0:27017/User_Data",
      collection: "logs",
      // options: { useUnifiedTopology: true },
      // metaKey: "meta",
      // label: "myapp",
      // capped: true,
      // cappedMax: 10000000,
      // cappedSize: 10000000,
      // decolorize: true,
    }),
  ],
});

module.exports = logger;
