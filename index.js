const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Ruta principal
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

//Listener
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
