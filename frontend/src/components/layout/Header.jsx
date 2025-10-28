import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Header component with responsive navigation and smooth animations
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div
            className='flex items-center space-x-2'
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>D</span>
            </div>
            <span className='text-white font-bold text-xl'>Digvano</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className='text-gray-300 hover:text-white transition-colors duration-300 relative py-2'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                {item.name}
                <motion.div
                  className='absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500'
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            className='hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300'
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("#contact")}>
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button className='md:hidden text-white p-2' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className='w-6 h-6 flex flex-col justify-center space-y-1'>
              <motion.span
                className='w-6 h-0.5 bg-white block'
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
              />
              <motion.span className='w-6 h-0.5 bg-white block' animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} />
              <motion.span
                className='w-6 h-0.5 bg-white block'
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className='md:hidden mt-4 py-4 glass rounded-lg'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}>
              <div className='flex flex-col space-y-4'>
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className='text-gray-300 hover:text-white px-4 py-2 text-left transition-colors duration-300'
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}>
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  className='bg-purple-600 hover:bg-purple-700 text-white mx-4 py-2 rounded-lg font-semibold transition-colors duration-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("#contact")}>
                  Get Started
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
