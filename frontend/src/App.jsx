import React from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import Hero3D from "./components/sections/Hero3D";
import Services from "./components/sections/Services";
import ContactForm from "./components/forms/ContactForm";
import FAQ from "./components/sections/FAQ";
import { ChatProvider } from "./contexts/ChatContext";
import Chatbot from "./components/ui/Chatbot";

function App() {
  return (
      <MotionConfig reducedMotion='user'>
          <ChatProvider>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
        <Header />
        <main className='relative'>
                  <Hero3D />
                  <Services />
                  <FAQ />
                  <ContactForm />
              </main>
              <Chatbot />
          </div>
          </ChatProvider>
    </MotionConfig>
  );
}

export default App;
