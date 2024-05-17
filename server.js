const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connectDb = require("./config/dbConnection");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const user = require("./model/empModel");
const { sessionMid } = require("./middleWare/validateToken");
connectDb();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMid);

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

app.use(errorHandler);

app.use(express.json());

app.use("/api/user", require("./route/router"));
app.use("/api/log", require("./route/userRoutes"));
app.use("/", require("./route/viewRoute"));

app.get("/edit/:id", async (req, res) => {
  try {
    res.render("./include/edit");
  } catch (error) {
    console.error("Error rendering edit.ejs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(
    `server is running on port: http://localhost:${port}/api/log/login`
  );
});

// app.post("/api/log/login",async(req,res) => {

//     res.redirect('/api/user/home')
// })
