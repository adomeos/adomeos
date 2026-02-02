import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Quote } from 'lucide-react';
import { LeadFormData, Answer } from '@/types/quiz';
import { generateSummary } from '@/utils/generateSummary';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ConfirmationPageProps {
  leadData: LeadFormData;
  answers: Answer[];
}

const steps = [
  { num: 1, text: 'Tu vas recevoir un email avec ton analyse détaillée.', note: 'Vérifie tes spams si tu ne vois rien.' },
  { num: 2, text: 'On te contacte dans les 24h pour un échange.', note: 'Gratuit et sans engagement.' },
  { num: 3, text: 'Tu décides si tu veux aller plus loin.', note: 'À ton rythme.' },
];

export function ConfirmationPage({ leadData, answers }: ConfirmationPageProps) {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAISummary() {
      try {
        const { data, error } = await supabase.functions.invoke('generate-summary', {
          body: { answers, leadData },
        });

        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }

        if (data?.summary) {
          setSummary(data.summary);
        } else {
          throw new Error('No summary returned');
        }
      } catch (err) {
        console.error('Failed to generate AI summary, using fallback:', err);
        // Fallback to rule-based summary
        const fallbackSummary = generateSummary(answers);
        setSummary(fallbackSummary);
        
        // Show toast only for rate limit or payment errors
        if (err instanceof Error && (err.message.includes('429') || err.message.includes('402'))) {
          toast({
            title: "Résumé simplifié",
            description: "Le résumé IA n'est pas disponible pour le moment.",
            variant: "default",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAISummary();
  }, [answers]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center text-center min-h-[calc(100vh-80px)]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[100px] h-[100px] mx-auto mb-8 bg-gradient-to-br from-success/20 to-success/5 border border-success rounded-full flex items-center justify-center"
      >
        <Check className="w-12 h-12 text-success" strokeWidth={2} />
      </motion.div>

      <h1 className="text-3xl md:text-[32px] font-bold leading-tight">
        C'est envoyé, {leadData.firstName} !
      </h1>

      <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-[440px] mx-auto">
        Ton diagnostic est en route vers <strong className="text-foreground">{leadData.email}</strong>.<br />
        Voici la suite du programme.
      </p>

      {/* Summary Box */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-card border border-primary/30 rounded-2xl p-6 text-left min-h-[140px]"
      >
        <h3 className="text-xs font-semibold text-primary mb-4 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Quote className="w-4 h-4" />
          Ce qu'on a compris
        </h3>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </motion.div>
          ) : (
            <motion.p
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[15px] leading-relaxed text-foreground/90 italic"
            >
              "{summary}"
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 bg-card border border-border rounded-2xl p-7 text-left">
        <h3 className="text-sm font-semibold text-primary mb-5 flex items-center gap-2">
          <Clock className="w-[18px] h-[18px]" />
          Prochaines étapes
        </h3>

        {steps.map((step, i) => (
          <div
            key={step.num}
            className="flex gap-4 py-4 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="w-7 h-7 bg-background rounded-lg flex items-center justify-center text-sm font-semibold text-primary font-mono flex-shrink-0">
              {step.num}
            </div>
            <div className="pt-0.5">
              <p className="text-[15px] leading-relaxed">{step.text}</p>
              <span className="text-muted-foreground text-sm">{step.note}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
