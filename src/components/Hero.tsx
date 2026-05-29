
import {
  ArrowRight,
} from 'lucide-react';

import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiLeetcode } from 'react-icons/si';
import { TfiEmail } from 'react-icons/tfi';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Open for collaborations</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            Gourav <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Malviya</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
            Full-stack developer with strong backend expertise, building production-grade systems using <span className="text-white font-medium">Go, Node.js, and PostgreSQL</span>. 
            Focused on performance, security, and scalability.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#projects" className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1">
              View My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a href="#contact" className="bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 border border-neutral-700">
              Get In Touch
            </a>
          </div>

          <div className="flex items-center space-x-6 text-neutral-500">
            <a href="https://github.com/gouravmalviya445" target="_blank" className="hover:text-white transition-colors"><BsGithub size={24} /></a>
            <a href="https://linkedin.com/in/gouravmalviya" target="_blank" className="hover:text-white transition-colors"><BsLinkedin size={24} /></a>
            <a href="mailto:gouravmalviya445@gmail.com" className="hover:text-white transition-colors"><TfiEmail size={24} /></a>
            <a href='https://leetcode.com/u/gouravmalviya445' target="_blank" className="hover:text-white transition-colors"><SiLeetcode size={24}/></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
