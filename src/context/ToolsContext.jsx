import React, { createContext, useContext, useState, useEffect } from 'react';

const ToolsContext = createContext();

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};

const initialTools = [
  {
    id: 1,
    name: 'ChatGPT',
    category: 'Conversational AI',
    description: 'Advanced AI chatbot for natural language conversations and assistance.',
    url: 'https://chat.openai.com',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    featured: true,
    tags: ['Chat', 'NLP', 'OpenAI']
  },
  {
    id: 2,
    name: 'Midjourney',
    category: 'Image Generation',
    description: 'Create stunning AI-generated artwork and images from text prompts.',
    url: 'https://midjourney.com',
    image: 'https://images.unsplash.com/photo-1686191128892-bf4e4bf5e0e0?w=400&h=300&fit=crop',
    featured: true,
    tags: ['Art', 'Images', 'Creative']
  },
  {
    id: 3,
    name: 'GitHub Copilot',
    category: 'Code Assistant',
    description: 'AI-powered code completion and programming assistant.',
    url: 'https://github.com/features/copilot',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    featured: false,
    tags: ['Code', 'Programming', 'GitHub']
  },
  {
    id: 4,
    name: 'Notion AI',
    category: 'Productivity',
    description: 'Intelligent writing assistant integrated into Notion workspace.',
    url: 'https://notion.so',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    featured: false,
    tags: ['Writing', 'Productivity', 'Notes']
  },
  {
    id: 5,
    name: 'RunwayML',
    category: 'Video Generation',
    description: 'AI-powered video editing and generation platform.',
    url: 'https://runwayml.com',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    featured: true,
    tags: ['Video', 'Editing', 'Creative']
  },
  {
    id: 6,
    name: 'Stable Diffusion',
    category: 'Image Generation',
    description: 'Open-source AI model for generating images from text descriptions.',
    url: 'https://stability.ai',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
    featured: false,
    tags: ['Images', 'Open Source', 'Art']
  }
];

export const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState(() => {
    const savedTools = localStorage.getItem('aiToolsCatalog');
    return savedTools ? JSON.parse(savedTools) : initialTools;
  });

  useEffect(() => {
    localStorage.setItem('aiToolsCatalog', JSON.stringify(tools));
  }, [tools]);

  const addTool = (tool) => {
    const newTool = {
      ...tool,
      id: Date.now(),
    };
    setTools(prev => [...prev, newTool]);
  };

  const updateTool = (id, updatedTool) => {
    setTools(prev => prev.map(tool => 
      tool.id === id ? { ...tool, ...updatedTool } : tool
    ));
  };

  const deleteTool = (id) => {
    setTools(prev => prev.filter(tool => tool.id !== id));
  };

  return (
    <ToolsContext.Provider value={{
      tools,
      addTool,
      updateTool,
      deleteTool
    }}>
      {children}
    </ToolsContext.Provider>
  );
};