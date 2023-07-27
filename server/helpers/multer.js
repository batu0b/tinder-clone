const multer = require("multer");
var fs = require("fs");
const path = require("path");
var dir = "./public/images";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const maxSize = 1024 * 1024 * 5; // 5MB

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png , .jpg and .jpeg format allowed"));
    }
  },
  limits: {
    fieldSize: maxSize,
  },
});
module.exports.upload = upload;
