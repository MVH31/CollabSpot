const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// Import routes
const domainRoutes = require("./routes/domainRoutes");
const projectRoutes = require("./routes/projectRoutes");
const plagScanRoutes = require("./routes/plagScanRoutes");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/domains", domainRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/plagscan", plagScanRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("CollabSpot API is running!");
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Seed domains if they don't exist
  try {
    const domainsCount = await prisma.domain.count();

    if (domainsCount === 0) {
      const domains = [
        {
          name: "Machine Learning",
          description:
            "Projects related to artificial intelligence and machine learning",
        },
        {
          name: "Web Development",
          description: "Projects related to web applications and websites",
        },
        {
          name: "Mobile App Development",
          description: "Projects related to mobile applications",
        },
        {
          name: "Blockchain",
          description: "Projects related to blockchain and cryptocurrency",
        },
        { name: "IoT", description: "Projects related to Internet of Things" },
        {
          name: "Data Science",
          description: "Projects related to data analysis and visualization",
        },
        {
          name: "Game Development",
          description: "Projects related to game design and development",
        },
        {
          name: "Cybersecurity",
          description: "Projects related to computer and network security",
        },
        {
          name: "Robotics",
          description: "Projects related to robotics and automation",
        },
        {
          name: "AR/VR",
          description: "Projects related to augmented and virtual reality",
        },
        {
          name: "Cloud Computing",
          description: "Projects related to cloud infrastructure and services",
        },
        {
          name: "DevOps",
          description:
            "Projects related to development operations and automation",
        },
        {
          name: "UI/UX Design",
          description:
            "Projects related to user interface and experience design",
        },
        {
          name: "Embedded Systems",
          description: "Projects related to embedded hardware and software",
        },
      ];

      for (const domain of domains) {
        await prisma.domain.create({
          data: domain,
        });
      }

      console.log("Domains seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding domains:", error);
  }
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
