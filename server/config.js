const baseDir = __dirname;

const Config = {
  PORT: 5000,
  BACKEND_DOMAIN: "http://localhost:5000",
  BASE_DIR: baseDir,
  FILE_LINK_EXPIRY_IN_MINUTES: 10, // i am setting 1 minute expiry time to check this functionality working or not
  CRYPTR_TOKEN: "fddffd",
  ADMIN_USER: "admin",
  ADMIN_PASS: "pass",
};

module.exports = {
  Config,
};
