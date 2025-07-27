import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ToolCard from './ToolCard';
import { useTools } from '../context/ToolsContext';

const ToolsGrid = ({ searchTerm, selectedCategory }) => {
  const { tools } = useTools();

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [tools, searchTerm, selectedCategory]);

  const featuredTools = filteredTools.filter(tool => tool.featured);
  const regularTools = filteredTools.filter(tool => !tool.featured);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-8 flex items-center space-x-3"
            >
              <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></span>
              <span>Featured Tools</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTools.map((tool, index) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  index={index}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Tools */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 flex items-center space-x-3"
          >
            <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></span>
            <span>All Tools</span>
            <span className="text-white/50 text-lg font-normal">({filteredTools.length})</span>
          </motion.h2>
          
          {filteredTools.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-white/60 text-lg">No tools found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularTools.map((tool, index) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  index={index + featuredTools.length}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;