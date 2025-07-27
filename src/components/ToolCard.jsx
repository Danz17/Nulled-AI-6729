import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiExternalLink, FiStar, FiTag } = FiIcons;

const ToolCard = ({ tool, index, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-2xl ${
        featured 
          ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20' 
          : 'bg-white/5'
      } backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-black text-xs font-semibold"
          >
            <SafeIcon icon={FiStar} size={12} />
            <span>Featured</span>
          </motion.div>
        </div>
      )}

      <div className="relative p-6">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <motion.div
            className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {!imageError ? (
              <img
                src={tool.image}
                alt={tool.name}
                className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-white/50 text-4xl">
                <SafeIcon icon={FiTag} />
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
              {tool.name}
            </h3>
            <p className="text-purple-300 text-sm font-medium">{tool.category}</p>
          </div>

          <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
            {tool.description}
          </p>

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tool.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md border border-white/20"
                >
                  {tag}
                </span>
              ))}
              {tool.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-md border border-white/20">
                  +{tool.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA Button */}
          <motion.a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Try Now</span>
            <SafeIcon icon={FiExternalLink} size={16} />
          </motion.a>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[1px]">
          <div className="w-full h-full rounded-2xl bg-black/50" />
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;