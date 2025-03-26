import React, { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react';
import NavBar from './components/NavBar';
import Section from './components/Section';
import TikTokPortfolio from './components/TikTokPortfolio';
import ParticleBackground from './components/ParticleBackground';
import ContactPopup from './components/ContactPopup';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const englishName = "Parn (Sitharinee Luntha)";
  const thaiName = "ป่าน (สิธาริณี ลุนทา)";

  useEffect(() => {
    const currentText = isEnglish ? englishName : thaiName;
    
    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // พิมพ์ตัวละ 100ms

      return () => clearTimeout(timer);
    } else {
      // เมื่อพิมพ์เสร็จ รอ 10 วินาทีแล้วเริ่มใหม่
      const timer = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
        setIsEnglish(prev => !prev);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isEnglish]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <a href="#home" className="text-white font-bold text-xl">Parn | ป่าน</a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#profile" className="text-gray-300 hover:text-white transition-colors">Profile</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-900`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#profile" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</a>
            <a href="#portfolio" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Home Section */}
        <Section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
          <ParticleBackground />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 relative z-10 -translate-y-12">
              <img 
                src="/profile.png"
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white shadow-xl object-cover"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {displayText}
              </h1>
              <p className="text-xl text-gray-300 mb-8">Video Editor & Content Creator</p>
              <div className="flex justify-center space-x-4">
                <a href="Sitharineeluntha@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
                <a href="+66 80 282 9086" className="text-gray-300 hover:text-white transition-colors">
                  <Phone size={24} />
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Profile Section */}
        <Section id="profile" className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-center text-lg">
                มีประสบการณ์ทำงานด้านตัดต่อ 1 ปี มีความรู้ เชี่ยวชาญใน
                <span className="font-medium">โปรแกรม Adobe Premiere Pro, Adobe Photoshop และ Capcut สามารถคิดไอเดีย สตอรี่บอร์ด และคอนเทนต์ให้กับช่องได้</span>
              </p>
              <div className="w-16 h-0.5 bg-gray-300 mx-auto my-6"></div>
              <p className="text-gray-700 leading-relaxed text-center text-lg italic">
                รักแมว รักหมา
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-12 text-center">Profile</h2>
          <div className="max-w-4xl mx-auto">
            {/* Personal Information */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Name:</span> Sitharinee Luntha</p>
                <p><span className="font-medium">Date of Birth:</span> November 17, 1999</p>
                <p><span className="font-medium">Location:</span> Samut Prakan, Thailand</p>
              </div>
            </div>

            {/* Education */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">Bachelor's Degree</h4>
                <p className="text-gray-600">Digital Media and Cinematic Arts VFX Major</p>
                <p className="text-gray-600">Bangkok University</p>
              </div>
            </div>


            {/* Awards and Achievements */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Awards</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">7HD NEWS, NEWS IDEA CONTEST</h4>
                <p className="text-gray-600">2019</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="space-y-2">
                  <div className="bg-gray-100 p-3 rounded">
                    Proficient in Adobe Premiere Pro, Photoshop, After Effects, Illustrator, and Capcut
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    Creating storyboards and content concepts
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    Strong in VFX
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    Highly adaptable, disciplined, and a team player
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    Quick learner
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    Able to work efficiently
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Video Editor / Content Creator</h4>
                    <p className="font-medium">Easy and Perfect</p>
                    <p className="text-gray-600">January 2024 - Current</p>
                    <ul className="list-disc ml-4 mt-2 text-gray-600 text-sm">
                      <li>Video editing, content creation, photography, videography</li>
                      <li>Managing social media platforms such as TikTok, YouTube, and other assigned tasks</li>
                    </ul>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Summary</h3>
                  <div className="bg-gray-100 p-3 rounded">
                    1 year of experience in video editing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Portfolio Section */}
        <Section id="portfolio" className="py-20 px-4 md:px-8 bg-gray-50">
          <h2 className="text-3xl font-bold mb-12 text-center">Portfolio</h2>
          <TikTokPortfolio />
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="py-20 px-4 md:px-8 bg-white">
          <h2 className="text-3xl font-bold mb-12 text-center">Contact</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="text-xl font-semibold mb-4">Contact me</h3>
              <div className="flex items-center space-x-3">
                <Mail size={20} />
                <span>Sitharineeluntha@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} />
                <span>+66 80 282 9086</span>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <ContactPopup />
    </div>
  );
}

export default App