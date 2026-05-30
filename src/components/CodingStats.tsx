import { useRef, useState, useEffect, useCallback } from "react";
import { Easing, motion, useInView } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { ExternalLink, GitCommit, FolderGit2, Trophy, Flame, Target, Zap } from "lucide-react";
import { fadeUp, staggerItem, easeOutExpo } from "../motion/variants";

// ─── Types ──────────────────────────────────────────────────
interface GitHubData {
  totalContributions: number;
  publicRepos: number;
  contributionsByYear: Record<string, number>;
}

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
}

// ─── Animated Counter ───────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  delay = 0,
  shouldAnimate = false,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  shouldAnimate?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay, shouldAnimate]);

  useEffect(() => {
    if (!started) return;
    const st = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - st) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Circular Progress Ring ─────────────────────────────────
function ProgressRing({
  percentage,
  size = 60,
  strokeWidth = 4,
  color,
  delay = 0,
  shouldAnimate = false,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  delay?: number;
  shouldAnimate?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    const t = setTimeout(() => {
      setProgress(percentage);
    }, delay);
    return () => clearTimeout(t);
  }, [shouldAnimate, percentage, delay]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-borderPlatformStats/30"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (progress / 100) * circumference}
        style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  );
}

// ─── Difficulty Bar ─────────────────────────────────────────
function DifficultyBar({
  label,
  solved,
  total,
  color,
  delay = 0,
  shouldAnimate = false,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  delay?: number;
  shouldAnimate?: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;
    const t = setTimeout(() => {
      setWidth((solved / total) * 100);
    }, delay);
    return () => clearTimeout(t);
  }, [shouldAnimate, solved, total, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-secondary uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono font-bold text-primary">
          <AnimatedCounter target={solved} shouldAnimate={shouldAnimate} delay={delay} duration={1500} />
        </span>
      </div>
      <div className="h-1.5 bg-borderPlatformStats/30 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── GitHub Contribution Heatmap (Miniature) ────────────────
function MiniHeatmap({
  contributions,
  shouldAnimate = false,
}: {
  contributions: { date: string; count: number; level: number }[];
  shouldAnimate?: boolean;
}) {
  // Get last 20 weeks of data (140 days)
  const recentContributions = contributions
    .filter((c) => {
      const d = new Date(c.date);
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 140;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const levelColors = [
    "bg-borderPlatformStats/20",
    "bg-accent/25",
    "bg-accent/45",
    "bg-accent/70",
    "bg-accent",
  ];

  return (
    <div className="flex gap-[3px] flex-wrap justify-start">
      {recentContributions.map((day, i) => (
        <motion.div
          key={day.date}
          className={`w-[13px] h-[13px] rounded-[2px] ${levelColors[day.level]} cursor-default hover:ring-1 hover:ring-accent/50 transition-all duration-100`}
          initial={shouldAnimate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.15,
            delay: shouldAnimate ? 0.8 + i * 0.003 : 0,
            ease: "easeOut",
          }}
          title={`${day.date}: ${day.count} contributions`}
        />
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────
const CodingStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeData | null>(null);
  const [contributions, setContributions] = useState<
    { date: string; count: number; level: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [ghContribRes, ghProfileRes, lcRes] = await Promise.allSettled([
        fetch("https://github-contributions-api.jogruber.de/v4/gouravmalviya445"),
        fetch("https://api.github.com/users/gouravmalviya445"),
        fetch("https://alfa-leetcode-api.onrender.com/gouravmalviya445/solved"),
      ]);

      // GitHub contributions
      if (ghContribRes.status === "fulfilled" && ghContribRes.value.ok) {
        const ghContrib = await ghContribRes.value.json();
        const totals = ghContrib.total as Record<string, number>;
        const totalContributions = Object.values(totals).reduce(
          (sum: number, val: number) => sum + val,
          0
        );

        let publicRepos = 39; // fallback
        if (ghProfileRes.status === "fulfilled" && ghProfileRes.value.ok) {
          const profile = await ghProfileRes.value.json();
          publicRepos = profile.public_repos;
        }

        setGithubData({
          totalContributions,
          publicRepos,
          contributionsByYear: totals,
        });
        setContributions(ghContrib.contributions || []);
      }

      // LeetCode
      if (lcRes.status === "fulfilled" && lcRes.value.ok) {
        const lc = await lcRes.value.json();
        const totalSubmissions =
          lc.acSubmissionNum?.find((s: any) => s.difficulty === "All")?.submissions || 0;
        const totalAttempts =
          lc.totalSubmissionNum?.find((s: any) => s.difficulty === "All")?.submissions || 0;

        setLeetcodeData({
          totalSolved: lc.solvedProblem,
          easySolved: lc.easySolved,
          mediumSolved: lc.mediumSolved,
          hardSolved: lc.hardSolved,
          totalSubmissions,
          acceptanceRate: totalAttempts > 0 ? Math.round((totalSubmissions / totalAttempts) * 100) : 0,
        });
      }
    } catch (err) {
      setError("Failed to load stats");
      console.error("Stats fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Fallback data if APIs fail
  const gh = githubData || { totalContributions: 594, publicRepos: 39, contributionsByYear: {} };
  const lc = leetcodeData || {
    totalSolved: 198,
    easySolved: 94,
    mediumSolved: 96,
    hardSolved: 8,
    totalSubmissions: 422,
    acceptanceRate: 62,
  };

  return (
    <section
      id="stats"
      className="py-20 md:py-28 bg-whiteSec border-t border-borderClr"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-14"
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
            02 / CODING ACTIVITY
          </motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-heading font-black text-primary uppercase mt-4 tracking-tight leading-none">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: easeOutExpo as unknown as Easing[],
                }}
              >
                Platform Stats
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-secondary max-w-xl mt-5 text-sm leading-relaxed font-sans"
          >
            Real-time statistics from GitHub and LeetCode — tracking contributions,
            problem-solving progress, and coding consistency.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 },
            },
          }}
        >
          {/* ── GitHub Card ── */}
          <motion.div
            variants={staggerItem}
            className="relative bg-bg border border-borderClr rounded-xs p-8 md:p-10 group overflow-hidden"
            whileHover={{
              y: -4,
              borderColor: "rgba(183, 110, 77, 0.5)",
              boxShadow: "0 16px 48px rgba(183, 110, 77, 0.10)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 h-px bg-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: easeOutExpo as unknown as Easing[],
              }}
            />

            {/* Subtle hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/3 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-xs border border-borderClr bg-whiteSec flex items-center justify-center text-primary group-hover:bg-[#151515] group-hover:text-whiteSec group-hover:border-[#151515] transition-all duration-350"
                  whileHover={{ scale: 1.05 }}
                >
                  <BsGithub size={24} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary">GitHub</h3>
                  <span className="text-[11px] text-secondary font-mono">
                    @gouravmalviya445
                  </span>
                </div>
              </div>
              <motion.a
                href="https://github.com/gouravmalviya445"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-secondary border border-borderClr rounded-xs px-2.5 py-1.5 hover:text-accent hover:border-accent/40 transition-all duration-200"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                View Profile
                <ExternalLink size={10} />
              </motion.a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
              <div className="bg-whiteSec border border-borderClr rounded-xs p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitCommit size={14} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    Contributions
                  </span>
                </div>
                <div className="text-4xl font-heading font-black text-primary leading-none">
                  <AnimatedCounter
                    target={gh.totalContributions}
                    suffix="+"
                    shouldAnimate={isInView}
                    delay={500}
                    duration={2000}
                  />
                </div>
              </div>
              <div className="bg-whiteSec border border-borderClr rounded-xs p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FolderGit2 size={14} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    Repositories
                  </span>
                </div>
                <div className="text-4xl font-heading font-black text-primary leading-none">
                  <AnimatedCounter
                    target={gh.publicRepos}
                    suffix="+"
                    shouldAnimate={isInView}
                    delay={700}
                    duration={1500}
                  />
                </div>
              </div>
            </div>

            {/* Contribution Heatmap */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame size={14} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">
                    Recent Activity
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-muted">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-[10px] h-[10px] rounded-[2px] ${level === 0
                          ? "bg-borderClr/20"
                          : level === 1
                            ? "bg-accent/25"
                            : level === 2
                              ? "bg-accent/45"
                              : level === 3
                                ? "bg-accent/70"
                                : "bg-accent"
                        }`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
              {contributions.length > 0 ? (
                <MiniHeatmap contributions={contributions} shouldAnimate={isInView} />
              ) : (
                <div className="h-20 flex items-center justify-center text-xs text-muted">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                      Loading activity...
                    </span>
                  ) : (
                    "Activity data unavailable"
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── LeetCode Card ── */}
          <motion.div
            variants={staggerItem}
            className="relative bg-bg border border-borderClr rounded-xs p-8 md:p-10 group overflow-hidden"
            whileHover={{
              y: -4,
              borderColor: "rgba(255, 161, 22, 0.4)",
              boxShadow: "0 16px 48px rgba(255, 161, 22, 0.08)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 h-px bg-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: easeOutExpo as unknown as Easing[],
              }}
            />

            {/* Subtle hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/3 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-xs border border-borderClr bg-whiteSec flex items-center justify-center text-[#FFA116] group-hover:bg-[#FFA116] group-hover:text-whiteSec group-hover:border-[#FFA116] transition-all duration-350"
                  whileHover={{ scale: 1.05 }}
                >
                  <SiLeetcode size={24} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary">LeetCode</h3>
                  <span className="text-[11px] text-secondary font-mono">
                    @gouravmalviya445
                  </span>
                </div>
              </div>
              <motion.a
                href="https://leetcode.com/u/gouravmalviya445"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFA116] border border-[#FFA116]/30 rounded-xs px-2.5 py-1.5 hover:bg-[#FFA116] hover:text-whiteSec hover:border-[#FFA116] transition-all duration-200"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                View Profile
                <ExternalLink size={10} />
              </motion.a>
            </div>

            {/* Total Solved - Hero Stat */}
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="relative flex-shrink-0">
                <ProgressRing
                  percentage={Math.round((lc.totalSolved / 3500) * 100)}
                  size={80}
                  strokeWidth={5}
                  color="#B76E4D"
                  delay={600}
                  shouldAnimate={isInView}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy size={20} className="text-accent" />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                  Problems Solved
                </div>
                <div className="text-5xl font-heading font-black text-primary leading-none">
                  <AnimatedCounter
                    target={lc.totalSolved}
                    shouldAnimate={isInView}
                    delay={500}
                    duration={2000}
                  />
                </div>
                <div className="text-[11px] text-muted font-mono mt-0.5">
                  out of ~3500 problems
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="space-y-4 mb-8 relative z-10">
              <DifficultyBar
                label="Easy"
                solved={lc.easySolved}
                total={lc.totalSolved}
                color="#28c840"
                delay={800}
                shouldAnimate={isInView}
              />
              <DifficultyBar
                label="Medium"
                solved={lc.mediumSolved}
                total={lc.totalSolved}
                color="#FFA116"
                delay={1000}
                shouldAnimate={isInView}
              />
              <DifficultyBar
                label="Hard"
                solved={lc.hardSolved}
                total={lc.totalSolved}
                color="#FF375F"
                delay={1200}
                shouldAnimate={isInView}
              />
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="flex items-center gap-3 bg-whiteSec border border-borderClr rounded-xs px-4 py-3">
                <Target size={14} className="text-accent flex-shrink-0" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted block">
                    Acceptance
                  </span>
                  <span className="text-sm font-mono font-bold text-primary">
                    <AnimatedCounter
                      target={lc.acceptanceRate}
                      suffix="%"
                      shouldAnimate={isInView}
                      delay={1400}
                      duration={1500}
                    />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-whiteSec border border-borderClr rounded-xs px-4 py-3">
                <Zap size={14} className="text-accent flex-shrink-0" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted block">
                    Submissions
                  </span>
                  <span className="text-sm font-mono font-bold text-primary">
                    <AnimatedCounter
                      target={lc.totalSubmissions}
                      suffix="+"
                      shouldAnimate={isInView}
                      delay={1400}
                      duration={1500}
                    />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingStats;
