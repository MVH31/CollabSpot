import { motion as Motion } from "framer-motion";

function AboutUsPage() {
  // Placeholder team members data
  const teamMembers = [
    {
      id: 1,
      name: "Madesh",
      role: "Developer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.",
      // image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Harshavardhan",
      role: "Developer",
      bio: "Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.",
      // image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      name: "Prajeeth Kumar",
      role: "Designer",
      bio: "Fusce malesuada efficitur venenatis. Pellentesque tempor leo sed massa hendrerit hendrerit.",
      // image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        {/* About Us Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            About CollabSpot
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            CollabSpot is a project sharing and collaboration platform designed
            to help university students showcase their work and find like-minded
            collaborators.
          </p>
        </div>

        {/* Our Mission Section */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Empower Students
              </h3>
              <p className="text-gray-600">
                We aim to empower university students by providing a platform to
                showcase their projects and ideas.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Foster Collaboration
              </h3>
              <p className="text-gray-600">
                We believe in the power of collaboration. Our platform helps
                students find like-minded peers to work with.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Prevent Plagiarism
              </h3>
              <p className="text-gray-600">
                Our PlagScan tool helps identify similar projects, encouraging
                collaboration rather than duplication.
              </p>
            </div>
          </div>
        </Motion.div>

        {/* Meet the Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Meet Our Team
          </h2>

          <Motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <Motion.div
                key={member.id}
                variants={item}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0">
                      <span className="text-2xl font-bold text-green-600">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-green-600">{member.role}</p>
                    </div>
                  </div>
                  {/* <p className="text-gray-600">{member.bio}</p> */}
                </div>
              </Motion.div>
            ))}
          </Motion.div>
        </div>

        {/* Contact Section */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-green-600 text-white rounded-lg shadow-md p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Have questions about CollabSpot or interested in partnering with us?
            We'd love to hear from you!
          </p>
          <a
            href="mailto:contact@collabspot.edu"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-700 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact Us
          </a>
        </Motion.div>
      </div>
    </div>
  );
}

export default AboutUsPage;
