import { PROJECTS, ICON_MAP } from "../constants";
import { ExternalLink, Code, CheckCircle2 } from "lucide-react";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-neutral-500 max-w-xl">
              Selection of my recent work involving microservices, AI
              integration, and real-time communication systems.
            </p>
          </div>
          <a
            href="https://github.com/gouravmalviya445"
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2 transition-colors"
          >
            View All Projects on GitHub <ICON_MAP.ExternalLink size={18} />
          </a>
        </div>

        <div className="space-y-20">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.title}
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group cursor-pointer overflow-hidden rounded-3xl border border-neutral-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-[400px] object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 mb-10">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-indigo-500 mt-1 flex-shrink-0"
                      />
                      <span className="text-neutral-300 leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {project.links.code?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all text-sm font-semibold"
                    >
                      <Code size={18} />
                      {link.label}
                    </a>
                  ))}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-sm font-semibold"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
