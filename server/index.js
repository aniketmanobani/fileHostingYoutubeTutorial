const express = require("express");
require("./database/db");
const { Config } = require("./config");
const app = express();
const cors = require("cors");
const UploadRoute = require("./routes/upload");
const port = Config.PORT; // You can choose any available port
const fileUpload = require("express-fileupload");
const ViewFile = require("./routes/viewfile");
const path = require("path");
const DLFile = require("./routes/dl_file");
const dashboard = require("./routes/dashboard");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/api/upload", UploadRoute);
app.get("/api/view/:id", ViewFile);
app.get("/api/file/:id", DLFile);
app.post("/api/dashboard", dashboard);

app.listen(port, () => {
  console.log(`Server is running on ${Config.BACKEND_DOMAIN}:${port}`);
});
