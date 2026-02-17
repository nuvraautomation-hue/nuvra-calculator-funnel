import { motion } from "framer-motion";
import { Phone, RefreshCw, CalendarCheck } from "lucide-react";

const problems = [
  {
    icon: Phone,
    title: "Les appels entrants ne sont pas tous traités",
    desc: "Chaque appel manqué est un client potentiel perdu. Sans système de capture 24/7, vous laissez de l'argent sur la table.",
  },
  {
    icon: RefreshCw,
    title: "Les prospects ne sont pas relancés automatiquement",
    desc: "80% des ventes nécessitent 5 relances. Sans automatisation, vos prospects passent à la concurrence.",
  },
  {
    icon: CalendarCheck,
    title: "Les équipes passent trop de temps sur des tâches répétitives",
    desc: "Confirmation de rendez-vous, suivi client, saisie de données — du temps précieux gaspillé chaque jour.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Réceptionniste IA 24/7",
    desc: "Ne manquez plus jamais un appel. Notre IA répond, qualifie et planifie des rendez-vous même en dehors des heures d'ouverture.",
  },
  {
    number: "02",
    title: "Suivi automatisé intelligent",
    desc: "Relances par SMS, email et voix, déclenchées au bon moment, avec le bon message, sans intervention humaine.",
  },
  {
    number: "03",
    title: "Capture et prise de rendez-vous optimisées",
    desc: "Formulaires intelligents, réservation en ligne et confirmation automatique pour maximiser votre taux de conversion.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const PositioningSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body uppercase tracking-[0.2em] text-primary mb-4 block">
            Le constat
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Pourquoi ces pertes existent ?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-8 rounded-xl border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{p.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Our approach */}
        <div className="h-px w-full max-w-xs mx-auto line-gold opacity-20 mb-28" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body uppercase tracking-[0.2em] text-primary mb-4 block">
            Notre approche
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Trois piliers pour reprendre le contrôle
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex gap-6 sm:gap-8 p-8 rounded-xl border border-border bg-card items-start"
            >
              <span className="font-display text-3xl font-bold text-primary/30 shrink-0">
                {p.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <div className="h-px w-full max-w-xs mx-auto line-gold opacity-20 mb-16" />
          <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-8 block">
            Témoignages
          </span>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "En 3 semaines, nous avons récupéré plus de 12 000$ en opportunités que nous laissions filer. L'IA de Nuvra a transformé notre façon de gérer les appels.",
                name: "Dr. Sophie Larivière",
                role: "Propriétaire, MedSpa Élite",
              },
              {
                quote: "Nous n'avions aucune idée de combien nous perdions. L'équipe de Nuvra nous a montré les chiffres et a mis en place un système qui tourne tout seul.",
                name: "Marc-André Tremblay",
                role: "Directeur, Agence Immobilière MTL",
              },
            ].map((t) => (
              <div key={t.name} className="p-8 rounded-xl border border-border bg-card text-left">
                <p className="font-body text-sm text-muted-foreground leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <span className="font-body text-sm font-medium text-foreground">{t.name}</span>
                  <span className="block font-body text-xs text-muted-foreground mt-0.5">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PositioningSection;
