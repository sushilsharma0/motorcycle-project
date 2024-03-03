const express = require("express");
const router = express.Router();
const products = require("../models/product.model");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get("/", async (req, res) => {
  try {
    const product = await products.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const compressedImage = await sharp(req.file.buffer)
      .resize({
        width: 300,
      })
      .toBuffer();
    const base64Image = compressedImage.toString("base64");
    const product = new products({
      name: name,
      description: description,
      price: price,
      category: category,
      image: base64Image,
    });
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
