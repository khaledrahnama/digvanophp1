// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { MotionConfig } from "framer-motion";

// // Components
// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
// import Home from "./pages/Home";
// import ScrollToTop from "./components/utils/ScrollToTop";

// // Context Providers
// import { ChatProvider } from "./contexts/ChatContext.jsx";
// import { FormProvider } from "./contexts/FormContext";

// /**
//  * Main application component
//  * Wraps the entire app with necessary providers and routers
//  */
// function App() {
//   return (
//     <MotionConfig reducedMotion='user'>
//       <ChatProvider>
//         <FormProvider>
//           <Router>
//             <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
//               <Header />
//               <main className='relative'>
//                 <Routes>
//                   <Route path='/' element={<Home />} />
//                 </Routes>
//               </main>
//               <Footer />
//               <ScrollToTop />
//             </div>
//           </Router>
//         </FormProvider>
//       </ChatProvider>
//     </MotionConfig>
//   );
// }

// export default App;


// import React from "react";

// function App() {
//   return (
//     <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
//       <h1 className='text-4xl font-bold text-white'>Digvano Website - Loading...</h1>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import Hero3D from "./components/sections/Hero3D";
import Services from "./components/sections/Services";
import ContactForm from "./components/forms/ContactForm";
import FAQ from "./components/sections/FAQ";

function App() {
  return (
    <MotionConfig reducedMotion='user'>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
        <Header />
        <main className='relative'>
                  <Hero3D />
                  <Services />
                  <FAQ />
                  <ContactForm />
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;

// import React from "react";
// import { MotionConfig } from "framer-motion";
// import Header from "./components/layout/Header";
// import Hero3D from "./components/sections/Hero3D";
// import Services from "./components/sections/Services";
// import ContactForm from "./components/forms/ContactForm";

// function App() {
//   return (
//     <MotionConfig reducedMotion='user'>
//       <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
//         {/* <Header /> */}
//         <main className='relative'>
//           <Hero3D />
//           <Services />
//           {/* <ContactForm /> */}
//         </main>
//       </div>
//     </MotionConfig>
//   );
// }

// export default App;
