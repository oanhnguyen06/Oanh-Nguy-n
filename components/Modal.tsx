import React from 'react';
import { X } from 'lucide-react';
import { Lecturer } from '../types';

interface ModalProps {
  lecturer: Lecturer | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ lecturer, onClose }) => {
  if (!lecturer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001530] bg-opacity-70 backdrop-blur-[2px] animate-fade-in font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-[#003478] hover:bg-blue-50 rounded-full transition-all z-10"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          
          {/* Left Sidebar: Profile */}
          <div className="w-full md:w-[32%] bg-white p-6 md:p-8 flex flex-col md:border-r border-gray-100 shrink-0">
             <div className="w-full aspect-[4/5] mb-5 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <img 
                  src={lecturer.image} 
                  alt={lecturer.name} 
                  className="w-full h-full object-cover"
                />
            </div>
            
            <h2 className="text-2xl font-extrabold text-[#003478] mb-1 leading-tight">
              {lecturer.title}. {lecturer.name}
            </h2>
            
            {/* Role */}
            <p className="text-gray-500 font-medium mb-2 text-sm">
                 {lecturer.workHistory[0]?.toLowerCase().includes('trưởng khoa') ? 'Trưởng khoa' : 
                  lecturer.workHistory[0]?.toLowerCase().includes('phó trưởng khoa') ? 'Phó Trưởng khoa' : 'Giảng viên'}
            </p>
            
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
                {lecturer.department}
            </p>
            
            <div className="w-full space-y-3 mt-auto">
              {lecturer.email && (
                <div className="text-[14px]">
                    <span className="font-bold text-[#003478]">Email: </span>
                    <a href={`mailto:${lecturer.email}`} className="text-gray-700 hover:text-blue-600 transition-colors">{lecturer.email}</a>
                </div>
              )}
              {lecturer.phone && (
                <div className="text-[14px]">
                    <span className="font-bold text-[#003478]">Điện thoại: </span>
                    <span className="text-gray-700">{lecturer.phone}</span>
                </div>
              )}
               <div className="text-[14px]">
                    <span className="font-bold text-[#003478]">Văn phòng: </span>
                    <span className="text-gray-500 italic">(đang cập nhật)</span>
                </div>
            </div>
          </div>

          {/* Right Content: Details */}
          <div className="w-full md:w-[68%] p-6 md:p-8 space-y-8 bg-white">
            
            {/* 1. Chuyên môn */}
            {lecturer.researchArea.length > 0 && (
              <section>
                <h3 className="text-[18px] font-extrabold text-[#003478] mb-3">
                    Chuyên môn
                </h3>
                <ul className="space-y-1.5">
                  {lecturer.researchArea.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-[#2c3e50] leading-snug text-[15px]">
                      <span className="text-[#003478] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 2. Môn giảng dạy */}
            <section>
                <h3 className="text-[18px] font-extrabold text-[#003478] mb-3">
                    Môn giảng dạy
                </h3>
                {lecturer.teachingSubjects.length > 0 ? (
                   <ul className="space-y-1.5">
                    {lecturer.teachingSubjects.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-[#2c3e50] leading-snug text-[15px]">
                        <span className="text-[#003478] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500 italic text-[15px]">
                    (Thông tin đang cập nhật)
                  </div>
                )}
            </section>

             {/* 3. Quá trình đào tạo */}
             {lecturer.education.length > 0 && (
              <section>
                 <h3 className="text-[18px] font-extrabold text-[#003478] mb-3">
                    Quá trình đào tạo
                </h3>
                <ul className="space-y-1.5">
                  {lecturer.education.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-[#2c3e50] leading-snug text-[15px]">
                       <span className="text-[#003478] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
            {/* 4. Quá trình công tác (Extra) */}
             {lecturer.workHistory.length > 0 && (
              <section>
                 <h3 className="text-[18px] font-extrabold text-[#003478] mb-3">
                    Quá trình công tác
                </h3>
                <ul className="space-y-1.5">
                  {lecturer.workHistory.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-[#2c3e50] leading-snug text-[15px]">
                       <span className="text-[#003478] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};