import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { fadeUp, staggerItem, lineGrow, easeOutExpo } from "../motion/variants";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const socialLinks = [
    { href: "https://github.com/gouravmalviya445", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/gouravmalviya", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:gouravmalviya445@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <footer className="bg-bg py-16 md:py-20 border-t border-borderClr relative z-10" ref={footerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16"
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
          {/* Logo & Slogan */}
          <motion.div variants={fadeUp} className="text-center md:text-left">
            <a
              href="#"
              className="text-2xl font-heading font-black text-primary mb-2 block uppercase tracking-tight hover:text-accent transition-colors duration-200"
            >
              GM.dev
            </a>
            <p className="text-secondary text-sm max-w-xs leading-relaxed font-sans">
              Specialized in crafting scalable, highly performant systems and
              beautiful digital interfaces.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-3"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                variants={staggerItem}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="p-3 rounded-xs border border-borderClr bg-whiteSec text-secondary hover:text-accent hover:border-accent transition-all duration-200"
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll to Top */}
          <motion.button
            variants={fadeUp}
            onClick={scrollToTop}
            className="p-3 rounded-xs border border-borderClr bg-whiteSec text-accent hover:border-accent hover:bg-accent hover:text-whiteSec transition-all duration-250 group cursor-pointer"
            aria-label="Scroll to Top"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp
              size={20}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </motion.button>
        </motion.div>

        {/* Divider with line-draw animation */}
        <motion.div
          className="h-px bg-borderClr/60"
          variants={lineGrow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />

        {/* Copyright Line */}
        <motion.div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary text-xs font-sans"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Gourav Malviya. All rights reserved.</p>
          <p className="tracking-wide">DESIGNED & ENGINEERED IN INDIA</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
