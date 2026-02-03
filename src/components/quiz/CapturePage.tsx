import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Brain, Shield, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LeadFormData } from '@/types/quiz';

interface CapturePageProps {
  onSubmit: (data: LeadFormData) => void;
}

const resultItems = [
  { icon: Target, text: 'Un état des lieux de ce qui se passe vraiment en toi' },
  { icon: Brain, text: 'Les schémas qui t\'empêchent d\'avancer' },
  { icon: Shield, text: 'Des pistes concrètes pour sortir du cycle' },
];

export function CapturePage({ onSubmit }: CapturePageProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center text-center min-h-[calc(100vh-80px)] pt-16"
    >
      <div className="w-20 h-20 mx-auto mb-8 bg-accent-dim border border-primary rounded-2xl flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Tes résultats sont prêts.
      </h1>

      <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-[480px] mx-auto">
        On a analysé tes réponses. Laisse-nous tes coordonnées pour recevoir ton diagnostic personnalisé.
      </p>

      <div className="mt-10 bg-card border border-border rounded-2xl p-7 text-left">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-5">
          Tu vas découvrir
        </h3>

        {resultItems.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 py-3.5 border-b border-border last:border-b-0 last:pb-0 first:pt-0"
          >
            <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
            <span className="text-[15px] leading-relaxed">{item.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 text-left space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Prénom
          </label>
          <Input
            type="text"
            placeholder="Ton prénom"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="h-14 text-base bg-card border-border rounded-xl px-[18px] placeholder:text-muted-foreground focus:border-primary focus:bg-hover"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="ton@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-14 text-base bg-card border-border rounded-xl px-[18px] placeholder:text-muted-foreground focus:border-primary focus:bg-hover"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Téléphone (optionnel)
          </label>
          <div className="flex gap-3">
            <div className="w-20 h-14 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground flex-shrink-0">
              +33
            </div>
            <Input
              type="tel"
              placeholder="6 12 34 56 78"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 text-base bg-card border-border rounded-xl px-[18px] placeholder:text-muted-foreground focus:border-primary focus:bg-hover"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 mt-6 text-[17px] font-semibold rounded-xl gap-2.5"
        >
          Recevoir mon diagnostic
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      <p className="mt-4 text-sm text-muted-foreground text-center flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" />
        Tes données restent confidentielles. Pas de spam.
      </p>
    </motion.div>
  );
}
