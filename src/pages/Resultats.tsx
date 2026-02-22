import { useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, RefreshCw, CalendarCheck, X, ArrowRight, CheckCircle2 } from "lucide-react";
import nuvraLogo from "@/assets/nuvra-logo.png";

function calculateLoss(r: number, e: number, c: number, a: number) {
  const opportunities = c * 30 * (r / 1000) * 0.15;
  const time = e * 8 * 22 * 0.12 * 35;
  const followUp = r * 0.08;
  const total = Math.round((opportunities + time + followUp) * a);
  return {
    total,
    opportunities: Math.round(opportunities * a),
    time: Math.round(time * a),
    followUp: Math.round(followUp * a),
  };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

const causes = [
  { icon: Phone, title: "Appels non traités", desc: "Chaque appel manqué est un client perdu. Sans réponse 24/7, vous laissez filer des opportunités." },
  { icon: RefreshCw, title: "Suivi inexistant", desc: "80% des ventes nécessitent 5 relances. Sans automatisation, vos prospects disparaissent." },
  { icon: CalendarCheck, title: "Tâches manuelles", desc: "Vos équipes perdent des heures sur des tâches répétitives qui pourraient être automatisées." },
];

const pillars = [
  { n: "01", title: "Réceptionniste IA 24/7", desc: "Répond, qualifie et planifie — même la nuit.", benefit: "Ne manquez plus aucun appel" },
  { n: "02", title: "Suivi automatisé", desc: "Relances SMS, email et voix au bon moment.", benefit: "Convertissez plus de prospects" },
  { n: "03", title: "Prise de rendez-vous optimisée", desc: "Réservation en ligne et confirmation automatique.", benefit: "Gagnez 10h+ par semaine" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

// Animated counter component
const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{fmt(displayed)}</>;
};

const Resultats = () => {
  const [params] = useSearchParams();
  const r = Number(params.get("r")) || 35000;
  const e = Number(params.get("e")) || 7;
  const c = Number(params.get("c")) || 6;
  const a = Number(params.get("a")) || 1;

  const result = calculateLoss(r, e, c, a);

  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 25000);
    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  const scrollToCalendar = () => {
    document.getElementById("calendar-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-background text-foreground relative overflow-hidden">
      {/* Layered ambient depth with parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y1, scale: scale1, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(38 76% 50% / 0.04) 0%, transparent 70%)' }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y2, background: 'radial-gradient(ellipse 60% 50% at 80% 100%, hsl(34 85% 38% / 0.03) 0%, transparent 60%)' }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y3, background: 'radial-gradient(circle at 20% 50%, hsl(0 0% 100% / 0.015) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
      <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px] pointer-events-none" style={{ y: yOrb }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-4 md:pt-6 pb-2 px-6 flex items-center justify-center gap-2.5 relative z-10"
      >
        <img src={nuvraLogo} alt="Nuvra" className="w-12 h-12 object-contain" />
        <span className="text-sm font-body font-semibold tracking-[0.15em] uppercase text-gradient-gold">
          Nuvra
        </span>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Result Hero */}
        <section className="py-8 md:py-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs font-body uppercase tracking-[0.15em] text-muted-foreground mb-4 md:mb-6"
          >
            Vos pertes mensuelles estimées
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="mb-3"
          >
            <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-gradient-gold">
              <AnimatedNumber value={result.total} />
            </span>
            <span className="block text-muted-foreground font-body text-sm mt-1.5">par mois — soit <span className="text-foreground font-semibold">{fmt(result.total * 12)}</span> par an</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-body text-sm text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed"
          >
            Opportunités manquées liées aux appels non traités, suivis inexistants et tâches manuelles.
          </motion.p>

          {/* CTA button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={scrollToCalendar}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all duration-200 glow-gold mb-8"
          >
            Récupérer ces revenus
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 text-left max-w-2xl mx-auto">
            {[
              { label: "Opportunités perdues", value: result.opportunities },
              { label: "Temps improductif", value: result.time },
              { label: "Manque de relance", value: result.followUp },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center justify-between md:flex-col md:items-center md:text-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <span className="font-body text-xs text-muted-foreground">{item.label}</span>
                <span className="font-display text-base md:text-lg font-semibold text-gradient-gold">{fmt(item.value)}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-px w-16 mx-auto line-gold opacity-30" />

        {/* Causes + Pitch side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-8 md:py-12">
          {/* 3 Causes */}
          <div>
            <motion.h2 {...fadeUp()} className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-center md:text-left mb-4 md:mb-6">
              Pourquoi ces pertes ?
            </motion.h2>
            <div className="grid gap-3">
              {causes.map((c, i) => (
                <motion.div
                  key={c.title}
                  {...fadeUp(i * 0.1)}
                  className="flex gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold mb-0.5">{c.title}</h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nuvra pitch */}
          <div>
            <motion.div {...fadeUp()} className="text-center md:text-left mb-4 md:mb-6">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <img src={nuvraLogo} alt="Nuvra" className="w-10 h-10 object-contain opacity-80" />
                <p className="text-xs font-body uppercase tracking-[0.15em] text-primary">Notre approche</p>
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">
                Nuvra corrige ces fuites
              </h2>
            </motion.div>
            <div className="grid gap-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.n}
                  {...fadeUp(i * 0.1)}
                  className="flex gap-3 items-start p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <span className="font-display text-lg font-bold text-primary/40 shrink-0">{p.n}</span>
                  <div>
                    <h3 className="font-display text-sm font-semibold mb-0.5">{p.title}</h3>
                    <p className="font-body text-xs text-muted-foreground mb-1.5">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-body text-primary/80">
                      <CheckCircle2 className="w-3 h-3" />
                      {p.benefit}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-16 mx-auto line-gold opacity-30" />

        {/* Video + Calendar */}
        <div id="calendar-section" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-8 md:py-12">
          {/* Video */}
          <div>
            <motion.h2 {...fadeUp()} className="font-display text-xl sm:text-2xl font-bold text-center md:text-left mb-2">
              Analysons vos fuites
            </motion.h2>
            <motion.p {...fadeUp(0.05)} className="font-body text-xs text-muted-foreground text-center md:text-left mb-4">
              Découvrez en 2 minutes comment nous aidons les entreprises comme la vôtre.
            </motion.p>
            <motion.div {...fadeUp(0.1)} className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster=""
              >
                <source
                  src="https://storage.googleapis.com/msgsndr/1WZ5oAceF2QGS13S4jfv/media/698a74517f6dcf50a99d0c61.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>
          </div>

          {/* Calendar */}
          <div className="text-center md:text-left">
            <motion.div {...fadeUp()}>
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
                Réservez votre diagnostic
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-1">
                Cet appel est un diagnostic stratégique. <span className="text-foreground font-semibold">Aucune obligation.</span>
              </p>
              <p className="font-body text-[10px] text-primary/60 mb-4">
                ✓ Gratuit · ✓ 15 min · ✓ Plan d'action personnalisé
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="rounded-xl border border-border bg-card overflow-hidden">
              <iframe
                src="https://link.nuvra-automation.com/widget/booking/TSKHG4iPAUloDCyxhAqH"
                className="w-full border-0"
                style={{ height: "600px" }}
                title="Réservez votre diagnostic"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-border max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={nuvraLogo} alt="Nuvra" className="w-5 h-5 object-contain" />
            <span className="font-display text-sm font-semibold text-gradient-gold">Nuvra Automation</span>
          </div>
          <span className="font-body text-[10px] text-muted-foreground">© {new Date().getFullYear()} Tous droits réservés.</span>
        </div>
      </footer>

      {/* Popup formulaire après 25s */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.25 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
              <iframe
                src="https://link.nuvra-automation.com/widget/form/cKsZLqb3uaF3XkhajJoV?notrack=true"
                className="w-full border-0"
                style={{ height: "500px" }}
                title="Formulaire Nuvra"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resultats;
