import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxOptionProps {
  text: string;
  checked: boolean;
  onClick: () => void;
}

export function CheckboxOption({ text, checked, onClick }: CheckboxOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 w-full text-left p-[18px] bg-card border border-border rounded-xl transition-all duration-200",
        checked ? "border-primary bg-accent-dim" : "hover:border-muted-foreground"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-[22px] h-[22px] flex items-center justify-center border-2 rounded-md transition-all duration-200",
          checked ? "bg-primary border-primary" : "border-border"
        )}
      >
        <Check
          className={cn(
            "w-3.5 h-3.5 text-white transition-opacity duration-200",
            checked ? "opacity-100" : "opacity-0"
          )}
          strokeWidth={3}
        />
      </div>
      <span className="text-[15px] leading-relaxed">{text}</span>
    </motion.button>
  );
}
