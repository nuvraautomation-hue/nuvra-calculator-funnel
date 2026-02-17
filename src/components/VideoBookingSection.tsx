import { motion } from "framer-motion";

const VideoBookingSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-body uppercase tracking-[0.2em] text-primary mb-4 block">
            Prochaine étape
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Analysons ensemble les fuites dans votre entreprise
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto mb-12 leading-relaxed">
            En quelques minutes, nous identifions exactement où votre entreprise
            perd de l'argent et comment y remédier.
          </p>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden mb-16"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7L8 5z" fill="hsl(43 72% 55%)" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-body text-muted-foreground">
              2 min — Diagnostic stratégique
            </span>
          </div>
        </motion.div>

        {/* Calendar placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-px w-full max-w-xs mx-auto line-gold opacity-20 mb-12" />

          <h3 className="font-display text-2xl font-bold mb-4">
            Réservez votre diagnostic gratuit
          </h3>

          {/* Calendar embed placeholder */}
          <div className="rounded-xl border border-border bg-card p-12 mb-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                Intégrez votre calendrier Calendly ou Cal.com ici
              </p>
            </div>
          </div>

          <p className="font-body text-sm text-muted-foreground">
            Cet appel est un{" "}
            <span className="text-foreground font-medium">diagnostic stratégique</span>.
            Aucune obligation.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-24 pt-12 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold text-gradient-gold">
            Nuvra Automation
          </span>
          <span className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nuvra Automation. Tous droits réservés.
          </span>
        </div>
      </div>
    </section>
  );
};

export default VideoBookingSection;
