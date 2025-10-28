import React from "react";
import { motion } from "framer-motion";

/**
 * Footer component with company information and links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        "AI & Data Solutions",
        "Software Development",
        "IoT Integration",
        "Web & App Development",
        "IT Procurement",
        "Maintenance & Support",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Our Process", "Case Studies", "Careers", "Contact"],
    },
    {
      title: "Support",
      links: ["Help Center", "Documentation", "API Status", "Service Status"],
    },
  ];

  return (
    <footer className='bg-slate-900 border-t border-slate-800'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <motion.div className='flex items-center space-x-2 mb-4' whileHover={{ scale: 1.05 }}>
              <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>D</span>
              </div>
              <span className='text-white font-bold text-xl'>Digvano</span>
            </motion.div>
            <p className='text-gray-400 mb-4 max-w-md'>
              Transforming businesses through cutting-edge AI, IoT, and software solutions. We build intelligent systems
              that drive growth and innovation.
            </p>
            <div className='flex space-x-4'>
              {["Twitter", "LinkedIn", "GitHub", "Facebook"].map((social) => (
                <motion.a
                  key={social}
                  href='#'
                  className='text-gray-400 hover:text-purple-400 transition-colors duration-300'
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}>
                  <span className='sr-only'>{social}</span>
                  <div className='w-6 h-6 bg-current rounded-sm' />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className='text-white font-semibold mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link, linkIndex) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a href='#' className='text-gray-400 hover:text-white transition-colors duration-300 text-sm'>
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>© {currentYear} Digvano. All rights reserved.</p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <motion.a
                key={item}
                href='#'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
                whileHover={{ scale: 1.05 }}>
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
