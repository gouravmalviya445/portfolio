
import { SKILL_GROUPS, ICON_MAP } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            A comprehensive list of technologies and concepts I've mastered to build modern, production-grade applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => {
            const Icon = ICON_MAP[group.icon];
            return (
              <div key={group.category} className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 group">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 mb-6 group-hover:text-indigo-400 transition-colors">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-white group-hover:text-indigo-300 transition-colors">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-lg bg-neutral-800/50 text-neutral-400 text-sm border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
