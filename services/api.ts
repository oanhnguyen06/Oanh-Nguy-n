import { Lecturer, ChatMessage } from '../types';

// CONFIGURATION
// We toggle this to TRUE to fetch from the Python `server.py`
const USE_REAL_BACKEND = true;
const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  /**
   * Fetches the list of lecturers.
   * Logic: If USE_REAL_BACKEND is true, fetches from Python server (which reads data.csv).
   */
  getLecturers: async (): Promise<Lecturer[]> => {
    try {
      if (USE_REAL_BACKEND) {
        const response = await fetch(`${API_BASE_URL}/lecturers`);
        if (!response.ok) {
           throw new Error('Server not reachable');
        }
        return await response.json();
      } else {
        // Fallback or old mock logic could go here if needed
        return [];
      }
    } catch (error) {
      console.error("API Connection Error:", error);
      // Return empty array so app doesn't crash, but shows empty state
      return [];
    }
  },

  /**
   * Sends a chat message.
   * Logic: Sends message to Python server -> Python reads knowledge.txt -> Python calls Ollama -> Returns text.
   */
  sendMessage: async (message: string, history: ChatMessage[]): Promise<string> => {
    try {
      if (USE_REAL_BACKEND) {
        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history }),
        });
        
        if (!response.ok) {
           return "Xin lỗi, máy chủ đang gặp sự cố.";
        }
        
        const data = await response.json();
        return data.response;
      } else {
         return "Chế độ offline chưa được cấu hình.";
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      return "Xin lỗi, không thể kết nối tới máy chủ Chatbot (Ollama). Hãy đảm bảo bạn đã chạy 'python server.py'.";
    }
  }
};