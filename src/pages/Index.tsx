import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-gold-dark/[0.03] blur-[80px] pointer-events-none" />

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

      {/* Hero content - only on first step */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="px-6 pt-6 pb-6 text-center"
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
              className="font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6"
            >
              La plupart des entreprises de services perdent entre 10 000$ et 40 000$/mois sans le savoir.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center justify-center gap-5 sm:gap-6 text-xs font-body text-muted-foreground"
            >
              <span><span className="text-primary font-semibold">+40</span> entreprises</span>
              <span className="w-px h-3 bg-primary/20" />
              <span><span className="text-primary font-semibold">+20%</span> conversions</span>
              <span className="w-px h-3 bg-primary/20" />
              <span><span className="text-primary font-semibold">+10h</span>/sem</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculator */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12 max-w-lg mx-auto w-full">
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
              {step + 1} / {steps.length}
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
                  className="w-full text-left px-5 py-4 rounded-xl border border-border bg-card font-body text-sm sm:text-base text-card-foreground hover:border-primary/60 hover:glow-gold active:scale-[0.97] transition-all duration-200"
                >
                  {opt.label}
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
    </div>
  );
};

export default Index;
