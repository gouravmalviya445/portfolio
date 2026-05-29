import { Easing, motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { TfiEmail } from "react-icons/tfi";
import { staggerItem, lineGrow, easeOutExpo } from "../motion/variants";

// ─── Typing Animation Hook ─────────────────────────────────
function useTypewriter(lines: string[], speed = 40, lineDelay = 600, startDelay = 0) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;
    if (currentLine >= lines.length) { setIsComplete(true); return; }
    if (currentChar === 0 && currentLine > 0) {
      const t = setTimeout(() => setCurrentChar(1), lineDelay);
      return () => clearTimeout(t);
    }
    if (currentChar <= lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const n = [...prev];
          n[currentLine] = lines[currentLine].slice(0, currentChar);
          return n;
        });
        setCurrentChar((c) => c + 1);
      }, speed + Math.random() * 20);
      return () => clearTimeout(t);
    } else {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }
  }, [hasStarted, currentLine, currentChar, lines, speed, lineDelay]);

  return { displayedLines, isComplete };
}

// ─── Animated Counter ───────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000, delay = 0 }: {
  target: number; suffix?: string; duration?: number; delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started) return;
    const st = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - st) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return <span>{count}{suffix}</span>;
}

// ─── Mouse Parallax Hook ────────────────────────────────────
function useMouseParallax(strength = 1) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 150 });
  const springY = useSpring(y, { damping: 30, stiffness: 150 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      x.set(cx * 15 * strength);
      y.set(cy * 10 * strength);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y, strength]);

  return { x: springX, y: springY };
}

// ─── Premium Code Window ────────────────────────────────────
const PremiumCodeWindow: React.FC = () => {
  const terminalLines = [
    "$ go run main.go --port=8080",
    "✓ Auth service initialized",
    "✓ Database pool: 25 connections",
    "✓ Redis cache: connected",
    "✓ Webhook handler: registered",
    "✓ Rate limiter: 1000 req/min",
    "→ Server listening on :8080",
  ];

  const { displayedLines, isComplete } = useTypewriter(terminalLines, 28, 350, 1800);

  // Mouse parallax — different layers move differently
  const terminalMouse = useMouseParallax(1);
  const metricsMouse = useMouseParallax(1.6);
  const glowMouse = useMouseParallax(0.4);

  return (
    <div className="relative w-full h-full flex items-center justify-end">
      {/* ── BACKGROUND LAYER: Copper glow ── */}
      <motion.div
        className="absolute -inset-8 pointer-events-none"
        style={{ x: glowMouse.x, y: glowMouse.y }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(183,110,77,0.12) 0%, rgba(183,110,77,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary cooler glow */}
        <motion.div
          className="absolute top-1/4 right-0 w-[300px] h-[250px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(183,110,77,0.06) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* ── MIDGROUND LAYER: Translucent panels ── */}
      <motion.div
        className="absolute top-8 -left-6 w-[85%] h-[75%] border border-borderClr/15 rounded-xs bg-whiteSec/30 backdrop-blur-sm"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: easeOutExpo as unknown as Easing[] }}
        style={{ x: glowMouse.x, y: glowMouse.y }}
      />
      <motion.div
        className="absolute -top-2 left-4 w-[70%] h-[60%] border border-borderClr/8 rounded-xs bg-whiteSec/15"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: easeOutExpo as unknown as Easing[] }}
      />

      {/* ── FOREGROUND: Main Terminal Card ── */}
      <motion.div
        className="relative z-10 w-full"
        style={{ x: terminalMouse.x, y: terminalMouse.y }}
        initial={{ opacity: 0, x: 80, scale: 0.92 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 1.5 },
          x: { duration: 1.2, delay: 1.5, ease: easeOutExpo as unknown as Easing[] },
          scale: { duration: 1.2, delay: 1.5 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
      >
        <div className="bg-gradient-to-b from-[#151515] to-[#111111] border border-white/[0.06] rounded-xs overflow-hidden shadow-2xl relative">
          {/* Noise texture overlay on terminal */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Subtle top reflection */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Terminal Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04] bg-[#0f0f0f]/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]/90" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]/90" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]/90" />
            </div>
            <span className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
              backend — zsh
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-[13px] leading-[1.8] min-h-[220px]">
            {displayedLines.map((line, i) => (
              <div key={i} className="flex items-start">
                <span className={
                  line?.startsWith("$") ? "text-[#B76E4D]"
                    : line?.startsWith("✓") ? "text-[#28c840]/90"
                      : line?.startsWith("→") ? "text-[#febc2e]/90"
                        : "text-white/50"
                }>
                  {line}
                </span>
              </div>
            ))}
            {!isComplete && (
              <span className="inline-block w-[7px] h-[15px] bg-[#B76E4D] animate-pulse ml-0.5 align-middle rounded-[1px]" />
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Floating Metrics Card ── */}
      <motion.div
        className="absolute -bottom-10 -left-8 bg-whiteSec/95 backdrop-blur-sm border border-borderClr rounded-xs p-5 shadow-xl w-[240px] z-20"
        style={{ x: metricsMouse.x, y: metricsMouse.y }}
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{
          opacity: 1, x: 0,
          y: [0, 10, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 3.2 },
          x: { duration: 0.8, delay: 3.2, ease: easeOutExpo as unknown as Easing[] },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 },
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Live Metrics
        </div>
        <div className="space-y-3">
          {[
            { label: "API Response", value: <AnimatedCounter target={12} suffix="ms" delay={3500} /> },
            { label: "Uptime", value: <AnimatedCounter target={99} suffix=".99%" delay={3700} /> },
            { label: "Req/sec", value: <AnimatedCounter target={2847} delay={3900} duration={2500} /> },
          ].map((m, i) => (
            <div key={i}>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-secondary font-mono">{m.label}</span>
                <span className="text-[11px] text-primary font-mono font-bold">{m.value}</span>
              </div>
              {i < 2 && <div className="h-px bg-borderClr/40 mt-3" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Floating Architecture Badge ── */}
      <motion.div
        className="absolute -top-6 -right-2 bg-gradient-to-b from-[#161616] to-[#111111] border border-white/[0.08] rounded-xs px-5 py-3.5 shadow-xl z-20"
        initial={{ opacity: 0, y: -15, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.6, delay: 3.8 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4.5 },
          scale: { duration: 0.6, delay: 3.8 },
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.4)]" />
            <div className="w-px h-4 bg-white/8 mt-1" />
          </div>
          <div>
            <div className="text-[9px] text-white/35 uppercase tracking-[0.15em]">Microservices</div>
            <div className="text-[11px] text-[#28c840] font-mono font-bold tracking-wide">ACTIVE</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Hero Component ─────────────────────────────────────────
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const descY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const socialY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const codeWindowY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const headlineLines = [
    { text: "Gourav", accent: false },
    { text: "Malviya", accent: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Animated architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute top-1/4 left-0 w-full h-px bg-borderClr/30"
          initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: easeOutExpo as unknown as Easing[] }} />
        <motion.div className="absolute top-3/4 left-0 w-full h-px bg-borderClr/20"
          initial={{ scaleX: 0, originX: 1 }} animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.8, ease: easeOutExpo as unknown as Easing[] }} />
        <motion.div className="absolute top-0 left-[45%] w-px h-full bg-borderClr/10"
          initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 2.5, delay: 2, ease: easeOutExpo as unknown as Easing[] }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* ── LEFT COLUMN: Content ── */}
          <div className="lg:w-[45%] xl:w-[42%] flex-shrink-0">
            {/* Badge */}
            <motion.div
              style={{ y: badgeY }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo as unknown as Easing[] }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 border border-borderClr bg-whiteSec text-accent text-xs font-bold uppercase tracking-wider mb-8 rounded-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>Open for collaborations</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 style={{ y: headlineY }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter leading-none mb-10 text-primary uppercase"
            >
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  <motion.span
                    className={`block ${line.accent ? "text-accent" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: easeOutExpo as unknown as Easing[] }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p style={{ y: descY }}
              className="text-lg md:text-xl text-secondary mb-12 max-w-xl leading-relaxed font-sans"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: easeOutExpo as unknown as Easing[] }}
            >
              Full-stack developer with strong backend expertise, building production-grade systems using{" "}
              <span className="text-primary font-bold border-b border-accent/30 pb-0.5">Golang, NodeJS, and Python</span>.
              Focused on architectural performance, security, and extreme scalability.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-4 mb-16"
              initial="hidden" animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 1.1 } } }}
            >
              <motion.a variants={staggerItem} href="#projects"
                className="group relative overflow-hidden flex items-center gap-2 bg-accent text-whiteSec px-8 py-4 border border-accent rounded-xs font-bold uppercase tracking-wider text-xs transition-colors duration-300"
                data-cursor="View" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="absolute inset-0 bg-accentHover translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </span>
              </motion.a>
              <motion.a variants={staggerItem} href="#contact"
                className="group relative overflow-hidden bg-whiteSec text-primary px-8 py-4 border border-borderClr rounded-xs font-bold uppercase tracking-wider text-xs transition-all duration-300"
                whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="absolute inset-0 bg-bg translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </motion.div>

            {/* Divider */}
            <motion.div className="h-px bg-borderClr/60 max-w-md mb-8"
              variants={lineGrow} initial="hidden" animate="visible" transition={{ delay: 1.3 }} />

            {/* Social Links */}
            <motion.div style={{ y: socialY }}
              className="flex items-center space-x-6 text-secondary max-w-md"
              initial="hidden" animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 1.5 } } }}
            >
              {[
                { href: "https://github.com/gouravmalviya445", icon: BsGithub, label: "GitHub" },
                { href: "https://linkedin.com/in/gouravmalviya", icon: BsLinkedin, label: "LinkedIn" },
                { href: "mailto:gouravmalviya445@gmail.com", icon: TfiEmail, label: "Email" },
                { href: "https://leetcode.com/u/gouravmalviya445", icon: SiLeetcode, label: "LeetCode" },
              ].map((social) => (
                <motion.a key={social.label} variants={staggerItem}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="hover:text-accent transition-colors duration-200" aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── THIN VERTICAL DIVIDER ── */}
          <motion.div
            className="hidden lg:block w-px self-stretch bg-borderClr/50 mx-2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1.8, ease: easeOutExpo as unknown as Easing[] }}
          />

          {/* ── RIGHT COLUMN: Premium Code Window (bigger, pushed right) ── */}
          <motion.div
            className="hidden lg:flex flex-1 items-center justify-end pl-4"
            style={{ y: codeWindowY }}
          >
            <div className="w-full max-w-2xl">
              <PremiumCodeWindow />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] text-secondary/60 font-mono uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-accent/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
