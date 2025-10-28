import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

/**
 * Animated 3D sphere with distortion effect for hero section
 */
const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Create floating animation with subtle distortion
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Sphere visible args={[1, 100, 200]} ref={meshRef} scale={2.4}>
      <MeshDistortMaterial
        color='#6366f1'
        attach='material'
        distort={0.5}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

/**
 * Main Hero Section with 3D Background
 */
const Hero3D = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id='home' className='relative h-screen flex items-center justify-center overflow-hidden'>
      {/* 3D Background Canvas */}
      <div className='absolute inset-0 z-0'>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className='relative z-10 text-center text-white px-4 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
            Transforming Ideas into
            <span className='block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text'>
              Digital Reality
            </span>
          </h1>

          <motion.p
            className='text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            We build intelligent solutions powered by AI, IoT, and cutting-edge web technologies to drive your business
            forward in the digital age.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <motion.button
              className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}>
              Start Your Project
            </motion.button>
            <motion.button
              className='border border-purple-400 text-purple-300 hover:bg-purple-900/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:border-purple-300'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}>
              View Our Services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}>
        <motion.div
          className='flex flex-col items-center cursor-pointer'
          onClick={scrollToServices}
          whileHover={{ y: 5 }}>
          <span className='text-gray-400 text-sm mb-2'>Scroll to explore</span>
          <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
            <motion.div
              className='w-1 h-3 bg-gray-400 rounded-full mt-2'
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 pointer-events-none' />
    </section>
  );
};

export default Hero3D;
