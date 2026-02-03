import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function LoadingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 className="w-12 h-12 text-primary" />
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-3">
        Analyse en cours...
      </h2>
      
      <p className="text-muted-foreground max-w-sm">
        On génère ton diagnostic personnalisé. Ça prend quelques secondes.
      </p>
    </motion.div>
  );
}
