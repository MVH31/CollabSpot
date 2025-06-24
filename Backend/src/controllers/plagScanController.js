const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");
const { extractTextFromFile } = require("../utils/fileProcessor");
const { computeSimilarity } = require("../utils/similarityCalculator");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

// Scan file for plagiarism
exports.scanFile = async (req, res) => {
  try {
    const { domainId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!domainId) {
      return res.status(400).json({ message: "Domain ID is required" });
    }

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).substring(1);

    // Extract text from the uploaded file
    const fileContent = await extractTextFromFile(filePath, fileType);

    if (!fileContent || !fileContent.text) {
      return res
        .status(400)
        .json({ message: "Could not extract text from file" });
    }

    // Get all projects in the same domain for comparison
    const projects = await prisma.project.findMany({
      where: {
        domainId: Number(domainId),
      },
    });

    // Calculate similarity with each project
    const similarityResults = [];

    for (const project of projects) {
      try {
        // Extract text from the stored project file
        const projectContent = await extractTextFromFile(
          project.filePath,
          project.fileType
        );

        if (!projectContent || !projectContent.text) {
          console.warn(`Could not extract text from project ${project.id}`);
          continue;
        }

        // Calculate similarity
        const similarity = computeSimilarity(
          fileContent.title || "",
          fileContent.text,
          project.title,
          project.abstract,
          projectContent.text
        );

        // Only include results with significant similarity
        if (similarity.overallSimilarity > 0.3) {
          similarityResults.push({
            project,
            similarity,
          });
        }
      } catch (error) {
        console.error(`Error processing project ${project.id}:`, error);
      }
    }

    // Sort by overall similarity (highest first)
    similarityResults.sort(
      (a, b) => b.similarity.overallSimilarity - a.similarity.overallSimilarity
    );

    // Remove the temporary file
    try {
      await unlinkAsync(filePath);
    } catch (unlinkError) {
      console.error("Error removing temporary file:", unlinkError);
    }

    res.json({
      message: "Scan completed",
      results: similarityResults,
    });
  } catch (error) {
    console.error("Error in plagiarism scan:", error);

    // Try to clean up the temp file
    if (req.file && req.file.path) {
      try {
        await unlinkAsync(req.file.path);
      } catch (unlinkError) {
        console.error("Error removing temporary file:", unlinkError);
      }
    }

    res
      .status(500)
      .json({ message: "Failed to scan file", error: error.message });
  }
};
