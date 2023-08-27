const mongoose = require("mongoose");

const mediaFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filesize: { type: Number, required: true },
  path: { type: String, required: true },
  visitcount: { type: Number, default: 0 },
});

const MediaFile = mongoose.model("MediaFile", mediaFileSchema);

module.exports = MediaFile;
