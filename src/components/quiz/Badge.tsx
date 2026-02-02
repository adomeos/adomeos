import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-accent-dim border border-primary rounded-full text-sm font-medium text-primary font-mono"
    >
      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
      {children}
    </motion.div>
  );
}
