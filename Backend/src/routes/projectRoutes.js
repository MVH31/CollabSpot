const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
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

// Get all projects
router.get("/", projectController.getAllProjects);

// Get a specific project by ID
router.get("/:id", projectController.getProjectById);

// Create a new project
router.post("/", upload.single("file"), projectController.createProject);

module.exports = router;
