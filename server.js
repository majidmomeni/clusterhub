const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname, "public")))

app.listen(4200, () => console.log("Server started on port 4200"));