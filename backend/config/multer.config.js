const multer = require("multer");
const path = require("path");
const url = require("url");

console.log(path.parse(path.parse(__dirname).dir).dir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname, "uploads"));
    cb(null, path.join(path.parse(path.parse(__dirname).dir).dir, "uploads"));
  },
  filename: function (req, file, cb) {
    const fname = file.originalname;
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
