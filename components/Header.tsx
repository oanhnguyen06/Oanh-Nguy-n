import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 font-sans border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3 select-none cursor-pointer">
            {/* Simulated BK Logo */}
            <div className="bg-[#B90000] w-10 h-14 flex flex-col items-center justify-center shadow-sm shrink-0 relative overflow-hidden">
               <div className="text-[#FFD700] font-serif font-bold text-xs transform -translate-y-1">BK</div>
               <div className="absolute bottom-1 w-6 h-6 border-2 border-[#FFD700] rounded-full opacity-80 transform translate-y-2"></div>
               <div className="absolute top-8 w-0.5 h-4 bg-[#FFD700]"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[20px] text-[#003478] leading-none tracking-tight">BK LECTURER STORE</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-gray-600">
            <a href="#" className="text-[#0056b3] bg-[#E6F0FF] px-4 py-2 rounded-md text-[14px] font-bold transition-colors">Trang chủ</a>
            <a href="#" className="hover:text-[#0056b3] hover:bg-gray-50 px-4 py-2 rounded-md text-[14px] transition-colors">Giảng viên</a>
            <a href="#" className="hover:text-[#0056b3] hover:bg-gray-50 px-4 py-2 rounded-md text-[14px] transition-colors">Review</a>
            <a href="#" className="hover:text-[#0056b3] hover:bg-gray-50 px-4 py-2 rounded-md text-[14px] transition-colors">Chatbot</a>
            <a href="#" className="hover:text-[#0056b3] hover:bg-gray-50 px-4 py-2 rounded-md text-[14px] transition-colors">Liên hệ</a>
          </nav>

          {/* Search Bar */}
          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              placeholder="Tìm giảng viên theo tên / lĩnh vực..."
              className="w-full pl-4 pr-10 py-2 bg-[#F0F2F5] border border-transparent focus:bg-white focus:border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-[13px] text-gray-700 placeholder-gray-400 transition-all h-[40px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-1 top-1 bottom-1 w-9 bg-[#1a73e8] text-white rounded-md hover:bg-[#1557b0] transition-colors flex items-center justify-center shadow-sm">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};