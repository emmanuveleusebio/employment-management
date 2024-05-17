const express = require("express");
const router = express.Router();
const {
  getUsers,
  postUsers,
  putUsers,
  delUsers,
  getSingelUsers,
  postAvatar,
  searchDataAndPagination,
} = require("../controller/controller");
const { isAuth } = require("../middleWare/validateToken");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/img/public");
  },
  filename: function (req, file, cb) {
    const userId = req.params.id;

    const extension = file.originalname.split(".").pop();
    const filename = `${userId}.${extension}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.route("/searchAndPaginate").get(searchDataAndPagination);

router.route("/").get(getUsers).post(postUsers);

router.route("/:id").get(getSingelUsers);

router.route("/:id/avatar").post(upload.single("avatar"), postAvatar);

router.route("/:id").put(putUsers).delete(delUsers);

router.get("/:id/view", async (req, res) => {
  res.render("viewDetails");
});

module.exports = router;
