import { useRef } from "react";
import { Easing, motion, useInView } from "framer-motion";
import { SKILL_GROUPS, ICON_MAP } from "../constants";
import { fadeUp, staggerItem, easeOutExpo } from "../motion/variants";

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="py-32 md:py-40 bg-whiteSec border-t border-borderClr" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          <motion.span
            variants={fadeUp}
            className="block font-heading font-bold text-accent text-xs uppercase tracking-widest"
          >
            02 / TECHNICAL ARSENAL
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-heading font-black text-primary uppercase mt-4 tracking-tight leading-none"
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo as unknown as Easing[] }}
              >
                Technical Expertise
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-secondary max-w-2xl mx-auto mt-6 text-sm leading-relaxed font-sans"
          >
            A comprehensive overview of language paradigms, backend
            architectures, databases, and modern developer tooling.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.3 },
            },
          }}
        >
          {SKILL_GROUPS.map((group) => {
            const Icon = ICON_MAP[group.icon];
            return (
              <motion.div
                key={group.category}
                variants={staggerItem}
                className="p-8 bg-bg border border-borderClr hover:border-accent transition-all duration-300 rounded-xs group relative overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/3 to-transparent" />

                {/* Square Icon Container */}
                <motion.div
                  className="w-12 h-12 rounded-xs border border-borderClr bg-whiteSec flex items-center justify-center text-accent mb-6 relative z-10 group-hover:bg-accent group-hover:text-whiteSec group-hover:border-accent transition-all duration-350"
                >
                  <Icon size={22} />
                </motion.div>

                {/* Category Header */}
                <h3 className="text-lg font-heading font-bold mb-5 text-primary relative z-10">
                  {group.category}
                </h3>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 bg-whiteSec border border-borderClr text-secondary text-xs rounded-xs hover:border-accent hover:text-primary transition-all duration-200 cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
