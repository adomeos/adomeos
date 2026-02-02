import { useState, useCallback } from 'react';
import { Answer, LeadFormData } from '@/types/quiz';
import { questions } from '@/data/questions';

export type QuizStep = 'hook' | 'questions' | 'capture' | 'confirmation';

export function useQuiz() {
  const [step, setStep] = useState<QuizStep>('hook');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [hookAnswer, setHookAnswer] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);

  const totalQuestions = questions.length + 1; // +1 for hook question
  const progress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const currentQuestion = questions[currentQuestionIndex];

  const startQuiz = useCallback((answer: string) => {
    setHookAnswer(answer);
    setAnswers([{ questionId: 1, value: answer }]);
    setStep('questions');
  }, []);

  const answerQuestion = useCallback((value: string | number | string[]) => {
    setAnswers(prev => [...prev, { questionId: currentQuestion.id, value }]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('capture');
    }
  }, [currentQuestionIndex, currentQuestion?.id]);

  const submitLead = useCallback((data: LeadFormData) => {
    setLeadData(data);
    setStep('confirmation');
  }, []);

  const reset = useCallback(() => {
    setStep('hook');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setHookAnswer(null);
    setLeadData(null);
  }, []);

  return {
    step,
    currentQuestionIndex,
    currentQuestion,
    answers,
    hookAnswer,
    leadData,
    progress,
    totalQuestions,
    startQuiz,
    answerQuestion,
    submitLead,
    reset,
  };
}
