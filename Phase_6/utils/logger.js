// Custom logger function for structured logging with timestamp and log levels.
const logger = (message, level = "info") => {
  // Generate a timestamp for the log message
  const timestamp = new Date().toISOString();

  // Ensure the 'level' parameter is valid, defaulting to 'log' for unknown levels
  const validLevels = ["info", "warn", "error", "log"];
  if (!validLevels.includes(level)) {
    console.warn(
      `[WARN] [${timestamp}] Invalid log level '${level}', defaulting to 'log'.`
    );
    level = "log";
  }

  // Log the message based on the specified level
  switch (level) {
    case "info":
      console.info(`[INFO] [${timestamp}] ${message}`);
      break;
    case "warn":
      console.warn(`[WARN] [${timestamp}] ${message}`);
      break;
    case "error":
      console.error(`[ERROR] [${timestamp}] ${message}`);
      break;
    default:
      console.log(`[LOG] [${timestamp}] ${message}`);
  }
};

module.exports = logger; // Export the logger for use in other modules.
