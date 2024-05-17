const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");
const { isAuth } = require("../middleWare/validateToken");

router.get("/", isAuth, viewController.renderindex);

module.exports = router;