const express = require("express");
const router = express.Router();
const domainController = require("../controllers/domainController");

// Get all domains
router.get("/", domainController.getAllDomains);

// Get a specific domain by ID
router.get("/:id", domainController.getDomainById);

// Get projects by domain ID
router.get("/:id/projects", domainController.getProjectsByDomain);

module.exports = router;
