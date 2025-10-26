import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, Minimize2, Maximize2, MessageSquare, Trash2, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { useChatStore } from '@/store/useChatStore';
import { GEMINI_API_KEY, DATABASE_URL, isGeminiEnabled, isDatabaseEnabled } from '@/config/env';

// Initialize Gemini API with validation
let genAI: GoogleGenerativeAI | null = null;
let model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

if (isGeminiEnabled()) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// System prompt for the financial AI assistant
const SYSTEM_PROMPT = `You are a helpful financial AI assistant for FinTechForge, a comprehensive financial platform. Your role is to:
1. Help users navigate the website and understand features
2. Provide information about financial tools and services
3. Answer questions about:
   - Market data and analysis
   - Stock and crypto heatmaps
   - Currency conversion
   - Financial news
   - Portfolio tracking
   - AI-powered insights
4. Guide users through onboarding and account features
5. Explain financial concepts in simple terms
Keep responses concise, professional, and focused on financial topics. If asked about non-financial topics, politely redirect to financial matters.
Always maintain a helpful and friendly tone while being professional.`;

// Use the system prompt in chat initialization
const createChatPrompt = (contextChunks: string[]) => `
${SYSTEM_PROMPT}

Context:
${contextChunks.join('\n\n')}

Respond professionally using only financial domain knowledge.
If the topic is unclear or irrelevant, politely redirect the user.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function ChatBot() {

  const { setChatOpen } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your FinTechForge AI assistant. How can I help you with your financial needs today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // All your existing useEffect hooks (unchanged)
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // All your existing functions (unchanged)
  const clearChatHistory = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m your FinTechForge AI assistant. How can I help you with your financial needs today?',
      timestamp: Date.now()
    }]);
    localStorage.removeItem('chatHistory');
    toast.success('Chat history cleared');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isGeminiEnabled()) {
      toast.error('Gemini API key is missing. ChatBot functionality is not available.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      // 🧠 1. Fetch relevant context chunks from Chroma
      let contextChunks: string[] = [];
      
      // Only try to fetch context if database is enabled
      if (isDatabaseEnabled()) {
        try {
          const fetchContextChunks = async (query: string): Promise<string[]> => {
            const res = await fetch(`${DATABASE_URL}/chroma-search?q=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error("Chroma fetch failed");
            const data = await res.json();
            return data;
          };
          contextChunks = await fetchContextChunks(userMessage);
        } catch (error) {
          console.warn('Failed to fetch context chunks:', error);
          // Continue without context chunks
        }
      }

      // 🧠 2. Create a dynamic prompt using the context
      const dynamicPrompt = createChatPrompt(contextChunks);

      // 🧠 3. Convert message history to Gemini-compatible format
      const conversationHistory = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      // 🧠 4. Start Gemini chat with context-aware prompt
      if (!model) {
        throw new Error('Gemini model is not initialized');
      }
      
      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: dynamicPrompt }] },
          ...conversationHistory,
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: text,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response. Please try again.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };


  const toggleChat = () => {
  setIsOpen((prev) => {
    const next = !prev;
    setChatOpen(next);
    return next;
  });

  if (!isOpen) setIsMinimized(false);
};

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Enhanced Backdrop Blur Effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .glassmorphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glassmorphism-dark {
          background: rgba(17, 24, 39, 0.98);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2px;
          border-radius: 16px;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        .typing-dot:nth-child(3) { animation-delay: 0s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
        .message-bubble {
          position: relative;
          overflow: hidden;
        }
        .message-bubble::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .message-bubble:hover::before {
          left: 100%;
        }
        `
      }} />
      
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.9, rotateX: 15 }}
      transition={{
        type: "spring",
        duration: 0.5,
        stiffness: 180,
        damping: 24,
      }}
      className={cn(
        "fixed bottom-6 right-4 z-10000",
        "w-[90vw] sm:w-[400px] rounded-2xl overflow-hidden shadow-xl",
        "glassmorphism dark:glassmorphism-dark",
        isMinimized ? "h-[60px]" : "h-[70vh]"
      )}
      style={{
        minHeight: isMinimized ? '60px' : '280px',
        maxHeight: isMinimized ? '60px' : '90vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
            {/* Enhanced Header with Gradient and Glass Effect */}
            <motion.div 
              className="relative overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700" />
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/90 via-purple-500/90 to-indigo-600/90 backdrop-blur-sm" />
              
              <div className="relative flex items-center justify-between p-4 text-white">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full bg-linear-to-r from-white/20 to-transparent"
                    />
                    <div className="relative p-2 rounded-full bg-white/20 backdrop-blur-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">FinTech AI</span>
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span>Online</span>
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex items-center space-x-1">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full transition-all duration-200 h-8 w-8"
                      onClick={clearChatHistory}
                      title="Clear chat history"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full transition-all duration-200 h-8 w-8"
                      onClick={toggleMinimize}
                    >
                      {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full transition-all duration-200 h-8 w-8"
                      onClick={toggleChat}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {!isMinimized && (
              <>
                {/* Enhanced Messages Area - Dynamically sized */}
                <ScrollArea 
                  ref={scrollAreaRef} 
                  className="flex-1 p-4"
                  style={{ height: '40vh' }}
                >
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                        className={cn(
                          "flex flex-col gap-1",
                          message.role === 'user' ? 'items-end' : 'items-start'
                        )}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={cn(
                            "max-w-[85%] rounded-xl p-3 message-bubble transition-all duration-300 text-sm",
                            message.role === 'user'
                              ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                              : "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 backdrop-blur-sm border border-white/20 shadow-md"
                          )}
                          style={{
                            boxShadow: message.role === 'user' 
                              ? '0 4px 20px rgba(99, 102, 241, 0.3)' 
                              : '0 4px 20px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <div className="flex items-start gap-2">
                            {message.role === 'assistant' && (
                              <div className="shrink-0 mt-0.5">
                                <div className="w-5 h-5 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                  <TrendingUp className="w-2.5 h-2.5 text-white" />
                                </div>
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="leading-relaxed">{message.content}</div>
                            </div>
                          </div>
                        </motion.div>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-xs text-gray-500 dark:text-gray-400 px-2"
                        >
                          {formatTimestamp(message.timestamp)}
                        </motion.span>
                      </motion.div>
                    ))}
                    
                    {/* Enhanced Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-md">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <TrendingUp className="w-2.5 h-2.5 text-white" />
                            </div>
                            <div className="typing-indicator">
                              <div className="typing-dot"></div>
                              <div className="typing-dot"></div>
                              <div className="typing-dot"></div>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-300">AI is thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Enhanced Input Area */}
                <motion.div 
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 border-t border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md text-sm text-gray-900 dark:text-gray-100 shadow-inner"
                >
                  <form onSubmit={handleSubmit} className="relative">
                    <div className="relative flex items-center gap-2 p-2 rounded-xl bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about markets, investments..."
                        className="flex-1 border-0 bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 text-gray-900 dark:text-gray-100 text-sm"
                        disabled={isLoading}
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          type="submit" 
                          disabled={isLoading || !input.trim()}
                          className="rounded-lg bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg transition-all duration-200 h-8 w-8"
                          size="icon"
                        >
                          <Send className="w-3 h-3" />
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Toggle Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Button
            onClick={toggleChat}
            className="relative rounded-full w-14 h-14 bg-linear-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl border-2 border-white/20 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            />
            <MessageSquare className="w-6 h-6 relative z-10" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
