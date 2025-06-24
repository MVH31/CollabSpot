import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

function UploadPage() {
  const navigate = useNavigate();
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    oneLiner: "",
    abstract: "",
    domainId: "",
    authorName: "",
    authorEmail: "",
    authorPhone: "",
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.title ||
      !formData.abstract ||
      !formData.domainId ||
      !formData.authorName ||
      !formData.authorEmail ||
      !file
    ) {
      setError("Please fill in all required fields and upload a file");
      return;
    }

    // Clear any previous errors
    setError(null);
    setLoading(true);

    // Create form data for file upload
    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, value);
    });
    uploadData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload project");
      }

      setSuccess(true);

      // Reset form after successful upload
      setFormData({
        title: "",
        oneLiner: "",
        abstract: "",
        domainId: "",
        authorName: "",
        authorEmail: "",
        authorPhone: "",
      });
      setFile(null);

      // Redirect to domain page after 2 seconds
      setTimeout(() => {
        navigate(`/domains/${formData.domainId}`);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to upload project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-creamy-green min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upload Your Project
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Share your work with the community and find collaborators
          </p>
        </div>

        {success ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 p-6 rounded-lg shadow-md text-center"
          >
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">
              Project Uploaded Successfully!
            </h2>
            <p className="text-gray-600 mt-2">
              Redirecting you to the project domain page...
            </p>
          </Motion.div>
        ) : (
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
              {/* Project Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Project Information
                </h2>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="oneLiner"
                    className="block text-sm font-medium text-gray-700"
                  >
                    One-liner (Optional)
                  </label>
                  <input
                    type="text"
                    id="oneLiner"
                    name="oneLiner"
                    value={formData.oneLiner}
                    onChange={handleChange}
                    placeholder="A brief description of your project in one line"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="abstract"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Abstract <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="domainId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Domain <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="domainId"
                    name="domainId"
                    value={formData.domainId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                  >
                    <option value="">Select a domain</option>
                    {domains.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload File <span className="text-red-500">*</span>
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
                            required={!file}
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
              </div>

              {/* Author Information */}
              <div className="pt-4 space-y-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Author Information
                </h2>

                <div>
                  <label
                    htmlFor="authorName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="authorEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="authorEmail"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="authorPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="authorPhone"
                    name="authorPhone"
                    value={formData.authorPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`btn-primary py-2 px-6 flex items-center ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading && (
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
                    )}
                    {loading ? "Uploading..." : "Upload Project"}
                  </Motion.button>
                </div>
              </div>
            </form>
          </Motion.div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
