import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const HeroSection = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/NovaJam/EasyAssets/contributors"
        );
        const data = await res.json();
        setContributors(data);
      } catch (err) {
        console.error("Failed to fetch contributors:", err);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Effortless Asset Management with QR Codes
          </h1>
          <p className="text-lg text-gray-600 mb-6">
          Simplify tracking and maintenance of physical assets across your organization with EasyAssets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/NovaJam/EasyAssets/wiki/Easyassets-Wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full max-w-md h-96 rounded-xl shadow-inner flex items-center justify-center">
            <p className="text-gray-600 text-lg">Dashboard Preview</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Contributors Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Meet Our Contributors
        </motion.h2>

        {contributors.length === 0 ? (
          <p className="text-center text-gray-500">Loading contributors...</p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
          >
            {contributors.map((contributor) => (
              <motion.a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 group"
              >
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-20 h-20 rounded-full mb-3 border-4 border-white shadow-md group-hover:shadow-lg transition duration-300"
                />
                <p className="text-sm font-medium text-gray-700">{contributor.login}</p>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
