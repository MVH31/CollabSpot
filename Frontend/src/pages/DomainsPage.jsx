import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

function DomainsPage() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/domains");
        if (!response.ok) {
          throw new Error("Failed to fetch domains");
        }
        const data = await response.json();
        setDomains(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  // Filter domains based on search term
  const filteredDomains = domains.filter(
    (domain) =>
      domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (domain.description &&
        domain.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Animation variants for list items
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

  return (
    <div className="bg-creamy-green min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Project Domains
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Browse through various domains and discover projects from university
            students across different fields.
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="form-input block w-full px-4 py-3 rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              placeholder="Search domains..."
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

        {/* Domains Grid */}
        <div className="mt-12">
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
          ) : (
            <Motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDomains.length > 0 ? (
                filteredDomains.map((domain) => (
                  <Motion.div
                    key={domain.id}
                    variants={item}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <Link to={`/domains/${domain.id}`} className="block h-full">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {domain.name}
                        </h3>
                        <p className="text-gray-600">{domain.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {domain.projects?.length || 0} Projects
                          </span>
                          <span className="text-green-600 font-medium flex items-center">
                            View Projects
                            <svg
                              className="ml-1 h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No domains found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search term
                  </p>
                </div>
              )}
            </Motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DomainsPage;
