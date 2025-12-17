export interface Lecturer {
  id: number;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  education: string[];
  workHistory: string[];
  researchArea: string[];
  teachingSubjects: string[];
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}