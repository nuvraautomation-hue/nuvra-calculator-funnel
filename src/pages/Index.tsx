import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
      // Navigate to results page with data
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
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 text-center">
        <span className="text-xs font-body font-medium tracking-[0.2em] uppercase text-primary">
          Nuvra Automation
        </span>
      </div>

      {/* Hero content - only on first step */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-6 pt-4 pb-6 text-center"
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Combien <span className="text-gradient-gold">perdez-vous</span> chaque mois ?
            </h1>
            <p className="font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6">
              La plupart des entreprises de services perdent entre 10 000$ et 40 000$/mois sans le savoir.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs font-body text-muted-foreground">
              <span><span className="text-primary font-semibold">+40</span> entreprises</span>
              <span className="w-px h-3 bg-border" />
              <span><span className="text-primary font-semibold">+20%</span> conversions</span>
              <span className="w-px h-3 bg-border" />
              <span><span className="text-primary font-semibold">+10h</span>/semaine</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculator */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12 max-w-lg mx-auto w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-body uppercase tracking-[0.15em] text-muted-foreground mb-2">
              {step + 1} / {steps.length}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-6">
              {current.question}
            </h2>

            <div className="grid gap-3">
              {current.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-border bg-card font-body text-sm sm:text-base text-card-foreground hover:border-primary/50 active:scale-[0.98] transition-all duration-150"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {isLast && (
              <p className="text-center text-xs text-muted-foreground mt-6 font-body">
                Cliquez pour voir vos résultats →
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
