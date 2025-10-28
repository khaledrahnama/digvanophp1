import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../contexts/ChatContext";

/**
 * AI Chatbot component with floating button and chat interface
 */
const Chatbot = () => {
  const { isChatOpen, setIsChatOpen, messages, sendMessage, isLoading } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const initialQuestions = [
    "What services do you offer?",
    "How much does a project cost?",
    "Do you work with startups?",
    "What's your development process?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className='fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center text-white z-50'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? "✕" : "💬"}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className='fixed bottom-24 right-6 w-96 h-[500px] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-50 flex flex-col'
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}>
            {/* Chat Header */}
            <div className='bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-2xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                    <span className='text-purple-600 text-lg'>🤖</span>
                  </div>
                  <div>
                    <h3 className='text-white font-semibold'>Digvano Assistant</h3>
                    <p className='text-purple-200 text-sm'>Online • Ready to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className='text-white hover:text-purple-200 transition-colors'>
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {messages.length === 0 ? (
                <div className='text-center text-gray-400 my-8'>
                  <p>Hello! I'm your Digvano assistant. How can I help you today?</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === "user"
                          ? "bg-purple-600 text-white rounded-br-none"
                          : "bg-slate-700 text-gray-200 rounded-bl-none"
                      }`}>
                      {message.content}
                    </div>
                  </motion.div>
                ))
              )}

              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-slate-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3'>
                    <div className='flex space-x-2'>
                      <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                      <div
                        className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                        style={{ animationDelay: "0.1s" }}></div>
                      <div
                        className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                        style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 0 && (
              <div className='px-4 pb-2'>
                <div className='grid grid-cols-2 gap-2'>
                  {initialQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      className='text-xs text-left p-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(question)}>
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className='p-4 border-t border-slate-700'>
              <div className='flex space-x-2'>
                <input
                  type='text'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder='Type your message...'
                  className='flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  disabled={isLoading}
                />
                <motion.button
                  type='submit'
                  disabled={!inputMessage.trim() || isLoading}
                  className='px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}>
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
