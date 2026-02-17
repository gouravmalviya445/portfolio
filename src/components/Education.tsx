
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const Education: React.FC = () => {
  const coursework = [
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks"
  ];

  return (
    <section id="about" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Education</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-indigo-500/50 transition-colors group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Application (BCA)</h3>
                  <p className="text-indigo-400 font-medium mb-4">Modi Institute Of Management & Technology</p>
                  
                  <div className="flex items-center gap-6 text-neutral-400 text-sm mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      Aug 2023 – June 2026
                    </span>
                    <span className="bg-neutral-800 px-3 py-1 rounded-full text-indigo-300 text-xs border border-neutral-700">
                      Expected June 2026
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3 text-white font-semibold">
                      <BookOpen size={18} className="text-indigo-500" />
                      Relevant Coursework
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {coursework.map(course => (
                        <span key={course} className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-sm border border-neutral-700">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
