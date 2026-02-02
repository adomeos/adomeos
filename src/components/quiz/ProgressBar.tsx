import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground font-mono">
          Question {current}/{total}
        </span>
        <span className="text-sm text-muted-foreground font-mono">
          {progress}%
        </span>
      </div>
      <div className="h-1 bg-border rounded-sm overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-sm"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
