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
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col p-5 h-full group items-center text-center"
      onClick={() => onClick(lecturer)}
    >
      <div className="w-[85%] aspect-[4/5] mb-4 overflow-hidden rounded-xl shadow-inner bg-gray-100">
        <img 
          src={lecturer.image} 
          alt={lecturer.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <h3 className="text-[17px] font-extrabold text-[#003478] mb-1.5 leading-snug px-2">
        {lecturer.title ? `${lecturer.title}. ` : ''}{lecturer.name}
      </h3>
      
      <p className="text-[#0066CC] font-bold text-[13px] mb-4 uppercase tracking-wide">
        {role}
      </p>
      
      <div className="mt-auto w-full">
        <div className="bg-[#E6F2FF] text-[#003478] text-[13px] leading-relaxed font-medium px-4 py-3 rounded-lg line-clamp-2 min-h-[4rem] flex items-center justify-center">
          {lecturer.department}
        </div>
      </div>
    </div>
  );
};