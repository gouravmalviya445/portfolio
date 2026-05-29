import { useRef } from "react";
import { Easing, motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import { fadeUp, staggerItem, lineGrow, easeOutExpo } from "../motion/variants";

const Education: React.FC = () => {
  const coursework = [
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-32 md:py-40 border-t border-borderClr" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Left Panel: Section Label */}
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
          >
            <motion.span
              variants={fadeUp}
              className="block font-heading font-bold text-accent text-xs uppercase tracking-widest"
            >
              01 / ABOUT & EDUCATION
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-black text-primary uppercase mt-4 tracking-tight leading-none"
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo as unknown as Easing[] }}
                >
                  Academic
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, delay: 0.35, ease: easeOutExpo as unknown as Easing[] }}
                >
                  Foundation
                </motion.span>
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-secondary mt-6 max-w-sm text-sm leading-relaxed font-sans"
            >
              Merging structural computer science knowledge with robust
              full-stack engineering expertise to build clean, performant
              software systems.
            </motion.p>
          </motion.div>

          {/* Right Panel: Education Card */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo as unknown as Easing[] }}
          >
            <motion.div
              className="bg-whiteSec border border-borderClr rounded-xs p-8 md:p-10 relative overflow-hidden group"
              whileHover={{ borderColor: "rgba(183, 110, 77, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 h-px bg-accent"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: easeOutExpo as unknown as Easing[] }}
              />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xs border border-borderClr bg-bg flex items-center justify-center text-accent flex-shrink-0"
                    whileHover={{ backgroundColor: "rgba(183, 110, 77, 1)", color: "#fff" }}
                    transition={{ duration: 0.3 }}
                  >
                    <GraduationCap size={22} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-1">
                      Bachelor of Computer Application (BCA)
                    </h3>
                    <p className="text-accent font-medium text-sm mb-4">
                      Modi Institute Of Management & Technology
                    </p>

                    {/* Timeline */}
                    <div className="flex flex-wrap items-center gap-4 text-secondary text-xs mb-8">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-accent" />
                        Aug 2023 – June 2026
                      </span>
                      <span className="bg-bg border border-borderClr px-3 py-1 rounded-xs text-accent font-semibold text-2xs uppercase tracking-wider">
                        Expected June 2026
                      </span>
                    </div>

                    {/* Relevant Coursework */}
                    <div>
                      <div className="flex items-center gap-2 mb-4 text-primary font-bold text-xs uppercase tracking-wider">
                        <BookOpen size={14} className="text-accent" />
                        Core Coursework
                      </div>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.06, delayChildren: 0.8 },
                          },
                        }}
                      >
                        {coursework.map((course) => (
                          <motion.span
                            key={course}
                            variants={staggerItem}
                            className="px-3 py-1.5 bg-bg border border-borderClr text-secondary text-xs rounded-xs hover:border-accent hover:text-primary transition-colors cursor-default"
                            whileHover={{ scale: 1.05 }}
                          >
                            {course}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
