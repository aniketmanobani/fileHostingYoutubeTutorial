const Cryptr = require("cryptr");
const { Config } = require("../config");

const generateEncryptedToken = (mongoId, minutes) => {
  const cryptr = new Cryptr(Config.CRYPTR_TOKEN); // Replace with your secret key
  const currentTime = new Date().getTime();
  const expirationTime = new Date(
    currentTime + Config.FILE_LINK_EXPIRY_IN_MINUTES * 60 * 1000
  ).getTime();
  const tokenString = `${expirationTime}-${mongoId}`;
  const encryptedToken = cryptr.encrypt(tokenString);
  return encryptedToken;
};

module.exports = generateEncryptedToken;
