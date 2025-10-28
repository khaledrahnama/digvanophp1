import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Services section showcasing company offerings with interactive cards
 */
const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      id: 1,
      title: "AI & Data Solutions",
      icon: "🤖",
      description: "Intelligent systems that learn and adapt to your business needs.",
      features: [
        "Machine Learning Models",
        "Predictive Analytics",
        "Computer Vision",
        "Data Engineering",
        "AI-powered Automation",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Software & Systems Development",
      icon: "💻",
      description: "Custom enterprise solutions built for scale and performance.",
      features: [
        "Custom Enterprise Tools",
        "Automation Software",
        "Cloud Solutions",
        "API Development",
        "System Architecture",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "IoT & Smart Integration",
      icon: "🌐",
      description: "Connected ecosystems that bridge hardware and software.",
      features: [
        "Smart Device Integration",
        "Industrial IoT",
        "Real-time Monitoring",
        "Hardware-Software Ecosystems",
        "Sensor Networks",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Web & App Development",
      icon: "📱",
      description: "Modern, responsive applications that deliver exceptional user experiences.",
      features: [
        "React & Next.js Applications",
        "Mobile App Development",
        "Progressive Web Apps",
        "E-commerce Solutions",
        "UI/UX Design",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "IT Procurement",
      icon: "🛒",
      description: "Strategic technology sourcing and implementation services.",
      features: [
        "Hardware Procurement",
        "Software Licensing",
        "Vendor Management",
        "Cost Optimization",
        "Technology Assessment",
      ],
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Maintenance & Support",
      icon: "🔧",
      description: "Reliable ongoing support to keep your systems running smoothly.",
      features: [
        "24/7 System Monitoring",
        "Proactive Maintenance",
        "Security Updates",
        "Performance Optimization",
        "Technical Support",
      ],
      gradient: "from-gray-500 to-blue-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id='services' ref={ref} className='py-20 bg-slate-900'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Our{" "}
            <span className='text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text'>Services</span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Comprehensive technology solutions tailored to drive your business forward in the digital landscape.
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? "visible" : "hidden"}>
          {services.map((service, index) => (
            <motion.div key={service.id} variants={itemVariants} className='group relative'>
              <div className='relative h-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:transform hover:scale-105'>
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className='text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300'>
                  {service.title}
                </h3>

                <p className='text-gray-300 mb-4 leading-relaxed'>{service.description}</p>

                {/* Features */}
                <ul className='space-y-2'>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center text-sm text-gray-400'>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Gradient Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}>
          <p className='text-gray-300 mb-6 text-lg'>Ready to transform your business with our solutions?</p>
          <motion.button
            className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Start Your Project Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
