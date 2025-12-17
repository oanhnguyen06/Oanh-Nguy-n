import React from 'react';
import { Search, GraduationCap } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 font-sans border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <div className="bg-[#B90000] p-1.5 rounded w-10 h-10 flex items-center justify-center text-[#FFD700] shadow-sm shrink-0">
               {/* Using a custom SVG or Lucide icon to mimic the logo */}
              <GraduationCap size={26} strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl text-[#003478] tracking-tighter">BK LECTURER STORE</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2 font-medium text-gray-600">
            <a href="#" className="text-[#0066CC] bg-[#E6F0FF] px-5 py-2 rounded-md text-sm font-bold transition-colors">Trang chủ</a>
            <a href="#" className="hover:text-[#0066CC] hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors">Giảng viên</a>
            <a href="#" className="hover:text-[#0066CC] hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors">Review</a>
            <a href="#" className="hover:text-[#0066CC] hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors">Chatbot</a>
            <a href="#" className="hover:text-[#0066CC] hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors">Liên hệ</a>
          </nav>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="Tìm giảng viên theo tên / lĩnh vực..."
              className="w-full pl-4 pr-12 py-2 bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm text-gray-700 placeholder-gray-400 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-1 top-1 bottom-1 w-8 bg-[#1a73e8] text-white rounded hover:bg-[#1557b0] transition-colors flex items-center justify-center shadow-sm">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};