import { useRef } from "react";
import { Easing, motion, useInView, useScroll, useTransform } from "framer-motion";
import { PROJECTS, ICON_MAP } from "../constants";
import { ExternalLink, Code, ChevronRight } from "lucide-react";
import { fadeUp, staggerItem, imageReveal, easeOutExpo } from "../motion/variants";

const ProjectCard: React.FC<{
  project: (typeof PROJECTS)[number];
  idx: number;
}> = ({ project, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const isReversed = idx % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Frame Container */}
      <motion.div
        className="w-full lg:w-1/2"
        style={{ y: imageY }}
      >
        <motion.div
          className="bg-whiteSec border border-borderClr p-3 rounded-xs group relative overflow-hidden"
          data-cursor="View"
          whileHover={{ borderColor: "rgba(183, 110, 77, 0.5)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Image with clip-path reveal */}
          <motion.div
            className="overflow-hidden relative"
            variants={imageReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-[300px] md:h-[380px] object-cover filter grayscale-[40%] contrast-[1.05] group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: easeOutExpo as unknown as Easing[] }}
            />
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />
          </motion.div>

          {/* Tech stack badges */}
          <motion.div
            className="flex flex-wrap gap-2 mt-4 pt-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 0.8 },
              },
            }}
          >
            {project.stack.map((tech) => (
              <motion.span
                key={tech}
                variants={staggerItem}
                className="px-2.5 py-1 bg-bg border border-borderClr text-secondary text-2xs uppercase tracking-wider font-semibold rounded-2xs"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Project Content Column */}
      <motion.div
        className="w-full lg:w-1/2"
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
        <motion.h3
          className="text-2xl md:text-3xl font-heading font-black mb-4 text-primary uppercase tracking-tight"
          variants={fadeUp}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-secondary text-sm md:text-base mb-8 leading-relaxed font-sans"
          variants={fadeUp}
        >
          {project.description}
        </motion.p>

        {/* Features List */}
        <motion.div
          className="space-y-3.5 mb-10"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.5 },
            },
          }}
        >
          {project.features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-2.5"
              variants={staggerItem}
            >
              <ChevronRight
                size={15}
                className="text-accent mt-0.5 flex-shrink-0"
              />
              <span className="text-secondary text-xs md:text-sm leading-relaxed font-sans">
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Links */}
        <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
          {project.links.code?.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative overflow-hidden flex items-center gap-1.5 px-4 py-2.5 bg-whiteSec border border-borderClr text-secondary hover:text-primary hover:border-accent rounded-xs transition-colors duration-200 text-2xs font-bold uppercase tracking-wider"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Code size={14} className="text-accent" />
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover/link:w-full transition-all duration-300" />
            </motion.a>
          ))}
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live relative overflow-hidden flex items-center gap-1.5 px-5 py-2.5 bg-accent text-whiteSec rounded-xs transition-colors duration-250 text-2xs font-bold uppercase tracking-wider"
              data-cursor="Open"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="absolute inset-0 bg-accentHover translate-y-full group-hover/live:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-1.5">
                <ExternalLink size={14} />
                Live Demo
              </span>
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="projects" className="py-32 md:py-40 bg-bg border-t border-borderClr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="block font-heading font-bold text-accent text-xs uppercase tracking-widest"
            >
              03 / FEATURED WORK
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-heading font-black text-primary uppercase mt-4 tracking-tight leading-none"
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={headerInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo as unknown as Easing[] }}
                >
                  Featured Projects
                </motion.span>
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-secondary max-w-xl mt-6 text-sm leading-relaxed font-sans"
            >
              A curated selection of backend-heavy architectures, high-performance
              API designs, real-time collaboration engines, and AI integrations.
            </motion.p>
          </div>
          <motion.a
            variants={fadeUp}
            custom={3}
            href="https://github.com/gouravmalviya445"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-accent hover:text-accentHover font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-200 pb-1 relative"
          >
            All GitHub Projects <ICON_MAP.ExternalLink size={14} />
            <span className="absolute bottom-0 left-0 w-full h-px bg-accent/30 group-hover:bg-accent transition-colors duration-300" />
          </motion.a>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-32">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
