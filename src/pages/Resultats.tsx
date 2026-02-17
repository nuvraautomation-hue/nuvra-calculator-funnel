import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, RefreshCw, CalendarCheck } from "lucide-react";
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
  { n: "01", title: "Réceptionniste IA 24/7", desc: "Répond, qualifie et planifie — même la nuit." },
  { n: "02", title: "Suivi automatisé", desc: "Relances SMS, email et voix au bon moment." },
  { n: "03", title: "Prise de rendez-vous optimisée", desc: "Réservation en ligne et confirmation automatique." },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const Resultats = () => {
  const [params] = useSearchParams();
  const r = Number(params.get("r")) || 35000;
  const e = Number(params.get("e")) || 7;
  const c = Number(params.get("c")) || 6;
  const a = Number(params.get("a")) || 1;

  const result = calculateLoss(r, e, c, a);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-6 pb-2 px-6 flex items-center justify-center gap-2.5 relative z-10"
      >
        <img src={nuvraLogo} alt="Nuvra" className="w-8 h-8 object-contain" />
        <span className="text-sm font-body font-semibold tracking-[0.15em] uppercase text-gradient-gold">
          Nuvra
        </span>
      </motion.div>

      {/* Result */}
      <section className="px-6 py-10 text-center max-w-lg mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs font-body uppercase tracking-[0.15em] text-muted-foreground mb-6"
        >
          Vos pertes mensuelles estimées
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
          className="mb-4"
        >
          <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-gradient-gold">
            {fmt(result.total)}
          </span>
          <span className="block text-muted-foreground font-body text-sm mt-2">par mois</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body text-sm text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed"
        >
          Opportunités manquées liées aux appels non traités, suivis inexistants et tâches manuelles.
        </motion.p>

        {/* Breakdown */}
        <div className="grid gap-3 mb-12 text-left">
          {[
            { label: "Opportunités perdues", value: result.opportunities },
            { label: "Temps improductif", value: result.time },
            { label: "Manque de relance", value: result.followUp },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <span className="font-body text-xs sm:text-sm text-muted-foreground">{item.label}</span>
              <span className="font-display text-base sm:text-lg font-semibold text-gradient-gold">{fmt(item.value)}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-px w-16 mx-auto line-gold opacity-30" />

      {/* 3 Causes */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <motion.h2 {...fadeUp()} className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">
          Pourquoi ces pertes ?
        </motion.h2>
        <div className="grid gap-4">
          {causes.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp(i * 0.1)}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <c.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold mb-1">{c.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-px w-16 mx-auto line-gold opacity-30" />

      {/* Nuvra pitch */}
      <section className="px-6 py-12 max-w-lg mx-auto text-center">
        <motion.div {...fadeUp()}>
          <img src={nuvraLogo} alt="Nuvra" className="w-12 h-12 object-contain mx-auto mb-4 opacity-80" />
          <p className="text-xs font-body uppercase tracking-[0.15em] text-primary mb-4">Notre approche</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
            Nuvra corrige ces fuites
          </h2>
        </motion.div>
        <div className="grid gap-3 text-left">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              {...fadeUp(i * 0.1)}
              className="flex gap-4 items-start p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <span className="font-display text-xl font-bold text-primary/40 shrink-0">{p.n}</span>
              <div>
                <h3 className="font-display text-sm font-semibold mb-0.5">{p.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-px w-16 mx-auto line-gold opacity-30" />

      {/* Video */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <motion.h2 {...fadeUp()} className="font-display text-2xl sm:text-3xl font-bold text-center mb-6">
          Analysons vos fuites
        </motion.h2>
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
      </section>

      {/* Calendar */}
      <section className="px-6 py-12 max-w-lg mx-auto text-center">
        <motion.div {...fadeUp()}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Réservez votre diagnostic
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Cet appel est un diagnostic stratégique. <span className="text-foreground">Aucune obligation.</span>
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="rounded-xl border border-border bg-card p-10 mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p className="font-body text-xs text-muted-foreground">
              Intégrez votre calendrier ici
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={nuvraLogo} alt="Nuvra" className="w-5 h-5 object-contain" />
            <span className="font-display text-sm font-semibold text-gradient-gold">Nuvra Automation</span>
          </div>
          <span className="font-body text-[10px] text-muted-foreground">© {new Date().getFullYear()} Tous droits réservés.</span>
        </div>
      </footer>
    </div>
  );
};

export default Resultats;
