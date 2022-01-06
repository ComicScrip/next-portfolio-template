const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

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
    fileSize: 5000 * 1024, // 5M max on Vercel
  },
});

module.exports = upload;
