const express = require("express");
const router = express.Router();
const MediaFile = require("../modals/MediaFile");
const { Config } = require("../config");
const generateEncryptedToken = require("../helpers/generateEncryptedToken");

// Function to convert bytes to a human-readable format
const humanReadableSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const ViewFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Find the MediaFile by fileId
    const mediaFile = await MediaFile.findById(fileId);

    if (!mediaFile) {
      return res.status(404).json({ error: "File not found" });
    }

    // Update the visitcount
    mediaFile.visitcount += 1;
    await mediaFile.save();

    // Respond with the file information

    const humanReadableFileSize = humanReadableSize(mediaFile.filesize);

    const encryptedToken = generateEncryptedToken(mediaFile._id.toString());
    const fileUrl = `${Config.BACKEND_DOMAIN}/api/file/${encryptedToken}`;
    res.json({
      filename: mediaFile.filename,
      filesize: humanReadableFileSize,
      visits: mediaFile.visitcount,
      path: fileUrl,
    });
  } catch (error) {
    console.error("Error fetching file data:", error);
    res
      .status(404)
      .json({ error: "An error occurred while fetching file data" });
  }
};

module.exports = ViewFile;
