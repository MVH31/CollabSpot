import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

function ProjectsPage() {
  const { id } = useParams();
  const [domain, setDomain] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDomainAndProjects = async () => {
      try {
        setLoading(true);

        // Fetch domain details
        const domainResponse = await fetch(
          `http://localhost:5000/api/domains/${id}`
        );
        if (!domainResponse.ok) {
          throw new Error("Failed to fetch domain");
        }
        const domainData = await domainResponse.json();
        setDomain(domainData);

        // Fetch projects in this domain
        const projectsResponse = await fetch(
          `http://localhost:5000/api/domains/${id}/projects`
        );
        if (!projectsResponse.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDomainAndProjects();
  }, [id]);

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.oneLiner &&
        project.oneLiner.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine file icon based on fileType
  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return (
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "docx":
        return (
          <svg
            className="w-6 h-6 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pptx":
        return (
          <svg
            className="w-6 h-6 text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div className="bg-creamy-green min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : domain ? (
          <>
            {/* Domain Header */}
            <div className="text-center mb-12">
              <Link
                to="/domains"
                className="text-green-600 hover:text-green-700 inline-flex items-center mb-4"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Domains
              </Link>
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {domain.name}
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                {domain.description || "Explore projects in this domain"}
              </p>
            </div>

            {/* Search Box */}
            <div className="mb-8 max-w-md mx-auto">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="form-input block w-full px-4 py-3 rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Projects List */}
            {filteredProjects.length > 0 ? (
              <Motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {filteredProjects.map((project) => (
                  <Motion.div
                    key={project.id}
                    variants={item}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            {project.title}
                          </h2>
                          {project.oneLiner && (
                            <p className="text-gray-600 mt-1 italic">
                              {project.oneLiner}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {getFileIcon(project.fileType)}
                          <span className="text-sm text-gray-500 uppercase">
                            {project.fileType}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-md font-medium text-gray-700">
                          Abstract
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {project.abstract.length > 200
                            ? `${project.abstract.substring(0, 200)}...`
                            : project.abstract}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-between items-center">
                        <div className="mb-2 sm:mb-0">
                          <span className="text-sm text-gray-500">By: </span>
                          <span className="text-gray-700 font-medium">
                            {project.authorName}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Uploaded on {formatDate(project.createdAt)}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`mailto:${project.authorEmail}`}
                            className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Contact Author
                          </a>
                          {project.authorPhone && (
                            <span className="text-gray-600 text-sm">
                              {project.authorPhone}
                            </span>
                          )}
                        </div>
                        <a
                          href={`http://localhost:5000/uploads/${project.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm py-1 px-4 inline-flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Download
                        </a>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </Motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? "Try adjusting your search term or browse all projects in this domain."
                    : "Be the first to upload a project in this domain."}
                </p>
                <Link
                  to="/upload"
                  className="btn-primary inline-flex items-center px-6 py-3"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Upload a Project
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Domain not found
            </h2>
            <p className="text-gray-600 mb-6">
              The domain you're looking for doesn't seem to exist.
            </p>
            <Link
              to="/domains"
              className="btn-primary inline-flex items-center px-6 py-3"
            >
              Return to Domains
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
