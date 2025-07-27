import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiUsers, FiTrendingUp, FiShield } = FiIcons;

const AboutSection = () => {
  const features = [
    {
      icon: FiTarget,
      title: 'Curated Selection',
      description: 'Hand-picked AI tools that deliver real value and innovation.'
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description: 'Discover tools recommended by AI enthusiasts and professionals.'
    },
    {
      icon: FiTrendingUp,
      title: 'Latest Trends',
      description: 'Stay updated with the newest developments in AI technology.'
    },
    {
      icon: FiShield,
      title: 'Trusted Sources',
      description: 'Only verified and reliable AI tools make it to our catalog.'
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Our
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Catalog
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We're passionate about artificial intelligence and its potential to transform how we work, 
            create, and solve problems. Our catalog features the most innovative AI tools available today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <SafeIcon 
                    icon={feature.icon} 
                    className="text-purple-300 group-hover:text-purple-200 transition-colors duration-300" 
                    size={24} 
                  />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl border border-white/10">
            <p className="text-white/90 text-lg mb-4">
              "Artificial Intelligence is not just the future—it's the present. 
              Our mission is to make these powerful tools accessible to everyone."
            </p>
            <p className="text-purple-300 font-semibold">
              — AI Tools Catalog Team
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;