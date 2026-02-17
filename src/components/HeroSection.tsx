import { motion } from "framer-motion";

const stats = [
  { value: "+40", label: "entreprises accompagnées" },
  { value: "+20%", label: "d'augmentation des conversions" },
  { value: "+10h", label: "récupérées par semaine" },
];

interface HeroSectionProps {
  onCTAClick: () => void;
}

const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Subtle gold gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block text-sm font-body font-medium tracking-[0.2em] uppercase text-primary mb-8">
            Nuvra Automation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
        >
          Combien votre entreprise{" "}
          <span className="text-gradient-gold">perd-elle</span> chaque mois
          sans que vous le réalisiez ?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          La majorité des entreprises de services perdent entre{" "}
          <span className="text-foreground font-medium">10 000$</span> et{" "}
          <span className="text-foreground font-medium">40 000$</span> par mois
          à cause d'appels manqués, d'un suivi inefficace et de processus
          manuels.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={onCTAClick}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-lg hover:brightness-110 transition-all duration-300 glow-gold"
        >
          Calculer ma perte potentielle
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        {/* Credibility bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20"
        >
          <div className="h-px w-full max-w-md mx-auto line-gold opacity-30 mb-10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
