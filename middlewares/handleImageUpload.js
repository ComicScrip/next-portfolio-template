const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqid()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  const err = `Error: File upload only supports the following filetypes - ' + ${filetypes}`;
  console.error(err);
  return cb(err);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20000 * 1024, // 20M
  },
});

module.exports = upload;
