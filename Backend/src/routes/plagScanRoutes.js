const express = require("express");
const router = express.Router();
const plagScanController = require("../controllers/plagScanController");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/temp"));
  },
  filename: (req, file, cb) => {
    const fileName = `temp-${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".docx", ".pptx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOCX, and PPTX files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

// Scan a file for plagiarism
router.post("/scan", upload.single("file"), plagScanController.scanFile);

module.exports = router;
