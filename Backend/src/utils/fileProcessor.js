const fs = require("fs");
const util = require("util");
const pdfParse = require("pdf-parse");
const docxParser = require("docx-parser");
const path = require("path");

const readFileAsync = util.promisify(fs.readFile);
const readDirAsync = util.promisify(fs.readdir);

/**
 * Extract text content from files of different formats
 * @param {string} filePath - Path to the file
 * @param {string} fileType - Type of file (pdf, docx, pptx)
 * @returns {Promise<Object>} - Object containing title and text content
 */
exports.extractTextFromFile = async (filePath, fileType) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    let result = { title: "", text: "" };

    switch (fileType.toLowerCase()) {
      case "pdf":
        const pdfBuffer = await readFileAsync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        result.text = pdfData.text;

        // Try to extract title from first few lines
        const lines = pdfData.text.split("\n").filter((line) => line.trim());
        if (lines.length > 0) {
          result.title = lines[0].trim();
        }
        break;

      case "docx":
        try {
          result.text = await new Promise((resolve, reject) => {
            docxParser.parseDocx(filePath, function (data) {
              resolve(data);
            });
          });

          // Try to extract title from first paragraph
          const paragraphs = result.text.split("\n").filter((p) => p.trim());
          if (paragraphs.length > 0) {
            result.title = paragraphs[0].trim();
          }
        } catch (docxError) {
          console.error("Error parsing DOCX:", docxError);
          throw new Error("Failed to parse DOCX file");
        }
        break;

      case "pptx":
        try {
          // Simple approach for PPTX files in a Node.js environment
          // Since we can't easily extract text from PPTX in Node without more complex libraries,
          // we'll store basic file information and treat it as plain text for similarity checks
          const fileStats = fs.statSync(filePath);
          const fileName = path.basename(filePath);

          result.text = `PowerPoint presentation: ${fileName}. File size: ${
            fileStats.size
          } bytes. Created: ${fileStats.birthtime.toISOString()}`;
          result.title = fileName.replace(/\.[^/.]+$/, ""); // filename without extension

          console.log(
            `PPTX support is limited in Node.js environment. Using file metadata for: ${fileName}`
          );
        } catch (pptxError) {
          console.error("Error handling PPTX:", pptxError);
          throw new Error("Failed to process PPTX file");
        }
        break;

      default:
        throw new Error("Unsupported file type: " + fileType);
    }

    return result;
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw error;
  }
};
