import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import { OptionButton } from './OptionButton';
import { CheckboxOption } from './CheckboxOption';
import { SliderQuestion } from './SliderQuestion';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/quiz';
import { quoteForQuestion13 } from '@/data/questions';

interface QuestionPageProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (value: string | number | string[]) => void;
}

export function QuestionPage({
  question,
  questionNumber,
  totalQuestions,
  progress,
  onAnswer,
}: QuestionPageProps) {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxToggle = (text: string) => {
    setSelectedCheckboxes(prev =>
      prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]
    );
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-10"
    >
      <ProgressBar
        current={questionNumber}
        total={totalQuestions}
        progress={progress}
      />

      <div className="text-xs font-semibold text-primary uppercase tracking-widest font-mono mb-4">
        {question.category}
      </div>

      <div className="text-2xl md:text-[28px] font-semibold leading-snug mb-9">
        {question.text}
        {question.id === 13 && (
          <p className="mt-6 text-lg italic text-muted-foreground font-normal">
            {quoteForQuestion13}
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {question.type === 'single' && question.options && (
          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <OptionButton
                key={option.letter}
                letter={option.letter}
                text={option.text}
                onClick={() => onAnswer(option.letter)}
              />
            ))}
          </div>
        )}

        {question.type === 'slider' && (
          <SliderQuestion
            min={question.sliderMin!}
            max={question.sliderMax!}
            minLabel={question.sliderMinLabel!}
            maxLabel={question.sliderMaxLabel!}
            onSubmit={onAnswer}
          />
        )}

        {question.type === 'checkbox' && question.options && (
          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <CheckboxOption
                key={option.letter}
                text={option.text}
                checked={selectedCheckboxes.includes(option.text)}
                onClick={() => handleCheckboxToggle(option.text)}
              />
            ))}
            <Button
              onClick={() => onAnswer(selectedCheckboxes)}
              disabled={selectedCheckboxes.length === 0}
              className="w-full mt-6 py-6 text-base font-semibold rounded-xl"
            >
              Continuer
            </Button>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
