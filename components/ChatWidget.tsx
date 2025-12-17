import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2, Bot, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { api } from '../services/api';

interface ChatWidgetProps {}

export const ChatWidget: React.FC<ChatWidgetProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Chào bạn! Tôi là trợ lý ảo của BK Lecturer Store. Bạn cần tìm hiểu thông tin về giảng viên nào hoặc ngành học nào?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await api.sendMessage(userMsg.text, messages);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ.",
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] md:w-[380px] h-[520px] rounded-t-xl rounded-bl-xl shadow-2xl flex flex-col overflow-hidden mb-3 border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-[#1a73e8] px-4 py-3 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 p-1.5 rounded-lg">
                  <Bot size={22} />
              </div>
              <div className="leading-tight">
                <h3 className="font-bold text-[15px]">BOXFED</h3>
                <p className="text-[11px] text-blue-100 opacity-90">Trợ lý ảo BK Lecturer (Ollama)</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa] scrollbar-hide">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#1a73e8] text-white rounded-br-none' 
                      : 'bg-white text-[#1f1f1f] border border-gray-200 rounded-bl-none'
                  } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                  <Loader2 className="animate-spin text-[#1a73e8]" size={18} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="relative flex items-center bg-[#F1F3F4] rounded-full">
              <input
                type="text"
                className="w-full bg-transparent text-gray-800 rounded-full pl-5 pr-12 py-3 text-[14px] focus:outline-none placeholder-gray-500"
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button 
                className={`absolute right-1.5 p-2 rounded-full transition-all ${
                  inputValue.trim() ? 'text-[#1a73e8] hover:bg-white shadow-sm' : 'text-gray-400'
                }`}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send size={18} fill={inputValue.trim() ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-3 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2.5 font-bold text-[15px] transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquare size={20} fill="currentColor" />
          Trợ lý
        </button>
      )}
    </div>
  );
};