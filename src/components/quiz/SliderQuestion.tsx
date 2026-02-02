import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SliderQuestionProps {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  onSubmit: (value: number) => void;
}

export function SliderQuestion({ min, max, minLabel, maxLabel, onSubmit }: SliderQuestionProps) {
  const [value, setValue] = useState(5);

  return (
    <div className="py-5">
      <div className="flex justify-between mb-5 text-sm text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      
      <div className="py-5">
        <Slider
          value={[value]}
          onValueChange={([v]) => setValue(v)}
          min={min}
          max={max}
          step={1}
          className="w-full"
        />
      </div>
      
      <motion.div
        key={value}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mt-6"
      >
        <span className="text-5xl font-bold text-primary font-mono">{value}</span>
        <span className="text-lg text-muted-foreground font-mono">/10</span>
      </motion.div>
      
      <Button
        onClick={() => onSubmit(value)}
        className="w-full mt-8 py-6 text-base font-semibold rounded-xl"
      >
        Continuer
      </Button>
    </div>
  );
}
