export type QuestionType = 'single' | 'slider' | 'checkbox';

export interface QuestionOption {
  letter: string;
  text: string;
}

export interface Question {
  id: number;
  category: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  sliderMin?: number;
  sliderMax?: number;
  sliderMinLabel?: string;
  sliderMaxLabel?: string;
}

export interface Answer {
  questionId: number;
  value: string | number | string[];
}

export interface LeadFormData {
  firstName: string;
  email: string;
  phone: string;
}
