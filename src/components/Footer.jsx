import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiGithub, FiTwitter, FiMail, FiZap } = FiIcons;

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <SafeIcon icon={FiZap} className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Tools Catalog</h3>
                <p className="text-xs text-white/60">Discover the Future</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your gateway to the most innovative AI tools and technologies. 
              Curated for creators, developers, and innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Categories</h4>
            <div className="space-y-2 text-sm">
              {['Conversational AI', 'Image Generation', 'Code Assistant', 'Productivity'].map((category) => (
                <div key={category} className="text-white/70 hover:text-purple-300 transition-colors cursor-pointer">
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {[
                { icon: FiGithub, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiMail, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <SafeIcon icon={social.icon} size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <p className="text-white/60 text-sm flex items-center space-x-1">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="text-red-400" size={14} />
            <span>for the AI community</span>
          </p>
          <p className="text-white/60 text-sm">
            © 2024 AI Tools Catalog. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;