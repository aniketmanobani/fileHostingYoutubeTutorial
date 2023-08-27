const express = require("express");
require("./database/db");
const { Config } = require("./config");
const app = express();
const cors = require("cors");
const UploadRoute = require("./routes/upload");
const port = Config.PORT; // You can choose any available port
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/api/upload", UploadRoute);

app.listen(port, () => {
  console.log(`Server is running on ${Config.BACKEND_DOMAIN}:${port}`);
});
