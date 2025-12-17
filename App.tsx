import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { LecturerCard } from './components/LecturerCard';
import { Modal } from './components/Modal';
import { ChatWidget } from './components/ChatWidget';
import { Pagination } from './components/Pagination';
import { Lecturer } from './types';
import { api } from './services/api';
import { Filter, Database, Loader2 } from 'lucide-react';

// Updated to 4 per page as per screenshot instructions
const ITEMS_PER_PAGE = 4;

function App() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await api.getLecturers();
        setLecturers(data);
      } catch (e) {
        console.error("Failed to load lecturers", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Automatic Extraction: Dynamically find all unique departments
  const uniqueDepartments = useMemo(() => {
    const depts = new Set(lecturers.map(l => l.department).filter(Boolean));
    return Array.from(depts).sort();
  }, [lecturers]);

  // 3. Filter Logic
  const filteredLecturers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return lecturers.filter(l => {
      const matchesSearch = 
        l.name.toLowerCase().includes(term) ||
        l.department.toLowerCase().includes(term) ||
        l.researchArea.some(r => r.toLowerCase().includes(term));
      
      const matchesDept = selectedDepartment === 'All' || l.department === selectedDepartment;

      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDepartment, lecturers]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredLecturers.length / ITEMS_PER_PAGE);
  const currentLecturers = filteredLecturers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] text-gray-800 font-sans">
      
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Statistics & Intro */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold text-[#003478] mb-1">
            Danh sách giảng viên — Khoa KH&CN Giáo dục
          </h1>
          <p className="text-gray-500 text-[15px]">
            Click vào ảnh hoặc tên để xem chi tiết. Phân trang hiển thị {ITEMS_PER_PAGE} giảng viên / trang.
          </p>
        </div>

        {/* Dynamic Department Filters */}
        {uniqueDepartments.length > 0 && (
          <div className="mb-6 overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex flex-nowrap items-center gap-2">
              <div className="flex items-center gap-2 text-gray-500 mr-2 shrink-0">
                <Filter size={18} />
              </div>
              
              <button
                onClick={() => setSelectedDepartment('All')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedDepartment === 'All'
                    ? 'bg-[#003478] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Tất cả
              </button>

              {uniqueDepartments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-[#003478] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid or Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-500">
            <Loader2 size={48} className="animate-spin mb-4 text-[#003478]" />
            <p>Đang tải dữ liệu từ máy chủ...</p>
          </div>
        ) : currentLecturers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {currentLecturers.map((lecturer) => (
              <LecturerCard 
                key={lecturer.id} 
                lecturer={lecturer} 
                onClick={setSelectedLecturer} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Không tìm thấy giảng viên nào phù hợp với bộ lọc hiện tại.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedDepartment('All');}}
              className="mt-4 text-[#003478] font-medium hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {!isLoading && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>© 2024 BK Lecturer Store. All rights reserved.</p>
        </div>
      </footer>

      {/* Overlays */}
      <Modal 
        lecturer={selectedLecturer} 
        onClose={() => setSelectedLecturer(null)} 
      />

      <ChatWidget />

    </div>
  );
}

export default App;