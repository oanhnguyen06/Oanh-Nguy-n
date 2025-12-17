import React from 'react';
import { Lecturer } from '../types';

interface LecturerCardProps {
  lecturer: Lecturer;
  onClick: (lecturer: Lecturer) => void;
}

export const LecturerCard: React.FC<LecturerCardProps> = ({ lecturer, onClick }) => {
  // Determine role based on work history or default
  const role = lecturer.workHistory[0]?.toLowerCase().includes('trưởng khoa') ? 'Trưởng khoa' : 
               lecturer.workHistory[0]?.toLowerCase().includes('phó trưởng khoa') ? 'Phó Trưởng khoa' : 
               lecturer.workHistory[0]?.toLowerCase().includes('giám đốc') ? 'Giảng viên / Giám đốc CTĐT' : 'Giảng viên';

  return (
    <div 
      className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col p-4 h-full group"
      onClick={() => onClick(lecturer)}
    >
      {/* Image Container */}
      <div className="w-[80%] mx-auto aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-sm bg-gray-100">
        <img 
          src={lecturer.image} 
          alt={lecturer.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-center text-center flex-grow">
        <h3 className="text-[16px] font-extrabold text-[#003478] mb-1 leading-tight px-1">
          {lecturer.title ? `${lecturer.title}. ` : ''}{lecturer.name}
        </h3>
        
        <p className="text-[#0066CC] font-bold text-[13px] mb-4 uppercase tracking-wide">
          {role}
        </p>
        
        {/* Department Box - Pushed to bottom */}
        <div className="mt-auto w-full">
          <div className="bg-[#E6F2FF] text-[#004C99] text-[12px] leading-relaxed font-semibold px-3 py-3 rounded-lg flex items-center justify-center min-h-[3.5rem]">
            <span className="line-clamp-2">{lecturer.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
};