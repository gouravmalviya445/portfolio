
import { motion, AnimatePresence } from "framer-motion";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import CodingStats from './components/CodingStats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <AnimatePresence>
        <motion.div
          className="min-h-screen bg-bg text-primary font-sans selection:bg-accent/20 selection:text-accentHover relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Noise grain overlay */}
          <div className="noise-overlay" />

          {/* Atmospheric ambient light */}
          <div className="atmosphere" />

          <CustomCursor />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <Education />
            <CodingStats />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </SmoothScroll>
  );
};

export default App;
