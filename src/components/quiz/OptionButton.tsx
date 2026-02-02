import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptionButtonProps {
  letter: string;
  text: string;
  selected?: boolean;
  onClick: () => void;
  variant?: 'default' | 'hook';
}

export function OptionButton({ letter, text, selected, onClick, variant = 'default' }: OptionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "flex items-start gap-4 w-full text-left transition-all duration-200",
        variant === 'hook' 
          ? "p-[18px] bg-background border border-border rounded-xl hover:border-muted-foreground hover:bg-hover"
          : "p-5 bg-card border border-border rounded-xl hover:border-primary hover:bg-hover",
        selected && "border-primary bg-accent-dim"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold font-mono transition-all duration-200",
          variant === 'hook' ? "w-8 h-8 text-muted-foreground bg-hover" : "text-muted-foreground bg-background",
          (selected) && "bg-primary text-primary-foreground"
        )}
      >
        {letter}
      </div>
      <span className={cn(
        "text-[15px] leading-relaxed pt-0.5",
        variant === 'hook' && "text-foreground"
      )}>
        {text}
      </span>
    </motion.button>
  );
}
