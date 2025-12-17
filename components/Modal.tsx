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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001530] bg-opacity-60 backdrop-blur-[2px] animate-fade-in font-sans">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#003478] hover:bg-blue-50 p-1 rounded-full transition-colors z-10"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          
          {/* Left Sidebar: Profile */}
          <div className="w-full md:w-[350px] bg-white p-6 md:p-8 flex flex-col md:border-r border-gray-100 shrink-0">
             <div className="w-[80%] md:w-full mx-auto aspect-[3/4] mb-6 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <img 
                  src={lecturer.image} 
                  alt={lecturer.name} 
                  className="w-full h-full object-cover"
                />
            </div>
            
            <h2 className="text-[22px] font-extrabold text-[#003478] mb-1 leading-tight">
              {lecturer.title}. {lecturer.name}
            </h2>
             <p className="text-gray-500 font-medium mb-3 text-[14px]">
                 {lecturer.workHistory[0]?.toLowerCase().includes('trưởng khoa') ? 'Trưởng khoa' : 
                  lecturer.workHistory[0]?.toLowerCase().includes('phó trưởng khoa') ? 'Phó Trưởng khoa' : 'Giảng viên'}
            </p>
            
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6 border-t border-gray-100 pt-3">
                {lecturer.department}
            </p>
            
            <div className="w-full space-y-2.5 mt-auto">
              {lecturer.email && (
                <div className="text-[14px] break-words">
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
          <div className="flex-1 p-6 md:p-10 space-y-8 bg-[#FAFBFC]">
            
            {/* 1. Chuyên môn */}
            {lecturer.researchArea.length > 0 && (
              <section>
                <h3 className="text-[18px] font-extrabold text-[#003478] mb-3 border-b border-gray-200 pb-2">
                    Chuyên môn
                </h3>
                <ul className="space-y-2">
                  {lecturer.researchArea.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#2c3e50] leading-normal text-[15px] items-start">
                      <span className="text-[#003478] font-bold text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 2. Môn giảng dạy */}
            <section>
                <h3 className="text-[18px] font-extrabold text-[#003478] mb-3 border-b border-gray-200 pb-2">
                    Môn giảng dạy
                </h3>
                {lecturer.teachingSubjects.length > 0 ? (
                   <ul className="space-y-2">
                    {lecturer.teachingSubjects.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-[#2c3e50] leading-normal text-[15px] items-start">
                        <span className="text-[#003478] font-bold text-lg leading-none">•</span>
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
                 <h3 className="text-[18px] font-extrabold text-[#003478] mb-3 border-b border-gray-200 pb-2">
                    Quá trình đào tạo
                </h3>
                <ul className="space-y-2">
                  {lecturer.education.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#2c3e50] leading-normal text-[15px] items-start">
                       <span className="text-[#003478] font-bold text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
            {/* 4. Quá trình công tác (Extra) */}
             {lecturer.workHistory.length > 0 && (
              <section>
                 <h3 className="text-[18px] font-extrabold text-[#003478] mb-3 border-b border-gray-200 pb-2">
                    Quá trình công tác
                </h3>
                <ul className="space-y-2">
                  {lecturer.workHistory.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#2c3e50] leading-normal text-[15px] items-start">
                       <span className="text-[#003478] font-bold text-lg leading-none">•</span>
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