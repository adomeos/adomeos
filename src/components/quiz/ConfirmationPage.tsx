import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { LeadFormData } from "@/types/quiz";
import { Button } from "@/components/ui/button";

interface ConfirmationPageProps {
  leadData: LeadFormData;
}

export function ConfirmationPage({ leadData }: ConfirmationPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center text-center min-h-[calc(100vh-80px)]"
    >
      {/* WhatsApp Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[120px] h-[120px] mx-auto mb-8 bg-[#25D366]/20 border-2 border-[#25D366] rounded-full flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-14 h-14 fill-[#25D366]">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.div>

      <h1 className="text-3xl md:text-[36px] font-bold leading-tight">C'est bon {leadData.firstName} !</h1>

      <p className="mt-5 text-xl text-muted-foreground leading-relaxed max-w-[480px] mx-auto">
        Ton analyse personnalisée arrive sur <strong className="text-[#25D366]">WhatsApp</strong> dans les prochaines
        minutes.
      </p>

      {/* Video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-10 relative left-1/2 right-1/2 -ml-[40vw] -mr-[40vw] w-[80vw]"
      >
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-border"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/UISHMLnv8FY?rel=0&modestbranding=1&showinfo=0"
            title="Vidéo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </motion.div>

      {/* Big WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <div className="bg-card border border-border rounded-2xl p-8">
          <MessageCircle className="w-10 h-10 text-[#25D366] mx-auto mb-4" />

          <h2 className="text-xl font-semibold mb-3">Ouvre WhatsApp maintenant</h2>

          <p className="text-muted-foreground mb-6 max-w-[360px] mx-auto">
            Tu vas recevoir ton analyse détaillée avec tes patterns, ton angle mort, et pourquoi ça n'a pas marché
            jusqu'ici.
          </p>

          <a
            href="whatsapp://"
            className="inline-flex items-center justify-center w-full max-w-[320px] h-14 text-lg font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl gap-3 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ouvrir WhatsApp
          </a>
        </div>
      </motion.div>

      <p className="mt-6 text-sm text-muted-foreground">Pas reçu ? Vérifie tes messages dans quelques minutes.</p>
    </motion.div>
  );
}
