const fs = require("fs");
const path = require("path");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

if (process.env.NODE_ENV === "production") {
  const logDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
}

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
  transports: [new transports.Console()],
});

module.exports = logger;
