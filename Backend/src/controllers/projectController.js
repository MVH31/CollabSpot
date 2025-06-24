const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");
const util = require("util");
const { extractTextFromFile } = require("../utils/fileProcessor");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { domain: true },
    });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { domain: true },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};

// Create a project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      oneLiner,
      abstract,
      domainId,
      authorName,
      authorEmail,
      authorPhone,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!title || !abstract || !domainId || !authorName || !authorEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const fileName = req.file.filename;
    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).substring(1);

    // Create the project
    const project = await prisma.project.create({
      data: {
        title,
        oneLiner: oneLiner || null,
        abstract,
        filePath,
        fileName,
        fileType,
        domainId: Number(domainId),
        authorName,
        authorEmail,
        authorPhone: authorPhone || null,
      },
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};
