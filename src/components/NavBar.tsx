import React from 'react';

interface NavBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Navigation */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40 mobile-menu md:hidden border-[3px] border-white/80 rounded-l-lg shadow-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20">
          <div className="px-4 pb-4">
            <div className="flex items-center space-x-2 border border-gray-700 rounded p-2 mb-4">
              <div className="flex-1">
                <div className="h-8 flex items-center justify-start">
                  {/* This is where the navigation header would go, but we're not including the text from the image */}
                </div>
              </div>
            </div>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="py-4 px-6 text-left hover:bg-gray-800 transition-colors border border-white/30 m-2 rounded"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white hidden md:block border-[3px] border-white/80 rounded-r-lg shadow-lg">
        <div className="flex flex-col h-full pt-20">
          <div className="px-4 pb-4">
            <div className="flex items-center space-x-2 border border-gray-700 rounded p-2 mb-4">
              <div className="flex-1">
                <div className="h-8 flex items-center justify-start">
                  {/* This is where the navigation header would go, but we're not including the text from the image */}
                </div>
              </div>
            </div>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="py-4 px-6 text-left hover:bg-gray-800 transition-colors border border-white/30 m-2 rounded"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;