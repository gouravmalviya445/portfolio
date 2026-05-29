import type { Variants } from "framer-motion";

// ─── Easing Curves ───────────────────────────────────────────
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

// ─── Fade Up ─────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo as unknown as number[],
      delay: i * 0.1,
    },
  }),
};

// ─── Fade In ─────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
};

// ─── Slide In From Left ──────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo as unknown as number[] },
  },
};

// ─── Slide In From Right ─────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo as unknown as number[] },
  },
};

// ─── Scale Reveal ────────────────────────────────────────────
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutQuart as unknown as number[] },
  },
};

// ─── Stagger Container ──────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ─── Stagger Item (fade + translate) ────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo as unknown as number[] },
  },
};

// ─── Mask Reveal (clip-path) ────────────────────────────────
export const maskReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1, ease: easeInOutCubic as unknown as number[] },
  },
};

// ─── Image Reveal ───────────────────────────────────────────
export const imageReveal: Variants = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0%)",
    scale: 1.15,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: {
      clipPath: { duration: 1.2, ease: easeInOutCubic as unknown as number[] },
      scale: { duration: 1.4, ease: easeOutExpo as unknown as number[] },
    },
  },
};

// ─── Line Draw ──────────────────────────────────────────────
export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: easeOutExpo as unknown as number[] },
  },
};

// ─── Navbar Variants ────────────────────────────────────────
export const navbarVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easeOutExpo as unknown as number[] },
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// ─── Hero Headline Character Reveal ─────────────────────────
export const charReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeOutExpo as unknown as number[],
      delay: 0.3 + i * 0.03,
    },
  }),
};
