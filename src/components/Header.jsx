import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useTools } from '../context/ToolsContext';

const { FiSearch, FiFilter, FiZap } = FiIcons;

const Header = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const { tools } = useTools();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = ['All', ...new Set(tools.map(tool => tool.category))];

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <SafeIcon icon={FiZap} className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Tools
              </h1>
              <p className="text-xs text-white/60">Catalog</p>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" 
                size={18}
              />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
              >
                <SafeIcon icon={FiFilter} size={18} />
                <span className="hidden sm:inline">{selectedCategory}</span>
              </button>

              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedCategory === category 
                          ? 'text-purple-400 bg-white/10' 
                          : 'text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;