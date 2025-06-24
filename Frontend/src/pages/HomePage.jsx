import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import collaborateImg from "../assets/images/collaborate.jpg";

function HomePage() {
  return (
    <div className="bg-creamy-green">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 lg:mb-0"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Collaborate and</span>
                <span className="block text-green-600">Innovate Together</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl">
                CollabSpot is a platform where university students can upload,
                share, and find collaborators for their academic projects. Share
                your ideas, prevent plagiarism, and find like-minded peers.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/upload"
                  className="btn-primary inline-flex items-center justify-center px-8 py-3 text-lg"
                >
                  Upload Your Project
                </Link>
                <Link
                  to="/domains"
                  className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-lg"
                >
                  Explore Projects
                </Link>
              </div>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto">
                <img
                  className="rounded-lg shadow-xl"
                  src={collaborateImg}
                  alt="Students collaborating on a project"
                />
                <div className="absolute inset-0 bg-green-600 mix-blend-multiply opacity-10 rounded-lg"></div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-creamy-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How CollabSpot Works
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              A simple workflow to help you upload, verify, and collaborate on
              academic projects.
            </p>
          </div>

          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Step 1 */}
              <Motion.div whileHover={{ y: -10 }} className="relative">
                <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div className="absolute w-10 h-10 rounded-full bg-green-100 flex items-center justify-center -top-4 -left-4">
                    <span className="text-green-600 font-medium">1</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mt-3">
                    Upload Your Project
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                    Submit your project with a title, abstract, and file (PDF,
                    DOCX, or PPTX) to our secure database. Select the
                    appropriate domain for better categorization.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-1/2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 0L16.18 3.82L30.34 18H0V24H30.34L16.18 38.18L20 42L40 22L20 0Z"
                      fill="#D1D5DB"
                    />
                  </svg>
                </div>
              </Motion.div>

              {/* Step 2 */}
              <Motion.div
                whileHover={{ y: -10 }}
                className="relative mt-10 lg:mt-0"
              >
                <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div className="absolute w-10 h-10 rounded-full bg-green-100 flex items-center justify-center -top-4 -left-4">
                    <span className="text-green-600 font-medium">2</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mt-3">
                    Check for Similarity
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                    Use our PlagScan tool to check your project against existing
                    submissions. Our algorithm compares titles, abstracts, and
                    content for comprehensive similarity detection.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-1/2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 0L16.18 3.82L30.34 18H0V24H30.34L16.18 38.18L20 42L40 22L20 0Z"
                      fill="#D1D5DB"
                    />
                  </svg>
                </div>
              </Motion.div>

              {/* Step 3 */}
              <Motion.div
                whileHover={{ y: -10 }}
                className="relative mt-10 lg:mt-0"
              >
                <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div className="absolute w-10 h-10 rounded-full bg-green-100 flex items-center justify-center -top-4 -left-4">
                    <span className="text-green-600 font-medium">3</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mt-3">
                    Connect and Collaborate
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                    If similar projects are found, connect with the authors to
                    explore collaboration opportunities. Share ideas, merge
                    efforts, and create something better together.
                  </p>
                </div>
              </Motion.div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/upload"
              className="btn-primary inline-flex items-center justify-center px-6 py-3"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
