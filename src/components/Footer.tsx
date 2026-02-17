
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <a href="#" className="text-2xl font-bold text-white mono mb-2 block">GM.dev</a>
            <p className="text-neutral-500 max-w-xs">
              Specialized in crafting scalable, secure, and performant digital experiences.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/gouravmalviya445" className="p-3 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"><Github size={20} /></a>
            <a href="https://linkedin.com/in/gouravmalviya" className="p-3 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"><Linkedin size={20} /></a>
            <a href="mailto:gouravmalviya445@gmail.com" className="p-3 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"><Mail size={20} /></a>
          </div>

          <button 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-indigo-600/10 text-indigo-500 hover:bg-indigo-600 hover:text-white transition-all group"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-sm">
          <p>© {new Date().getFullYear()} Gourav Malviya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
