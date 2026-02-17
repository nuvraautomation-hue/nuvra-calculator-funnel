import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CalculatorProps {
  onComplete: () => void;
}

const steps = [
  {
    question: "Quels sont vos revenus mensuels approximatifs ?",
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
    question: "Combien d'appels manqués estimez-vous par jour ?",
    options: [
      { label: "1 – 3 appels", value: 2 },
      { label: "4 – 8 appels", value: 6 },
      { label: "9 – 15 appels", value: 12 },
      { label: "Plus de 15", value: 20 },
    ],
  },
  {
    question: "Utilisez-vous des automatisations actuellement ?",
    options: [
      { label: "Aucune", value: 1 },
      { label: "Partielle", value: 0.65 },
      { label: "Avancée", value: 0.3 },
    ],
  },
];

function calculateLoss(answers: number[]) {
  const revenue = answers[0];
  const employees = answers[1];
  const missedCalls = answers[2];
  const autoMultiplier = answers[3];

  const lostOpportunities = missedCalls * 30 * (revenue / 1000) * 0.15;
  const unproductiveTime = employees * 8 * 22 * 0.12 * 35;
  const noFollowUp = revenue * 0.08;

  const total = Math.round((lostOpportunities + unproductiveTime + noFollowUp) * autoMultiplier);

  return {
    total,
    opportunities: Math.round(lostOpportunities * autoMultiplier),
    time: Math.round(unproductiveTime * autoMultiplier),
    followUp: Math.round(noFollowUp * autoMultiplier),
  };
}

const CalculatorSection = ({ onComplete }: CalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ total: 0, opportunities: 0, time: 0, followUp: 0 });

  const handleSelect = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const loss = calculateLoss(newAnswers);
      setResult(loss);
      setShowResult(true);
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

  return (
    <section id="calculator" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-2 mb-12">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= currentStep ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                Étape {currentStep + 1} / {steps.length}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10">
                {steps[currentStep].question}
              </h2>

              <div className="grid gap-3">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option.value)}
                    className="w-full text-left px-6 py-4 rounded-lg border border-border bg-card font-body text-base text-card-foreground hover:border-primary/50 hover:bg-secondary transition-all duration-200"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-6 block">
                Estimation de vos pertes mensuelles
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="my-8"
              >
                <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-gradient-gold">
                  {formatCurrency(result.total)}
                </span>
                <span className="block text-muted-foreground font-body text-lg mt-2">par mois</span>
              </motion.div>

              <p className="font-body text-muted-foreground text-base max-w-lg mx-auto mb-10 leading-relaxed">
                Ce montant représente les opportunités manquées liées aux appels
                non traités, aux suivis inexistants et au temps gaspillé en
                tâches manuelles.
              </p>

              {/* Breakdown */}
              <div className="grid gap-4 mb-12 text-left">
                {[
                  { label: "Opportunités perdues", value: result.opportunities },
                  { label: "Temps improductif", value: result.time },
                  { label: "Manque de relance automatisée", value: result.followUp },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-6 py-4 rounded-lg bg-card border border-border"
                  >
                    <span className="font-body text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-display text-lg font-semibold text-foreground">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={onComplete}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-lg hover:brightness-110 transition-all duration-300 glow-gold"
              >
                Voir comment corriger ces pertes
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CalculatorSection;
