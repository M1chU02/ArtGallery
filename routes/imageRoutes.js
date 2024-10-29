// routes/imageRoutes.js
const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");

const router = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload an image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const image = new Image({ filename: req.file.originalname });
    await image.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Route to get all images, sorted by date
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ date: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving images" });
  }
});

module.exports = router;
