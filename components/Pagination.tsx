import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#003478] disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 flex items-center justify-center rounded text-sm font-bold transition-all shadow-sm ${
            currentPage === page
              ? 'bg-[#1a73e8] text-white border border-[#1a73e8]'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:text-[#003478]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#003478] disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};