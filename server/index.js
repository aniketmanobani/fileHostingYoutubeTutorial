const express = require("express");
const { Config } = require("./config");
const app = express();
const cors = require("cors");
const port = Config.PORT; // You can choose any available port

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running on ${Config.BACKEND_DOMAIN}:${port}`);
});
