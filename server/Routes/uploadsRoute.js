const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
  }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    res.status(200).json({
      msg: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error uploading image" });
  }
});

router.get('/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
  
    res.sendFile(imagePath, (err) => {
      if (err) {
        res.status(404).json({ msg: 'Image not found' });
      }
    });
  })


module.exports = router;
