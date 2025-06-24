const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all domains
exports.getAllDomains = async (req, res) => {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { name: "asc" },
      include: { projects: true },
    });

    res.json(domains);
  } catch (error) {
    console.error("Error fetching domains:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch domains", error: error.message });
  }
};

// Get domain by ID
exports.getDomainById = async (req, res) => {
  try {
    const { id } = req.params;

    const domain = await prisma.domain.findUnique({
      where: { id: Number(id) },
    });

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    res.json(domain);
  } catch (error) {
    console.error("Error fetching domain:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch domain", error: error.message });
  }
};

// Get projects by domain ID
exports.getProjectsByDomain = async (req, res) => {
  try {
    const { id } = req.params;

    const projects = await prisma.project.findMany({
      where: { domainId: Number(id) },
      orderBy: { createdAt: "desc" },
      include: { domain: true },
    });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects by domain:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};
