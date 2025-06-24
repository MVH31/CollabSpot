import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";

function PlagScanPage() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanningStatus, setScanningStatus] = useState("idle"); // idle, scanning, completed
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [domainId, setDomainId] = useState("");
  const [results, setResults] = useState([]);

  // Fetch domains for dropdown
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/domains");
        if (!response.ok) {
          throw new Error("Failed to fetch domains");
        }
        const data = await response.json();
        setDomains(data);
      } catch (error) {
        setError("Failed to load domains. Please try again later. " + error);
      }
    };

    fetchDomains();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      setFileError(null);
      return;
    }

    // Check file type
    const fileType = selectedFile.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx", "pptx"].includes(fileType)) {
      setFileError("Only PDF, DOCX, and PPTX files are allowed");
      setFile(null);
      return;
    }

    // Check file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError("File size should not exceed 10MB");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileError(null);
  };

  const handleDomainChange = (e) => {
    setDomainId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!domainId || !file) {
      setError("Please select a domain and upload a file");
      return;
    }

    // Clear previous results and errors
    setError(null);
    setResults([]);
    setLoading(true);
    setScanningStatus("scanning");

    // Create form data for file upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("domainId", domainId);

    try {
      const response = await fetch("http://localhost:5000/api/plagscan/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to scan file");
      }

      const data = await response.json();
      setResults(data.results || []);
      setScanningStatus("completed");
    } catch (error) {
      setError(error.message || "Failed to scan file. Please try again.");
      setScanningStatus("idle");
    } finally {
      setLoading(false);
    }
  };

  // Function to format similarity percentage
  const formatSimilarity = (value) => {
    return (value * 100).toFixed(1) + "%";
  };

  // Function to get color based on similarity value
  const getSimilarityColor = (value) => {
    if (value >= 0.7) return "text-red-600";
    if (value >= 0.5) return "text-orange-500";
    if (value >= 0.3) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="bg-creamy-green min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            PlagScan
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Upload your project to check for similarities with existing projects
            in our database and find potential collaborators.
          </p>
        </div>

        {/* Upload Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {error && (
              <div className="p-4 bg-red-50 text-red-600 border-b border-red-100">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="domainId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Domain <span className="text-red-500">*</span>
                </label>
                <select
                  id="domainId"
                  name="domainId"
                  value={domainId}
                  onChange={handleDomainChange}
                  required
                  disabled={loading}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                >
                  <option value="">Select a domain</option>
                  {domains.map((domain) => (
                    <option key={domain.id} value={domain.id}>
                      {domain.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Select the domain that best matches your project for more
                  accurate results.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File for Scanning{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf,.docx,.pptx"
                          className="sr-only"
                          onChange={handleFileChange}
                          disabled={loading}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, PPTX up to 10MB
                    </p>
                    {file && (
                      <p className="text-sm text-green-600">
                        File selected: {file.name}
                      </p>
                    )}
                    {fileError && (
                      <p className="text-sm text-red-600">{fileError}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !file || !domainId}
                  className={`w-full btn-primary py-3 px-6 flex items-center justify-center text-lg ${
                    loading || !file || !domainId
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Scan Project
                    </>
                  )}
                </Motion.button>
              </div>
            </form>
          </Motion.div>
        </div>

        {/* Scanning Animation */}
        {scanningStatus === "scanning" && (
          <div className="max-w-3xl mx-auto text-center py-8">
            <div className="animate-pulse">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h2 className="text-xl font-medium text-gray-900 mt-4">
                Scanning for similarities...
              </h2>
              <p className="text-gray-600 mt-2">
                We're comparing your project with others in our database.
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {scanningStatus === "completed" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Scan Results
            </h2>

            {results.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mt-4">
                  No significant similarities found
                </h3>
                <p className="text-gray-600 mt-2">
                  Your project appears to be unique! No significant matches were
                  found in our database.
                </p>
              </div>
            ) : (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-gray-700 mb-4">
                  We found {results.length} project(s) with potential
                  similarities. You might want to consider collaborating with
                  the authors.
                </p>

                {results.map((result, index) => (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {result.project.title}
                          </h3>
                          {result.project.oneLiner && (
                            <p className="text-gray-600 mt-1 italic">
                              {result.project.oneLiner}
                            </p>
                          )}
                        </div>
                        <div
                          className={`text-lg font-bold ${getSimilarityColor(
                            result.similarity.overallSimilarity
                          )}`}
                        >
                          {formatSimilarity(
                            result.similarity.overallSimilarity
                          )}{" "}
                          Match
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-md font-medium text-gray-700">
                          Abstract
                        </h4>
                        <p className="text-gray-600 mt-1">
                          {result.project.abstract.length > 200
                            ? `${result.project.abstract.substring(0, 200)}...`
                            : result.project.abstract}
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-500">
                            Title Similarity
                          </p>
                          <p
                            className={`text-lg font-medium ${getSimilarityColor(
                              result.similarity.titleSimilarity
                            )}`}
                          >
                            {formatSimilarity(
                              result.similarity.titleSimilarity
                            )}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-500">
                            Abstract Similarity
                          </p>
                          <p
                            className={`text-lg font-medium ${getSimilarityColor(
                              result.similarity.abstractSimilarity
                            )}`}
                          >
                            {formatSimilarity(
                              result.similarity.abstractSimilarity
                            )}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-500">
                            Content Similarity
                          </p>
                          <p
                            className={`text-lg font-medium ${getSimilarityColor(
                              result.similarity.contentSimilarity
                            )}`}
                          >
                            {formatSimilarity(
                              result.similarity.contentSimilarity
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-between items-center border-t pt-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Author:{" "}
                            <span className="text-gray-700 font-medium">
                              {result.project.authorName}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <a
                            href={`mailto:${result.project.authorEmail}?subject=Collaboration on ${result.project.title}`}
                            className="btn-primary text-sm py-1 px-4 inline-flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Contact Author
                          </a>
                          {result.project.authorPhone && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Phone:</span>{" "}
                              {result.project.authorPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </Motion.div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setFile(null);
                  setResults([]);
                  setScanningStatus("idle");
                }}
                className="btn-secondary"
              >
                Scan Another Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlagScanPage;
