import React, { useState, useEffect } from 'react';
import { Mail, Phone, X } from 'lucide-react';

const ContactPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past home section
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeSectionBottom = homeSection.getBoundingClientRect().bottom;
        setIsVisible(homeSectionBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105 z-50 pulse"
      >
        <Mail size={24} />
      </button>

      {/* Contact Dialog */}
      {isOpen && (
        <div className="fixed bottom-32 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 animate-slideDown border border-gray-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Contact Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-600" />
                <a 
                  href="mailto:Sitharineeluntha@gmail.com"
                  className="text-gray-700 hover:text-gray-900 hover:underline"
                >
                  Sitharineeluntha@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-600" />
                <a 
                  href="tel:+66802829086"
                  className="text-gray-700 hover:text-gray-900 hover:underline"
                >
                  +66 80 282 9086
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPopup; 