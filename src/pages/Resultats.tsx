import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, RefreshCw, CalendarCheck } from "lucide-react";

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

const Resultats = () => {
  const [params] = useSearchParams();
  const r = Number(params.get("r")) || 35000;
  const e = Number(params.get("e")) || 7;
  const c = Number(params.get("c")) || 6;
  const a = Number(params.get("a")) || 1;

  const result = calculateLoss(r, e, c, a);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 text-center">
        <span className="text-xs font-body font-medium tracking-[0.2em] uppercase text-primary">
          Nuvra Automation
        </span>
      </div>

      {/* Result */}
      <section className="px-6 py-8 text-center max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-body uppercase tracking-[0.15em] text-muted-foreground mb-6">
            Vos pertes mensuelles estimées
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, type: "spring" }}
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
          transition={{ delay: 0.4 }}
          className="font-body text-sm text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed"
        >
          Opportunités manquées liées aux appels non traités, suivis inexistants et tâches manuelles.
        </motion.p>

        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-3 mb-12 text-left"
        >
          {[
            { label: "Opportunités perdues", value: result.opportunities },
            { label: "Temps improductif", value: result.time },
            { label: "Manque de relance", value: result.followUp },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-card border border-border">
              <span className="font-body text-xs sm:text-sm text-muted-foreground">{item.label}</span>
              <span className="font-display text-base sm:text-lg font-semibold">{fmt(item.value)}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px w-16 mx-auto line-gold opacity-30" />

      {/* 3 Causes */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">
          Pourquoi ces pertes ?
        </h2>
        <div className="grid gap-4">
          {causes.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card"
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

      {/* Nuvra short pitch */}
      <section className="px-6 py-12 max-w-lg mx-auto text-center">
        <p className="text-xs font-body uppercase tracking-[0.15em] text-primary mb-4">Notre approche</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
          Nuvra corrige ces fuites
        </h2>
        <div className="grid gap-3 text-left">
          {pillars.map((p) => (
            <div key={p.n} className="flex gap-4 items-start p-5 rounded-xl border border-border bg-card">
              <span className="font-display text-xl font-bold text-primary/30 shrink-0">{p.n}</span>
              <div>
                <h3 className="font-display text-sm font-semibold mb-0.5">{p.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-16 mx-auto line-gold opacity-30" />

      {/* Video */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-6">
          Analysons vos fuites
        </h2>
        <div className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7L8 5z" fill="hsl(43 72% 55%)" />
              </svg>
            </div>
          </div>
          <span className="absolute bottom-3 left-3 text-[10px] font-body text-muted-foreground">
            2 min — Diagnostic stratégique
          </span>
        </div>
      </section>

      {/* Calendar */}
      <section className="px-6 py-12 max-w-lg mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
          Réservez votre diagnostic
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Cet appel est un diagnostic stratégique. <span className="text-foreground">Aucune obligation.</span>
        </p>

        <div className="rounded-xl border border-border bg-card p-10 mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(43 72% 55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-display text-sm font-semibold text-gradient-gold">Nuvra Automation</span>
          <span className="font-body text-[10px] text-muted-foreground">© {new Date().getFullYear()} Tous droits réservés.</span>
        </div>
      </footer>
    </div>
  );
};

export default Resultats;
