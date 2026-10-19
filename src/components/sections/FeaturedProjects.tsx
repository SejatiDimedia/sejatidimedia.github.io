import React from "react";
import Image from "next/image";
import { Locale, Project } from "@/types/portfolio";
import { getDictionary, getLocalized } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { NdaBadge } from "@/components/ui/NdaBadge";

interface FeaturedProjectsProps {
  locale: Locale;
  projects: Project[];
}

export function FeaturedProjects({ locale, projects }: FeaturedProjectsProps) {
  const dict = getDictionary(locale);

  return (
    <section id="projects" className="py-20 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {dict.projects.featuredTitle}
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              {dict.projects.featuredSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-16">
          {projects.map((project, idx) => {
            const localizedTitle = getLocalized(project, "title", locale);
            const localizedCategory = getLocalized(project, "category", locale);
            const localizedSummary = getLocalized(project, "summary", locale);

            return (
              <Reveal key={project.id || project.slug} delay={0.08 * (idx % 3)}>
                <article className="group relative rounded-2xl border border-border/80 bg-surface/80 p-6 md:p-8 backdrop-blur-xs transition-all hover:border-cobalt/40 hover:shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Visual Media */}
                    <div className="lg:col-span-7 overflow-hidden rounded-xl border border-border/60 bg-canvas-subtle relative aspect-16/10">
                      {project.thumbnailUrl ? (
                        <Image
                          src={project.thumbnailUrl}
                          alt={localizedTitle}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-ink-muted font-mono text-sm">
                          {localizedCategory}
                        </div>
                      )}

                      {/* NDA Overlay Badge on Image */}
                      {project.isNda && (
                        <div className="absolute top-3 right-3 z-10">
                          <NdaBadge label={dict.projects.ndaBadge} />
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-xs font-mono font-medium uppercase tracking-wider text-cobalt">
                            {localizedCategory}
                          </span>
                          {project.isNda && (
                            <span className="lg:hidden">
                              <NdaBadge label={dict.projects.ndaBadge} />
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-2xl font-bold tracking-tight text-ink group-hover:text-cobalt transition-colors">
                          {localizedTitle}
                        </h3>

                        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                          {localizedSummary}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-canvas-subtle text-ink-muted border border-border/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links / NDA Notification */}
                      <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-4 text-xs font-medium">
                        {project.isNda ? (
                          <div className="flex items-center gap-2 text-ink-muted italic">
                            <span className="icon-[lucide--shield-alert] size-4 inline-block text-amber-500 shrink-0" />
                            <span>{dict.projects.ndaExplanation}</span>
                          </div>
                        ) : (
                          <>
                            {project.projectUrl && (
                              <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cobalt text-white hover:bg-cobalt-hover transition-colors font-medium focus-visible:outline-2 focus-visible:outline-cobalt"
                              >
                                <span>{dict.projects.liveDemo}</span>
                                <span className="icon-[lucide--external-link] size-3.5 inline-block" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-surface text-ink hover:text-cobalt hover:border-cobalt/40 transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
                              >
                                <span className="icon-[lucide--github] size-3.5 inline-block" />
                                <span>{dict.projects.viewCode}</span>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
