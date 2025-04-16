'use client';

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    title: "QR Code Scanning",
    description:
      "Quick scanning to access and update asset details.",
    size: "large",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    title: "Asset Information",
    description:
      "Centralized data for easy asset management.",
    size: "large",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    title: "Maintenance Tracker",
    description:
      "Log maintenance, schedule service reminders.",
    size: "medium",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    title: "Team Access",
    description:
      "Role-based permissions for efficient workflows.",
    size: "medium",
    image: "https://picsum.photos/400/300?random=4",
  },
  {
    title: "Dashboard & Reports",
    description:
      "Visualize status and generate reports easily.",
    size: "medium",
    image: "https://picsum.photos/400/300?random=5",
  },
 
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring",
    },
  }),
};

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-20 px-6 md:px-12 mt-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-blue-600 text-center mb-4 text-base md:text-lg font-medium">
          Why EasyAssets
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-16 text-gray-900 leading-snug">
          Powerful Features to Manage Your Assets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(200px,_auto)]">
          {features.map((feature, index) => {
            const colSpan =
              feature.size === "large"
                ? "md:col-span-3"
                : "md:col-span-3 lg:col-span-2";

            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className={`${colSpan} flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 md:p-8`}
              >
                <div className="rounded-xl overflow-hidden h-44 md:h-56 mb-4">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

       {/* CTA Button */}
<div className="mt-16 flex justify-center">
<Link to="/signup">
    <button className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-medium px-6 py-3 rounded-full transition-all shadow-md cursor-pointer">
      Get Started with EasyAssets
    </button>
  </Link>
</div>
      </div>
    </section>
  );
}
