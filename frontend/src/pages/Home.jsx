import React from "react";

// Components
import Hero3D from "../components/sections/Hero3D";
import Services from "../components/sections/Services";
import FAQ from "../components/sections/FAQ";
import ContactForm from "../components/forms/ContactForm";
import Chatbot from "../components/ui/Chatbot";

/**
 * Home page component that brings all sections together
 */
const Home = () => {
  return (
    <div className='relative'>
      <Hero3D />
      <Services />
      <FAQ />
      <ContactForm />
      <Chatbot />
    </div>
  );
};

export default Home;

