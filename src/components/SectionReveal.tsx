import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp, staggerContainer } from "../motion/variants";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  delay?: number;
  once?: boolean;
  amount?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = "",
  variants,
  stagger = false,
  delay = 0,
  once = true,
  amount = 0.15,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const selectedVariants = stagger
    ? staggerContainer
    : variants || fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={selectedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
