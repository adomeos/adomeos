import { useState, useCallback } from 'react';
import { Answer, LeadFormData } from '@/types/quiz';
import { questions } from '@/data/questions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type QuizStep = 'hook' | 'questions' | 'capture' | 'confirmation';

export function useQuiz() {
  const [step, setStep] = useState<QuizStep>('hook');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [hookAnswer, setHookAnswer] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{ analysis: string; summary: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const submitLead = useCallback(async (data: LeadFormData) => {
    setIsSubmitting(true);
    setLeadData(data);

    try {
      // Convert answers array to object format
      const answersObject: Record<number, string | number | string[]> = {};
      answers.forEach(answer => {
        answersObject[answer.questionId] = answer.value;
      });

      // Call Edge Function
      const { data: result, error } = await supabase.functions.invoke('generate-analysis', {
        body: { 
          firstname: data.firstName,
          email: data.email,
          phone: data.phone,
          answers: answersObject
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (result?.success) {
        setAnalysisResult({ 
          analysis: result.analysis, 
          summary: result.summary 
        });
      } else {
        throw new Error(result?.error || 'No analysis returned');
      }

      setStep('confirmation');
    } catch (err) {
      console.error('Failed to submit:', err);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Réessaie dans quelques instants.",
        variant: "destructive",
      });
      // Still go to confirmation but without AI results
      setStep('confirmation');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  const reset = useCallback(() => {
    setStep('hook');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setHookAnswer(null);
    setLeadData(null);
    setAnalysisResult(null);
    setIsSubmitting(false);
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
    analysisResult,
    isSubmitting,
    startQuiz,
    answerQuestion,
    submitLead,
    reset,
  };
}
