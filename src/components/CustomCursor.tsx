import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Track interactive element hover
  useEffect(() => {
    const interactiveSelectors =
      'a, button, input, textarea, [data-cursor], [role="button"]';

    const onPointerOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest(interactiveSelectors);
      if (target) {
        setIsHovering(true);
        const label = (target as HTMLElement).getAttribute("data-cursor") || "";
        setCursorLabel(label);
      }
    };

    const onPointerOut = (e: Event) => {
      const target = (e.target as HTMLElement).closest(interactiveSelectors);
      if (target) {
        setIsHovering(false);
        setCursorLabel("");
      }
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isHovering ? (cursorLabel ? 80 : 48) : 12,
            height: isHovering ? (cursorLabel ? 80 : 48) : 12,
            x: isHovering ? (cursorLabel ? -40 : -24) : -6,
            y: isHovering ? (cursorLabel ? -40 : -24) : -6,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        >
          <div
            className="absolute inset-0 rounded-full border border-white/80"
            style={{
              backgroundColor: isHovering
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.9)",
              backdropFilter: isHovering ? "blur(4px)" : "none",
            }}
          />
          <AnimatePresence>
            {cursorLabel && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative text-white text-[10px] font-bold uppercase tracking-widest"
              >
                {cursorLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Global cursor hide */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
