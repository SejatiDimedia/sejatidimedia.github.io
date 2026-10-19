"use client";

import React, { useRef } from "react";
import { Experience, Locale } from "@/types/portfolio";
import { getDictionary, getLocalized, getLocalizedArray } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollProgressLine } from "@/components/motion/ScrollProgressLine";

interface ExperiencesProps {
  locale: Locale;
  experiences: Experience[];
}

export function Experiences({ locale, experiences }: ExperiencesProps) {
  const dict = getDictionary(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-20 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {dict.experience.title}
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              {dict.experience.subtitle}
            </p>
          </div>
        </Reveal>

        <div ref={containerRef} className="relative mt-14 pl-8 md:pl-12">
          {/* Animated vertical scroll line */}
          <ScrollProgressLine containerRef={containerRef} />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const localizedPosition = getLocalized(exp, "position", locale);
              const localizedHighlights = getLocalizedArray(exp, "highlights", locale);
              const dateRange = exp.endDate
                ? `${exp.startDate} – ${exp.endDate}`
                : `${exp.startDate} – ${dict.experience.present}`;

              return (
                <div key={exp.id || idx} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-8 md:-left-12 top-1.5 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full border-2 border-cobalt bg-canvas flex items-center justify-center transition-transform group-hover:scale-125">
                      <div className="h-2 w-2 rounded-full bg-cobalt" />
                    </div>
                  </div>

                  <Reveal delay={0.06 * idx}>
                    <div className="rounded-xl border border-border/70 bg-surface/70 p-6 md:p-8 backdrop-blur-xs transition-colors hover:border-cobalt/40 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                        <h3 className="font-serif text-xl font-bold text-ink">
                          {localizedPosition}
                        </h3>
                        <span className="text-xs font-mono font-medium text-cobalt shrink-0">
                          {dateRange}
                        </span>
                      </div>

                      <div className="text-sm font-medium text-ink-muted flex items-center gap-2 mb-4">
                        <span className="text-ink">{exp.company}</span>
                        <span>&bull;</span>
                        <span>{exp.location}</span>
                        {exp.isCurrent && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {dict.experience.present}
                          </span>
                        )}
                      </div>

                      <ul className="space-y-2.5 text-sm text-ink-muted">
                        {localizedHighlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cobalt shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
