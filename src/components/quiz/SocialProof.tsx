import { motion } from 'framer-motion';

const avatars = ['J', 'M', 'A', 'L'];

export function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-border"
    >
      <div className="flex">
        {avatars.map((initial, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-muted to-muted-foreground/30 flex items-center justify-center text-sm font-medium"
            style={{ marginLeft: i > 0 ? '-10px' : 0 }}
          >
            {initial}
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        <strong className="text-foreground">847 personnes</strong> ont fait ce diagnostic ce mois-ci
      </p>
    </motion.div>
  );
}
