import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { OptionButton } from './OptionButton';
import { SocialProof } from './SocialProof';
import { hookQuestion } from '@/data/questions';

interface HookPageProps {
  onStart: (answer: string) => void;
}

export function HookPage({ onStart }: HookPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center text-center min-h-[calc(100vh-80px)] pt-16"
    >
      <Badge>Diagnostic en 3 min</Badge>

      <h1 className="mt-8 text-4xl md:text-5xl font-bold leading-tight tracking-tight">
        Tu performes.<br />
        Mais à quel <span className="text-primary">prix</span> ?
      </h1>

      <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
        Ce diagnostic va te montrer ce que tu refuses de voir — et pourquoi tout ce que t'as essayé n'a pas marché.
      </p>

      <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-left">
        <div className="text-xs font-semibold text-primary uppercase tracking-widest font-mono mb-4">
          {hookQuestion.label}
        </div>
        <div className="text-[22px] font-semibold leading-snug mb-7">
          {hookQuestion.text}
        </div>

        <div className="flex flex-col gap-3">
          {hookQuestion.options.map((option) => (
            <OptionButton
              key={option.letter}
              letter={option.letter}
              text={option.text}
              onClick={() => onStart(option.letter)}
              variant="hook"
            />
          ))}
        </div>
      </div>

      <SocialProof />
    </motion.div>
  );
}
