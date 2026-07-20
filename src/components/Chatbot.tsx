declare module 'react';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  RotateCw, 
  Sparkles, 
  Bot, 
  Send, 
  User, 
  Trash2, 
  CornerDownLeft, 
  ArrowRight 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "What are Sameer's main skills?",
  "Tell me about the NextShop project.",
  "What did he do at Apex Software Labs?",
  "Is Sameer available for new projects?",
  "What is Sameer's educational background?"
];

// Simple, clean custom markdown formatter to render bold, list items, and lines nicely
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lineIndex) => {
    let trimmed = line.trim();
    
    // Check for lists
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const content = trimmed.substring(2);
      return (
        <li key={lineIndex} className="ml-4 list-disc text-zinc-300 text-xs sm:text-sm my-1 leading-relaxed">
          {formatInline(content)}
        </li>
      );
    }
    
    if (trimmed === '') {
      return <div key={lineIndex} className="h-2" />;
    }

    return (
      <p key={lineIndex} className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-1.5">
        {formatInline(line)}
      </p>
    );
  });
}

function formatInline(text: string): React.ReactNode[] {
  // Regex to match **bold** and `code`
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let key = 0;

  while (currentText.length > 0) {
    const boldIndex = currentText.indexOf('**');
    const codeIndex = currentText.indexOf('`');

    if (boldIndex === -1 && codeIndex === -1) {
      parts.push(<span key={key++}>{currentText}</span>);
      break;
    }

    // Determine which comes first
    if (boldIndex !== -1 && (codeIndex === -1 || boldIndex < codeIndex)) {
      if (boldIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, boldIndex)}</span>);
      }
      const closeBold = currentText.indexOf('**', boldIndex + 2);
      if (closeBold !== -1) {
        parts.push(
          <strong key={key++} className="font-semibold text-zinc-100">
            {currentText.substring(boldIndex + 2, closeBold)}
          </strong>
        );
        currentText = currentText.substring(closeBold + 2);
      } else {
        parts.push(<span key={key++}>**</span>);
        currentText = currentText.substring(boldIndex + 2);
      }
    } else {
      if (codeIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, codeIndex)}</span>);
      }
      const closeCode = currentText.indexOf('`', codeIndex + 1);
      if (closeCode !== -1) {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-mono text-emerald-400">
            {currentText.substring(codeIndex + 1, closeCode)}
          </code>
        );
        currentText = currentText.substring(closeCode + 1);
      } else {
        parts.push(<span key={key++}>`</span>);
        currentText = currentText.substring(codeIndex + 1);
      }
    }
  }

  return parts;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there! I am Sameer's portfolio assistant. Ask me anything about Sameer's projects, technical skills, professional work experience, or education. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Reconstruct simple history format
      const historyPayload = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'model',
        text: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chatbot submission error:", err);
      setErrorMsg(err.message || "Failed to connect to the assistant server. Please check the developer console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Conversation cleared! Ask me anything about Sameer's background or portfolio.",
        timestamp: new Date()
      }
    ]);
    setErrorMsg(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="chatbot_floating_btn"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 1, stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white rounded-full shadow-lg shadow-emerald-500/20 flex items-center justify-center cursor-pointer group hover:shadow-indigo-500/30 transition-all border border-emerald-400/20"
        title="Chat with Portfolio Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-zinc-950"></span>
        </span>
        <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
      </motion.button>

      {/* Chatbot Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="chatbot_backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            <motion.div
              id="chatbot_drawer"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-zinc-950 border-l border-zinc-900 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center border border-zinc-800">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-sm text-zinc-100 flex items-center gap-1.5">
                      Sameer's Assistant
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-500">Answers instantly • Always Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleClearChat}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800/60 rounded-md transition-colors"
                    title="Clear Conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-md transition-colors"
                    title="Minimize Chat"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-950/40 custom-scrollbar">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 max-w-[85%] ${
                      msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    }`}
                  >
                    {/* Avatar icon */}
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border text-xs ${
                      msg.role === 'user'
                        ? 'bg-indigo-650 border-indigo-500/20 text-indigo-200'
                        : 'bg-zinc-900 border-zinc-800 text-emerald-400'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Bubble Content */}
                    <div className="flex flex-col gap-1">
                      <div className={`px-4 py-3 rounded-2xl border ${
                        msg.role === 'user'
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-100 rounded-tr-none'
                          : 'bg-zinc-900/60 border-zinc-900 text-zinc-300 rounded-tl-none'
                      }`}>
                        {msg.role === 'user' ? (
                          <p className="text-xs sm:text-sm leading-relaxed text-zinc-100">{msg.text}</p>
                        ) : (
                          renderMarkdown(msg.text)
                        )}
                      </div>
                      <span className={`text-[9px] font-mono text-zinc-500 px-1 ${
                        msg.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Loading state */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 max-w-[85%] mr-auto"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 bg-zinc-900/40 border border-zinc-900/50 rounded-2xl rounded-tl-none flex items-center gap-1.5 h-10">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}

                {/* Error message */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl flex flex-col gap-1.5"
                  >
                    <p className="font-mono font-medium">{errorMsg}</p>
                    <button
                      onClick={() => handleSendMessage(messages[messages.length - 1]?.text || "")}
                      className="text-[10px] uppercase tracking-wider font-bold text-red-300 hover:text-red-200 text-left underline flex items-center gap-1"
                    >
                      Retry sending <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions / Inputs area */}
              <div className="px-5 py-4 bg-zinc-900 border-t border-zinc-800 shrink-0 space-y-4">
                {/* Suggested Prompts list */}
                {messages.length < 3 && !isLoading && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Suggested Questions</p>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar pr-1">
                      {SUGGESTED_PROMPTS.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-[11px] text-zinc-400 hover:text-emerald-400 rounded-lg border border-zinc-800/80 hover:border-emerald-500/20 text-left transition-all duration-200 cursor-pointer flex items-center gap-1"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="relative flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    placeholder={isLoading ? "Thinking..." : "Type a question..."}
                    className="w-full pl-4 pr-12 py-3 bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-200 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2.5 p-2 bg-gradient-to-tr from-emerald-500 to-indigo-600 hover:brightness-110 disabled:opacity-40 text-white rounded-lg transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                    title="Send"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Powered and Status indicators */}
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Offline-Free Sandbox
                  </span>
                  <span className="flex items-center gap-1">
                    Powered by Google Gemini 3.5
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
