const Cryptr = require("cryptr");
const { Config } = require("../config");
const MediaFile = require("../modals/MediaFile"); // Import your Mongoose model
const path = require("path");
const mime = require("mime-types"); // Import the mime-types library

const DLFile = async (req, res) => {
  try {
    const cryptr = new Cryptr(Config.CRYPTR_TOKEN);

    const encryptedToken = req.params.id;
    const decryptedToken = cryptr.decrypt(encryptedToken);

    const [expirationTime, mongoId] = decryptedToken.split("-");
    const currentTime = new Date().getTime();

    if (currentTime > parseInt(expirationTime, 10)) {
      return res.status(401).json({ error: "Link is Expired" });
    }

    // Fetch the object from the MongoDB model using the decrypted MongoDB ID
    const mediaFile = await MediaFile.findById(mongoId);

    if (!mediaFile) {
      return res.status(404).json({ error: "File not found" });
    }

    const mediaUrl = path.join(Config.BASE_DIR, "/uploads/" + mediaFile.path);

    const mimeType = mime.lookup(mediaUrl) || "application/octet-stream";
    const fileName = path.basename(mediaUrl);

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    res.sendFile(mediaUrl);
  } catch (error) {
    console.error("Error fetching file data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching file data" });
  }
};

module.exports = DLFile;
