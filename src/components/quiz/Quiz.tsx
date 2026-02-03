import { AnimatePresence } from 'framer-motion';
import { useQuiz } from '@/hooks/useQuiz';
import { HookPage } from './HookPage';
import { QuestionPage } from './QuestionPage';
import { CapturePage } from './CapturePage';
import { ConfirmationPage } from './ConfirmationPage';
import { LoadingPage } from './LoadingPage';

export function Quiz() {
  const {
    step,
    currentQuestionIndex,
    currentQuestion,
    answers,
    leadData,
    progress,
    totalQuestions,
    analysisResult,
    isSubmitting,
    startQuiz,
    answerQuestion,
    submitLead,
  } = useQuiz();

  return (
    <div className="container max-w-[680px] min-h-screen flex flex-col px-6 py-10">
      <AnimatePresence mode="wait">
        {step === 'hook' && <HookPage key="hook" onStart={startQuiz} />}
        
        {step === 'questions' && currentQuestion && (
          <QuestionPage
            key={`question-${currentQuestion.id}`}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 2}
            totalQuestions={totalQuestions}
            progress={progress}
            onAnswer={answerQuestion}
          />
        )}
        
        {step === 'capture' && (
          isSubmitting ? (
            <LoadingPage key="loading" />
          ) : (
            <CapturePage key="capture" onSubmit={submitLead} />
          )
        )}
        
        {step === 'confirmation' && leadData && (
          <ConfirmationPage 
            key="confirmation" 
            leadData={leadData} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
