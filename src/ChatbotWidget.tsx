import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Settings, 
  Info,
  Maximize2,
  Minimize2,
  FileCode2,
  Trash2
} from 'lucide-react';

import { User } from 'firebase/auth';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isError?: boolean;
}

interface ChatbotWidgetProps {
  user?: User | null;
}

export default function ChatbotWidget({ user }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [integrationMode, setIntegrationMode] = useState<'native' | 'official'>('official');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Chatbase Credentials Configurations
  const [chatbotId, setChatbotId] = useState('R6w20MElns5JwFniAs9Wb');
  const [apiKey, setApiKey] = useState('');
  const [useProxy, setUseProxy] = useState(true);
  const [proxyUrl, setProxyUrl] = useState('/api/chatbase');
  const [showConfig, setShowConfig] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('midzero_chatbot_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error loading chat history', e);
      }
    } else {
      // Default welcome message
      const welcomeMsg: Message = {
        id: 'welcome-01',
        role: 'assistant',
        content: `👋 Hi there! Welcome to **MIDZERO Creative Agency**. 

I am your AI assistant, powered by our custom **Chatbase** integration. How can I help you outperform your competitors and boost your revenue today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
    }

    const savedMode = localStorage.getItem('midzero_chatbot_mode');
    if (savedMode === 'native' || savedMode === 'official') {
      setIntegrationMode(savedMode);
    }
  }, []);

  // Sync messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('midzero_chatbot_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom on updates
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      const welcomeMsg: Message = {
        id: 'welcome-01',
        role: 'assistant',
        content: `👋 Chat history cleared. 

I am here to help you learn more about MIDZERO's products, services, and creative strategies. Ask me anything!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
      localStorage.removeItem('midzero_chatbot_history');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append user message
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let botResponseText = '';
      
      if (!apiKey && useProxy === false) {
        // Fallback simulate response if no key is entered & proxy is turned off
        await new Promise(resolve => setTimeout(resolve, 1500));
        botResponseText = `🤖 **Local Mode Active**: I received your query: "${userText}". 
        
To connect this query directly to your official Chatbase bot, you can either:
1. Toggle to **"Official Embedded"** mode using the Settings icon in the header.
2. Enter your **Chatbase API Key** in the settings panel to enable direct API communication.

Let us know if you want to deploy a secure backend API proxy to query your chatbot without exposing your key!`;
      } else {
        // Query Chatbase API
        const targetUrl = useProxy ? proxyUrl : 'https://www.chatbase.co/api/v1/chat';
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (!useProxy && apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`;
        }

        const payload = {
          messages: messages.concat(userMessage).map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          })),
          chatbotId: chatbotId,
          stream: false,
          temperature: 0.7
        };

        const response = await fetch(targetUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API responded with status code ${response.status}`);
        }

        const data = await response.json();
        // Chatbase v1 response has either 'text' or 'message' property
        botResponseText = data.text || data.message || JSON.stringify(data);
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error: any) {
      console.error('Chatbase API Error:', error);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'system',
        content: `⚠️ **Connection Failure**: Unable to contact Chatbase backend. 
        
*Reason: ${error?.message || 'CORS violation or offline status'}*
        
**How to fix:**
1. Switch to **"Official Embedded"** mode in Settings (which loads Chatbase's secure hosted widget instantly using your public ID).
2. Configure our completed Node.js proxy to routing request safely.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const setMode = (mode: 'native' | 'official') => {
    setIntegrationMode(mode);
    localStorage.setItem('midzero_chatbot_mode', mode);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        <AnimatePresence>
          {(!isOpen) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black shadow-2xl rounded-full p-4 md:p-5 flex items-center justify-center cursor-pointer transition-all border border-zinc-800 dark:border-zinc-200 group relative"
              id="chatbot-trigger-btn"
            >
              {/* Pulsing notifications glow */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
              <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Chat Interface Screen Frame */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized ? '85vw' : '400px',
              height: isMaximized ? '85vh' : '620px',
              maxWidth: '100%',
              maxHeight: '90vh'
            }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-6 right-6 z-50 bg-[#F0F0EE] dark:bg-[#0A0A0A] border border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-800 dark:text-neutral-200 max-w-[calc(100vw-2rem)]"
            id="chatbot-main-container"
          >
            {/* Widget Premium Header */}
            <div className="bg-white dark:bg-[#111] px-5 py-3.5 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 select-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-black dark:bg-[#F0F0EE] rounded-lg flex items-center justify-center font-black text-xs text-white dark:text-black">
                    MØ
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#111] rounded-full" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-tight text-black dark:text-white leading-none">MIDZERO Assistant</h4>
                  <p className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Chatbase AI Active
                  </p>
                </div>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
                {user && (
                  <button 
                    onClick={() => setShowConfig(!showConfig)}
                    className={`p-1.5 hover:text-black dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors ${showConfig ? 'text-black dark:text-white' : ''}`}
                    title="Widget Settings (Admin Only)"
                    id="chatbot-settings-toggle"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1.5 hover:text-black dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors hidden sm:block"
                  title={isMaximized ? "Minimize Viewport" : "Maximize Viewport"}
                  id="chatbot-maximize-toggle"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-black dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Close Chat"
                  id="chatbot-close-btn"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Config Panel overlay inside headers/inputs */}
            <AnimatePresence>
              {showConfig && user && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-[#111] border-b border-zinc-200 dark:border-zinc-800 p-4 font-sans text-xs flex flex-col gap-3 overflow-hidden text-neutral-700 dark:text-neutral-400"
                >
                  <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                    <span className="font-bold text-black dark:text-white flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      Integration Controller
                    </span>
                    <button 
                      onClick={() => setShowConfig(false)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      Close
                    </button>
                  </div>

                  {/* Mode Buttons selection */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Mounting Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 bg-neutral-100 dark:bg-zinc-900 p-1 rounded-md">
                      <button
                        onClick={() => setMode('official')}
                        className={`py-1.5 text-center font-bold rounded-sm transition-all cursor-pointer ${integrationMode === 'official' ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm' : 'text-neutral-500'}`}
                      >
                        Official Embed
                      </button>
                      <button
                        onClick={() => setMode('native')}
                        className={`py-1.5 text-center font-bold rounded-sm transition-all cursor-pointer ${integrationMode === 'native' ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm' : 'text-neutral-500'}`}
                      >
                        Custom API Live
                      </button>
                    </div>
                  </div>

                  {integrationMode === 'native' ? (
                    <div className="flex flex-col gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          API Key (Frontend Secret key override)
                        </label>
                        <input 
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="wrihlrhhuj3jdu9g3hqzm36gzcl..."
                          className="w-full bg-neutral-100 dark:bg-zinc-900 text-neutral-900 dark:text-white border border-zinc-300 dark:border-zinc-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-black dark:focus:border-white font-mono text-[11px]"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <input 
                          type="checkbox"
                          id="use_proxy_chk"
                          checked={useProxy}
                          onChange={(e) => setUseProxy(e.target.checked)}
                          className="rounded text-black accent-black"
                        />
                        <label htmlFor="use_proxy_chk" className="font-medium cursor-pointer">
                          Use node authorization security proxy
                        </label>
                      </div>

                      {useProxy && (
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                            Secure Proxy Route Url
                          </label>
                          <input 
                            type="text"
                            value={proxyUrl}
                            onChange={(e) => setProxyUrl(e.target.value)}
                            className="w-full bg-neutral-100 dark:bg-zinc-900 text-neutral-900 dark:text-white border border-zinc-300 dark:border-zinc-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-black dark:focus:border-white font-mono"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Chatbot Public Id
                        </label>
                        <input 
                          type="text"
                          value={chatbotId}
                          onChange={(e) => setChatbotId(e.target.value)}
                          placeholder="R6w20MElns5JwFniAs9Wb"
                          className="w-full bg-neutral-100 dark:bg-zinc-900 text-neutral-900 dark:text-white border border-zinc-300 dark:border-zinc-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-black dark:focus:border-white font-mono"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        ℹ️ This loads your live chat assistant cleanly inside our beautiful containment box. No API keys are leaked in public code!
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end gap-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                    <button 
                      onClick={clearHistory}
                      className="px-2.5 py-1.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold rounded flex items-center gap-1 hover:bg-red-200 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear History
                    </button>
                    <button 
                      onClick={() => setShowConfig(false)}
                      className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded hover:opacity-90 cursor-pointer"
                    >
                      Save Settings
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Interactive Body Area */}
            <div className="flex-1 relative flex flex-col justify-between overflow-hidden">
              
              {integrationMode === 'official' ? (
                /* OFFICIAL IFRAME INTEGRATION MOUNT */
                <div className="w-full h-full bg-white relative">
                  <iframe
                    src={`https://www.chatbase.co/chatbot-iframe/${chatbotId}`}
                    title="MIDZERO Chatbase Assistant"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full border-none"
                    style={{ minHeight: '400px' }}
                  />
                  
                  {/* Floating instructions hint inside box border */}
                  <div className="absolute top-2 left-2 bg-black/8 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/15 transition-all text-black hover:text-black dark:text-white dark:hover:text-[#F0F0EE] cursor-pointer group"
                       title="Embed Info">
                    <Info className="w-3.5 h-3.5" />
                    <div className="hidden group-hover:block absolute top-7 left-0 bg-neutral-900 border border-zinc-700 text-white dark:bg-[#111] font-sans p-3.5 rounded-lg shadow-xl w-64 z-50 text-xs font-semibold leading-relaxed">
                      💡 Seamless **official embed** requires zero proxy setup or CORS handling, completely secure. Hover to settings if you wish to toggle custom API mode!
                    </div>
                  </div>
                </div>
              ) : (
                /* CUSTOM NATIVE API GRAPHICAL INTERFACE */
                <div className="flex-1 flex flex-col justify-between h-full relative overflow-hidden" id="chatbot-native-ui">
                  
                  {/* Message Container list */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5 leading-relaxed font-sans text-sm select-text">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                      >
                        {/* Avatar/System label */}
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1 px-1">
                          {msg.role === 'user' ? 'YOU' : msg.role === 'assistant' ? 'MIDZERO BOT' : 'SYSTEM STATUS'}
                        </div>

                        {/* Speech Bubble contents */}
                        <div className={`px-4 py-2.5 rounded-2xl border ${
                          msg.role === 'user' 
                            ? 'bg-black text-white border-zinc-900 rounded-tr-none select-text' 
                            : msg.isError 
                              ? 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-900' 
                              : 'bg-white dark:bg-[#111] text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 rounded-tl-none select-text'
                        }`}>
                          {/* Parse bold headers or bullets manually into HTML nicely */}
                          <div className="text-zinc-950 dark:text-zinc-50 whitespace-pre-line text-[13px] leading-relaxed select-text font-normal font-sans">
                            {msg.content}
                          </div>
                        </div>

                        {/* Timestamp label */}
                        <span className="text-[9px] text-zinc-400 mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    ))}

                    {/* Chatbase Typing Simulation loader */}
                    {isLoading && (
                      <div className="self-start flex flex-col items-start max-w-[85%]">
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1 px-1">
                          MIDZERO BOT
                        </div>
                        <div className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-zinc-600 dark:bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-zinc-600 dark:bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-zinc-600 dark:bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    
                    <div ref={messageEndRef} />
                  </div>

                  {/* Input Form Box bottom */}
                  <form 
                    onSubmit={handleSendMessage}
                    className="p-3 bg-white dark:bg-[#111] border-t border-zinc-200 dark:border-zinc-800 flex gap-2"
                  >
                    <input 
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message to the agent..."
                      disabled={isLoading}
                      className="flex-1 bg-neutral-100 dark:bg-zinc-900 text-neutral-900 dark:text-white border border-zinc-300 dark:border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={!inputText.trim() || isLoading}
                      className="w-9 h-9 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-full flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer flex-shrink-0"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            {/* Tiny brand label bottom margins representation */}
            <div className="bg-white dark:bg-[#111] border-t border-zinc-200 dark:border-zinc-800 py-1 text-center text-[9px] text-zinc-400 font-bold tracking-widest uppercase flex items-center justify-center gap-1 select-none">
              <ShieldAlert className="w-3 h-3 text-zinc-400" />
              Chatbase Encryption Enabled.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
