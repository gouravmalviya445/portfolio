import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "../constants";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { navbarVariants, staggerItem } from "../motion/variants";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const isScrolled = scrollY > 20;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-borderClr/60 py-3"
          : "bg-transparent py-5"
      }`}
      variants={navbarVariants}
      initial="visible"
      animate={scrollY > 200 && scrollDirection === "down" && !isOpen ? "hidden" : "visible"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#"
              className="text-xl font-heading font-black tracking-tight text-primary transition-colors hover:text-accent"
            >
              GM.dev
            </a>
          </motion.div>

          {/* Desktop Links */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="ml-10 flex items-center space-x-8">
              <a
                href="https://drive.google.com/file/d/1vSOYz4GK_TPyWEzc3zoWST3pzQM5QSHW/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-sm font-medium text-secondary hover:text-accent transition-colors duration-200 group"
              >
                Resume
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-sm font-medium text-secondary hover:text-accent transition-colors duration-200 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="#contact"
                className="relative overflow-hidden border border-accent text-accent hover:text-whiteSec px-5 py-2 rounded-xs text-sm font-semibold transition-all duration-300 uppercase tracking-wider group"
              >
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Hire Me</span>
              </a>
            </div>
          </motion.div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary p-2 transition-colors"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute w-full bg-bg/98 backdrop-blur-xl border-b border-borderClr"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="px-4 pt-2 pb-6 space-y-2 border-t border-borderClr/30"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
            >
              <motion.a
                variants={staggerItem}
                href="https://drive.google.com/file/d/1vSOYz4GK_TPyWEzc3zoWST3pzQM5QSHW/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-3 text-base font-medium text-secondary hover:text-accent border-b border-borderClr/30"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </motion.a>

              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item.label}
                  variants={staggerItem}
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-secondary hover:text-accent border-b border-borderClr/30"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div variants={staggerItem} className="px-3 pt-4">
                <a
                  href="#contact"
                  className="block text-center border border-accent text-accent hover:bg-accent hover:text-whiteSec py-3 rounded-xs text-sm font-semibold transition-all duration-200 uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Hire Me
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
