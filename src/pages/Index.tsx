import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, Clock, TrendingUp } from "lucide-react";
import nuvraLogo from "@/assets/nuvra-logo.png";

const steps = [
  {
    question: "Quels sont vos revenus mensuels ?",
    options: [
      { label: "Moins de 20 000$", value: 15000 },
      { label: "20 000$ – 50 000$", value: 35000 },
      { label: "50 000$ – 100 000$", value: 75000 },
      { label: "Plus de 100 000$", value: 150000 },
    ],
  },
  {
    question: "Combien d'employés avez-vous ?",
    options: [
      { label: "1 – 3", value: 2 },
      { label: "4 – 10", value: 7 },
      { label: "11 – 25", value: 18 },
      { label: "25+", value: 35 },
    ],
  },
  {
    question: "Appels manqués par jour ?",
    options: [
      { label: "1 – 3", value: 2 },
      { label: "4 – 8", value: 6 },
      { label: "9 – 15", value: 12 },
      { label: "15+", value: 20 },
    ],
  },
  {
    question: "Automatisations en place ?",
    options: [
      { label: "Aucune", value: 1 },
      { label: "Partielle", value: 0.65 },
      { label: "Avancée", value: 0.3 },
    ],
  },
];

const trustBadges = [
  { icon: Shield, text: "Gratuit & confidentiel" },
  { icon: Clock, text: "Résultat en 30 sec" },
  { icon: TrendingUp, text: "+40 entreprises analysées" },
];

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (value: number) => {
    const newAnswers = [...answers, value];
    if (step < steps.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const params = new URLSearchParams({
        r: String(newAnswers[0]),
        e: String(newAnswers[1]),
        c: String(newAnswers[2]),
        a: String(value),
      });
      navigate(`/resultats?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setAnswers(answers.slice(0, -1));
      setStep(step - 1);
    }
  };

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-dark/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />

      {/* Header with logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-6 pb-2 px-6 flex items-center justify-center gap-2.5"
      >
        <img src={nuvraLogo} alt="Nuvra" className="w-12 h-12 object-contain" />
        <span className="text-sm font-body font-semibold tracking-[0.15em] uppercase text-gradient-gold">
          Nuvra
        </span>
      </motion.div>

      {/* Main content - vertically centered */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8 max-w-lg mx-auto w-full">
        {/* Hero content - only on first step */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="pb-8 text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
              >
                Combien <span className="text-gradient-gold">perdez-vous</span> chaque mois ?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-5"
              >
                La plupart des entreprises de services perdent entre 10 000$ et 40 000$/mois sans le savoir.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex items-center justify-center gap-4 sm:gap-6"
              >
                {trustBadges.map((badge, i) => (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-1.5 text-[10px] sm:text-xs font-body text-muted-foreground"
                  >
                    <badge.icon className="w-3 h-3 text-primary/70" />
                    <span>{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back button for steps > 0 */}
        <AnimatePresence>
          {step > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors mb-6 self-start"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour
            </motion.button>
          )}
        </AnimatePresence>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 flex-1 rounded-full bg-secondary overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="text-xs font-body uppercase tracking-[0.15em] text-muted-foreground mb-2">
              Étape {step + 1} sur {steps.length}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-6">
              {current.question}
            </h2>

            <div className="grid gap-3">
              {current.options.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => handleSelect(opt.value)}
                  className="group w-full text-left px-5 py-4 rounded-xl border border-border bg-card font-body text-sm sm:text-base text-card-foreground hover:border-primary/60 hover:bg-card/80 hover:glow-gold active:scale-[0.97] transition-all duration-200 flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <span className="text-primary/0 group-hover:text-primary/60 transition-colors text-lg">→</span>
                </motion.button>
              ))}
            </div>

            {isLast && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-xs text-primary/70 mt-6 font-body"
              >
                Cliquez pour voir vos résultats →
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer trust line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-4 text-center"
      >
        <p className="text-[10px] font-body text-muted-foreground/50">
          🔒 Vos données restent confidentielles et ne sont jamais partagées.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
