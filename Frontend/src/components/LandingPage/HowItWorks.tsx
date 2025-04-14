'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Tag It',
    description: 'Attach QR codes to your physical assets in seconds. Simple, fast, and effective.',
    image: 'https://picsum.photos/seed/tag/600/400', // Replace with actual illustrations
  },
  {
    title: 'Scan It',
    description: 'Use your mobile phone to scan QR codes and instantly view asset information on the go.',
    image: 'https://picsum.photos/seed/scan/600/400',
  },
  {
    title: 'Manage It',
    description: 'Update asset details, log service history, and generate real-time reports with ease.',
    image: 'https://picsum.photos/seed/manage/600/400',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      type: 'spring',
    },
  }),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-16">
          A simple, easy-to-understand 3-step process to manage your assets efficiently.
        </p>
      </div>

      <div className="space-y-28">
        {steps.map((step, index) => {
          const isReversed = index % 2 === 1;

          return (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className={`flex flex-col-reverse ${
                isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-12 md:gap-20 max-w-6xl mx-auto`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
