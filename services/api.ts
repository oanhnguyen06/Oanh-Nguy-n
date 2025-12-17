import { Lecturer, ChatMessage } from '../types';
import { RAW_CSV_DATA, parseCSV, parseBulletPoints } from '../constants';

// CONFIGURATION
// When your Python FastAPI backend is ready, set this to true
// and update the API_BASE_URL.
const USE_REAL_BACKEND = false;
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * DOCS DATABASE (Provided by User)
 * This acts as the context for the mock RAG (Retrieval Augmented Generation).
 */
const KNOWLEDGE_BASE = `
CHƯƠNG TRÌNH ĐÀO TẠO CỬ NHÂN CÔNG NGHỆ GIÁO DỤC
Hai thập niên gần đây, những tiến bộ trong công nghệ đã thúc đẩy toàn cầu hoá và chuyển đổi số; đồng thời tạo ra nhiều công việc có nhu cầu cao và đòi hỏi học sinh, sinh viên phải có những kỹ năng cần thiết để thành công trong sự nghiệp tương lai. 
Bên cạnh đó, đại dịch COVID-19 vừa diễn ra đã chứng minh tại sao giáo dục trực tuyến nên là một phần quan trọng của việc dạy và học. Bằng việc tích hợp công nghệ vào hoạt động đào tạo hiện có, thay vì chỉ sử dụng nó như một công cụ quản lý khủng hoảng, các cơ sở giáo dục, tổ chức và doanh nghiệp có thể khai thác việc học trực tuyến như một công cụ giáo dục mạnh mẽ. 
MỤC TIÊU CỦA CHƯƠNG TRÌNH ĐÀO TẠO CÔNG NGHỆ GIÁO DỤC:
1. Năng lực thiết kế, phát triển đa phương tiện và thiết bị dạy học hiện đại.
2. Năng lực thiết kế, phát triển các phần mềm giáo dục có tính tương tác ảo (game giáo dục, mô phỏng, VR-AR).
3. Năng lực thiết kế, phát triển các nội dung dạy học số (bài giảng e-learning).
4. Năng lực thiết kế, phát triển các cổng đào tạo trực tuyến; vận hành, quản trị các hệ thống dạy học trực tuyến.
5. Năng lực thiết kế, phát triển các môi trường học tập số.
6. Năng lực nghiên cứu đề xuất, thiết kế và phát triển các giải pháp chuyển đổi số trong giáo dục.
CƠ HỘI NGHỀ NGHIỆP NGÀNH CÔNG NGHỆ GIÁO DỤC:
1. Chuyên viên phân tích nghiệp vụ (Business Analyst) giáo dục.
2. Chuyên viên quản trị hệ thống quản lý học tập (LMS).
3. Chuyên viên thiết kế và sáng tạo nội dung học tập đa phương tiện (videos, VR, AR...).
4. Chuyên viên thiết kế và sáng tạo khoá học số.
5. Chuyên viên thiết kế học liệu theo hướng tiếp cận STEAM/STEM.
6. Kỹ thuật viên quản trị hệ thống dạy học trực tuyến.
TUYỂN SINH CÔNG NGHỆ GIÁO DỤC:
Mã xét tuyển: ED2
Tổ hợp xét tuyển: A00, A01, D01, K01 (Tư duy).

CHƯƠNG TRÌNH ĐÀO TẠO CỬ NHÂN QUẢN LÝ GIÁO DỤC
Ngành Quản lý giáo dục là ngành không thể thiếu trong bối cảnh giáo dục hiện đại, hướng tới đào tạo nguồn nhân lực chuyên nghiệp, chất lượng cao có nền tảng kiến thức vững vàng về khoa học và quản lý giáo dục, kết hợp với kỹ năng số.
MỤC TIÊU CỦA CHƯƠNG TRÌNH ĐÀO TẠO QUẢN LÝ GIÁO DỤC:
1. Kiến thức nền tảng và chuyên môn vững chắc để đáp ứng yêu cầu quản lý giáo dục và quản lý chất lượng.
2. Kỹ năng nghề nghiệp và phẩm chất cá nhân cần thiết.
3. Năng lực hình thành ý tưởng, thiết kế, triển khai và vận hành các dự án quản lý giáo dục.
4. Năng lực dạy học và quản lý các khóa đào tạo tại doanh nghiệp.
CƠ HỘI NGHỀ NGHIỆP NGÀNH QUẢN LÝ GIÁO DỤC:
1. Chuyên viên quản lý hành chính giáo dục tại Bộ GD&ĐT, Sở GD&ĐT...
2. Chuyên viên phụ trách văn hóa, giáo dục tại UBND các cấp.
3. Chuyên viên tại các trung tâm, viện nghiên cứu giáo dục.
4. Chuyên viên hành chính, tài chính, tuyển sinh, truyền thông tại các trường học.
5. Chuyên viên khảo thí, kiểm định chất lượng.
6. Khởi nghiệp cung ứng dịch vụ giáo dục.
TUYỂN SINH QUẢN LÝ GIÁO DỤC:
Mã xét tuyển: ED3
Tổ hợp xét tuyển: A00, A01, D01, K01 (Tư duy).
`;

/**
 * MOCK DATA PARSER
 */
const getMockData = (): Lecturer[] => {
  const rawRows = parseCSV(RAW_CSV_DATA);
  return rawRows.slice(1).map((row) => {
    const getVal = (idx: number) => row[idx] ? row[idx].trim() : '';
    // Fix: Added teachingSubjects field to match Lecturer interface
    return {
      id: parseInt(getVal(0)) || 0,
      name: getVal(1),
      title: getVal(2),
      department: getVal(3),
      email: getVal(4),
      phone: getVal(5),
      image: getVal(6),
      education: parseBulletPoints(getVal(7)),
      workHistory: parseBulletPoints(getVal(8)),
      researchArea: parseBulletPoints(getVal(9)),
      teachingSubjects: parseBulletPoints(getVal(10))
    };
  });
};

export const api = {
  /**
   * Fetches the list of lecturers from the Backend API (Database).
   */
  getLecturers: async (): Promise<Lecturer[]> => {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/lecturers`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error("API Error:", error);
        return [];
      }
    } else {
      // SIMULATION: Simulate network delay then return parsed CSV
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getMockData());
        }, 800);
      });
    }
  },

  /**
   * Sends a chat message to the Backend API (Ollama).
   */
  sendMessage: async (message: string, history: ChatMessage[]): Promise<string> => {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history }),
        });
        const data = await response.json();
        return data.response;
      } catch (error) {
        return "Xin lỗi, không thể kết nối tới máy chủ Chatbot (Ollama).";
      }
    } else {
      // SIMULATION: Simulated RAG (Retrieval Augmented Generation) logic
      // This allows the chatbot to answer based on the provided docs even without a backend.
      return new Promise((resolve) => {
        setTimeout(() => {
          const lowerMsg = message.toLowerCase();
          
          let response = "";

          // Simple Keyword Matching to simulate "Retrieval"
          const isCNGD = lowerMsg.includes('công nghệ') || lowerMsg.includes('cngd');
          const isQLGD = lowerMsg.includes('quản lý') || lowerMsg.includes('qlgd');
          const isJob = lowerMsg.includes('làm gì') || lowerMsg.includes('nghề nghiệp') || lowerMsg.includes('việc làm') || lowerMsg.includes('cơ hội');
          const isAdmission = lowerMsg.includes('tuyển sinh') || lowerMsg.includes('tổ hợp') || lowerMsg.includes('khối') || lowerMsg.includes('thi');
          const isGoal = lowerMsg.includes('mục tiêu') || lowerMsg.includes('học gì');

          if (isCNGD) {
            if (isJob) {
               response += "Cơ hội nghề nghiệp ngành Công nghệ Giáo dục rất rộng mở, bao gồm: \n- Chuyên viên thiết kế nội dung học tập đa phương tiện (Video, VR/AR).\n- Chuyên viên quản trị hệ thống LMS.\n- Chuyên viên thiết kế học liệu STEM/STEAM.\n- Business Analyst trong giáo dục.\n- Làm việc tại các công ty EdTech hoặc trường học.";
            } else if (isAdmission) {
               response += "Ngành Công nghệ Giáo dục xét tuyển với các tổ hợp: A00, A01, D01 và K01 (Bài thi đánh giá tư duy).";
            } else if (isGoal) {
               response += "Mục tiêu ngành là đào tạo năng lực thiết kế phần mềm giáo dục, game, mô phỏng VR/AR, và các giải pháp chuyển đổi số trong giáo dục.";
            } else {
               response += "Chương trình Cử nhân Công nghệ Giáo dục tập trung vào việc tích hợp công nghệ (VR/AR, AI, LMS) vào dạy học. Sinh viên được trang bị năng lực thiết kế sản phẩm giáo dục số và quản trị hệ thống E-learning.";
            }
          } else if (isQLGD) {
             if (isJob) {
               response += "Sinh viên tốt nghiệp Quản lý Giáo dục có thể làm:\n- Chuyên viên quản lý hành chính tại Sở/Bộ GD&ĐT.\n- Chuyên viên khảo thí, kiểm định chất lượng.\n- Quản lý nhân sự, truyền thông, tuyển sinh tại các trường học.\n- Khởi nghiệp dịch vụ giáo dục.";
            } else if (isAdmission) {
               response += "Ngành Quản lý Giáo dục xét tuyển với các tổ hợp: A00, A01, D01 và K01 (Bài thi đánh giá tư duy).";
            } else if (isGoal) {
               response += "Mục tiêu ngành là đào tạo nguồn nhân lực quản lý chuyên nghiệp, có kiến thức về khoa học quản lý kết hợp kỹ năng số, quản lý chất lượng và vận hành dự án giáo dục.";
            } else {
               response += "Chương trình Cử nhân Quản lý Giáo dục hướng tới đào tạo nhân lực quản lý chất lượng cao trong kỷ nguyên số, với định hướng chuyên sâu về Quản lý giáo dục số và Quản lý chất lượng.";
            }
          } else {
            // General fallback
            response = "Tôi có thông tin chi tiết về 2 ngành đào tạo: **Công nghệ Giáo dục** và **Quản lý Giáo dục** (bao gồm cơ hội nghề nghiệp, tuyển sinh, mục tiêu đào tạo). Bạn muốn hỏi cụ thể về ngành nào?";
          }
          
          resolve(response);
        }, 1000);
      });
    }
  }
};