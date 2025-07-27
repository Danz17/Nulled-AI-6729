import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToolsProvider } from './context/ToolsContext';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <ToolsProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </ToolsProvider>
  );
}

export default App;