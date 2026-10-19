import React from "react";
import { Locale, Skill } from "@/types/portfolio";
import { getDictionary } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { SkillBar } from "@/components/motion/SkillBar";

interface SkillsProps {
  locale: Locale;
  skills: Skill[];
}

export function Skills({ locale, skills }: SkillsProps) {
  const dict = getDictionary(locale);

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {dict.skills.title}
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              {dict.skills.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => {
            const categorySkills = skills
              .filter((s) => s.category === category)
              .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

            return (
              <Reveal key={category} delay={0.07 * catIdx}>
                <div className="rounded-xl border border-border/70 bg-surface/70 p-6 md:p-8 backdrop-blur-xs shadow-xs">
                  <h3 className="font-serif text-xl font-bold text-ink mb-6 pb-3 border-b border-border/50 flex items-center justify-between">
                    <span>{category}</span>
                    <span className="text-xs font-mono text-ink-muted font-normal">
                      {categorySkills.length} skills
                    </span>
                  </h3>

                  <div className="space-y-5">
                    {categorySkills.map((skill) => (
                      <div key={skill.id || skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-ink font-medium">{skill.name}</span>
                          <span className="font-mono text-ink-muted">{skill.level}%</span>
                        </div>
                        <SkillBar level={skill.level} />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
