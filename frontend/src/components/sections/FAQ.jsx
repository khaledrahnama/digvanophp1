import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * FAQ section with interactive accordion and search functionality
 */
const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = [
    {
      question: "What services does Digvano offer?",
      answer:
        "We offer comprehensive IT solutions including AI & Data Solutions, Software Development, IoT Integration, Web & App Development, IT Procurement, and Maintenance & Support services. Each service is tailored to meet specific business needs.",
      category: "services",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity. Small websites take 2-4 weeks, custom software 1-3 months, and enterprise AI solutions 3-6 months. We provide detailed timelines after initial consultation.",
      category: "projects",
    },
    {
      question: "Do you work with startups?",
      answer:
        "Absolutely! We specialize in helping startups build their MVP and scale their technology. We offer flexible engagement models and understand the unique challenges startups face.",
      category: "clients",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We use modern tech stacks including React, Node.js, Python, TensorFlow, AWS, Azure, and various IoT platforms. We choose technologies based on project requirements and long-term maintainability.",
      category: "technology",
    },
    {
      question: "How do you handle project security?",
      answer:
        "Security is our priority. We implement industry best practices including encryption, secure coding standards, regular security audits, and compliance with relevant regulations like GDPR and HIPAA where applicable.",
      category: "security",
    },
    {
      question: "Can you work with our existing team?",
      answer:
        "Yes, we often collaborate with in-house teams. We can augment your existing capabilities, provide specialized expertise, or work as a complete outsourced development team.",
      category: "collaboration",
    },
    {
      question: "What's your pricing model?",
      answer:
        "We offer flexible pricing: fixed-price for well-defined projects, time-and-materials for agile development, and dedicated teams for long-term partnerships. We provide transparent quotes with no hidden costs.",
      category: "pricing",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we offer comprehensive maintenance and support packages including 24/7 monitoring, regular updates, security patches, and performance optimization to ensure your systems run smoothly.",
      category: "support",
    },
  ];

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id='faq' ref={ref} className='py-20 bg-slate-900'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Frequently Asked{" "}
            <span className='text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text'>
              Questions
            </span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Find answers to common questions about our services, process, and partnerships.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className='max-w-2xl mx-auto mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search questions...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
            />
            <div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'>🔍</div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className='max-w-4xl mx-auto'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}>
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              className='mb-4 bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full px-6 py-6 text-left flex justify-between items-center hover:bg-slate-700/30 transition-all duration-300'>
                <h3 className='text-lg font-semibold text-white pr-4'>{faq.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex-shrink-0 w-6 h-6 text-purple-400'>
                  ▼
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='overflow-hidden'>
                    <div className='px-6 pb-6'>
                      <p className='text-gray-300 leading-relaxed'>{faq.answer}</p>
                      <span className='inline-block mt-3 px-3 py-1 bg-slate-700 text-purple-300 text-sm rounded-full'>
                        {faq.category}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}>
          <p className='text-gray-300 mb-6 text-lg'>Can't find what you're looking for?</p>
          <motion.button
            className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
