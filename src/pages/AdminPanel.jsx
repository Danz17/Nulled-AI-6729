import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTools } from '../context/ToolsContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiSave, FiX } = FiIcons;

const AdminPanel = () => {
  const navigate = useNavigate();
  const { tools, addTool, updateTool, deleteTool } = useTools();
  const [isAdding, setIsAdding] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    url: '',
    image: '',
    featured: false,
    tags: ''
  });

  const categories = ['Conversational AI', 'Image Generation', 'Code Assistant', 'Productivity', 'Video Generation', 'Audio', 'Data Analysis'];

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      url: '',
      image: '',
      featured: false,
      tags: ''
    });
    setIsAdding(false);
    setEditingTool(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toolData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingTool) {
      updateTool(editingTool.id, toolData);
    } else {
      addTool(toolData);
    }
    resetForm();
  };

  const handleEdit = (tool) => {
    setEditingTool(tool);
    setFormData({
      ...tool,
      tags: tool.tags.join(', ')
    });
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      deleteTool(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <SafeIcon icon={FiArrowLeft} />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          </div>
          
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/25"
          >
            <SafeIcon icon={FiPlus} />
            <span>Add New Tool</span>
          </button>
        </motion.div>

        {/* Add/Edit Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                {editingTool ? 'Edit Tool' : 'Add New Tool'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <SafeIcon icon={FiX} size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tool Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                required
              />
              
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                ))}
              </select>

              <input
                type="url"
                placeholder="Tool URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                required
              />

              <input
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 md:col-span-2"
                rows="3"
                required
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="featured" className="text-white">Featured Tool</label>
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  <SafeIcon icon={FiSave} />
                  <span>{editingTool ? 'Update' : 'Add'} Tool</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tools List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{tool.name}</h3>
                  <p className="text-purple-300 text-sm">{tool.category}</p>
                  {tool.featured && (
                    <span className="inline-block px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-semibold rounded-full mt-2">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(tool)}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <SafeIcon icon={FiEdit2} size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} size={16} />
                  </button>
                </div>
              </div>
              
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              
              <p className="text-white/80 text-sm mb-3 line-clamp-2">{tool.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {tool.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-purple-500/30 text-purple-200 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;