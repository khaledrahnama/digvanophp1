import { motion } from "framer-motion";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service_type: "",
    budget_range: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceOptions = [
    { value: "", label: "Select a service" },
    { value: "ai_data_solutions", label: "AI & Data Solutions" },
    { value: "software_development", label: "Software Development" },
    { value: "iot_integration", label: "IoT Integration" },
    { value: "web_app_development", label: "Web & App Development" },
    { value: "procurement", label: "IT Procurement" },
    { value: "maintenance", label: "Maintenance & Support" },
  ];

  const budgetOptions = [
    { value: "", label: "Select budget range" },
    { value: "under-10k", label: "Under $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "100k-plus", label: "$100,000+" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://digvano.com/backend/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        setFormData({
          name: "",
          email: "",
          company: "",
          service_type: "",
          budget_range: "",
          message: "",
        });
      } else {
        setSubmitStatus({ type: "error", message: result.message || "Failed to send message" });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className='py-20 bg-slate-900'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Get In{" "}
            <span className='text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text'>Touch</span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Ready to start your project? Contact us and let's build something amazing together.
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <motion.div
              className='space-y-6'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>
              <div>
                <h3 className='text-2xl font-bold text-white mb-4'>Let's Talk</h3>
                <p className='text-gray-300 leading-relaxed'>
                  Whether you're looking to start a new project, improve existing systems, or just explore
                  possibilities, we're here to help.
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg'>
                  <div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-lg'>📧</span>
                  </div>
                  <div>
                    <p className='text-gray-400 text-sm'>Email</p>
                    <p className='text-white'>contact@digvano.com</p>
                  </div>
                </div>

                <div className='flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg'>
                  <div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-lg'>📞</span>
                  </div>
                  <div>
                    <p className='text-gray-400 text-sm'>Phone</p>
                    <p className='text-white'>+49 172 9163617</p>
                  </div>
                </div>

                <div className='flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg'>
                  <div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-lg'>🕒</span>
                  </div>
                  <div>
                    <p className='text-gray-400 text-sm'>Response Time</p>
                    <p className='text-white'>Within 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300'
                      placeholder='Your full name'
                    />
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300'
                      placeholder='your.email@company.com'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='company' className='block text-sm font-medium text-gray-300 mb-2'>
                    Company
                  </label>
                  <input
                    type='text'
                    id='company'
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300'
                    placeholder='Your company name'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor='service_type' className='block text-sm font-medium text-gray-300 mb-2'>
                      Service Needed
                    </label>
                    <select
                      id='service_type'
                      name='service_type'
                      value={formData.service_type}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all duration-300'>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor='budget_range' className='block text-sm font-medium text-gray-300 mb-2'>
                      Budget Range
                    </label>
                    <select
                      id='budget_range'
                      name='budget_range'
                      value={formData.budget_range}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all duration-300'>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-300 mb-2'>
                    Project Details *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 resize-vertical'
                    placeholder='Tell us about your project, goals, and any specific requirements...'
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
                  {isSubmitting ? (
                    <span className='flex items-center justify-center'>
                      <motion.div
                        className='w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {/* Status Message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                    {submitStatus.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
