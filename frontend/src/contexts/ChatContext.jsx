import React, { createContext, useContext, useState, useCallback } from "react";

// Create context
const ChatContext = createContext();

// Custom hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

// Provider component
export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "What services do you offer?":
          "We offer AI & Data Solutions, Software Development, IoT Integration, Web & App Development, IT Procurement, and Maintenance services. Check our Services section for details!",
        "How much does a project cost?":
          "Project costs vary based on scope. We offer flexible pricing models starting from $10,000. Contact us for a detailed quote tailored to your needs.",
        "Do you work with startups?":
          "Absolutely! We love working with startups and offer special packages for early-stage companies. We can help you build your MVP and scale efficiently.",
        "What's your development process?":
          "Our process includes: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development & Testing, 4) Deployment, and 5) Ongoing Support.",
        hello: "Hello! I'm your Digvano assistant. How can I help you today?",
        hi: "Hi there! I'm here to help you learn about Digvano's services. What would you like to know?",
      };

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content:
          responses[message] ||
          "Thanks for your message! I'm here to help you learn about Digvano's services. How can I assist you today?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const value = {
    isChatOpen,
    setIsChatOpen,
    messages,
    sendMessage,
    isLoading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
