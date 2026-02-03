import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Layers, Zap, Check, Handshake, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LeadFormData } from '@/types/quiz';

interface CapturePageProps {
  onSubmit: (data: LeadFormData) => void;
}

const resultItems = [
  { 
    icon: AlertCircle, 
    title: 'Ton angle mort',
    text: 'Le truc que tu vois pas, qui sabote tout, et qui explique pourquoi ça rechute à chaque fois.',
    iconColor: 'text-primary'
  },
  { 
    icon: Layers, 
    title: 'Ton pattern dominant',
    text: 'Comment tu fonctionnes vraiment (et pourquoi t\'es en guerre contre toi-même).',
    iconColor: 'text-primary'
  },
  { 
    icon: Zap, 
    title: 'Pourquoi ça n\'a pas marché',
    text: 'Thérapie, dev perso, routines... ce qui manquait à chaque fois.',
    iconColor: 'text-primary'
  },
  { 
    icon: Check, 
    title: 'Dans l\'heure sur WhatsApp.',
    text: 'Basée sur tes réponses + l\'expérience des dizaines de profils similaires qu\'on a accompagnés.',
    iconColor: 'text-success'
  },
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
      className="flex flex-col text-left min-h-[calc(100vh-80px)] pt-8"
    >
      {/* Avant de continuer */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
          Avant de continuer
        </h3>
        
        <p className="text-[15px] leading-relaxed mb-4">
          J'ai créé ce test pour un profil très précis : <strong>les entrepreneurs et investisseurs</strong>. Les mecs qui tournent à 200% en permanence, qui ont "réussi" sur le papier mais qui sentent que quelque chose cloche à l'intérieur.
        </p>
        
        <p className="text-[15px] leading-relaxed text-muted-foreground mb-4">
          Si t'as reconnu des trucs que t'as jamais dit à personne. Des patterns que t'observes depuis des années sans réussir à les changer. <strong className="text-foreground">C'est que t'es au bon endroit.</strong>
        </p>
        
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          On a conçu ces questions pour des mecs comme toi. Ceux qui ont l'impression que personne peut vraiment les aider parce qu'ils sont "trop dans leur tête". On connaît.
        </p>
      </div>

      {/* Ton analyse arrive */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
        Ton analyse arrive.
      </h1>

      {/* Ce que tu vas recevoir */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-5">
          Ce que tu vas recevoir :
        </h3>

        {resultItems.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 py-4 border-b border-border last:border-b-0 last:pb-0 first:pt-0"
          >
            <item.icon className={`w-5 h-5 ${item.iconColor} flex-shrink-0 mt-0.5`} />
            <div>
              <span className="font-semibold">{item.title}</span>
              <span className="text-muted-foreground"> {item.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus */}
      <div className="bg-accent-dim border border-primary/30 rounded-2xl p-5 mb-8 flex items-start gap-3.5">
        <Handshake className="w-6 h-6 text-yellow-500 flex-shrink-0" />
        <p className="text-[15px] leading-relaxed">
          <strong>Bonus :</strong> On bosse qu'avec des entrepreneurs et investisseurs. Si ça matche, tu pourras accéder à un réseau de mecs solides.
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ton prénom
          </label>
          <Input
            type="text"
            placeholder="Comment tu t'appelles ?"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="h-14 text-base bg-card border-border rounded-xl px-[18px] placeholder:text-muted-foreground focus:border-primary focus:bg-hover"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ton email
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
          <label className="block text-sm font-medium text-foreground mb-2">
            Ton WhatsApp
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Recevoir mon analyse
        </Button>
      </form>

      <p className="mt-4 text-sm text-muted-foreground text-center flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" />
        Zéro spam. Juste ton analyse + une question pour voir si je peux t'aider.
      </p>
    </motion.div>
  );
}
