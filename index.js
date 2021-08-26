const express = module.require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routing/user");
const multer = require("multer");
const cors = require("cors");
const { addListener } = require("./model/user");
app.use(cors());
///////////////////////////////////////////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const filter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
});
///////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/dbh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use([
  express.urlencoded({ extended: true }),
  express.json(),
  upload.single("image"),
]);

app.use("/users", user);
app.use("/upload", express.static("upload"));

app.listen(process.env.PORT || 3000 );
module.exports = app;
