import React from "react";
import { Locale, Profile } from "@/types/portfolio";
import { getDictionary, getLocalized } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

interface HeroProps {
  locale: Locale;
  profile: Profile;
}

export function Hero({ locale, profile }: HeroProps) {
  const dict = getDictionary(locale);
  const localizedRole = getLocalized(profile, "role", locale);
  const localizedBio = getLocalized(profile, "bio", locale);

  return (
    <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {profile.availableForHire && (
          <Reveal delay={0.05} yOffset={10}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{dict.hero.availableBadge}</span>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1} yOffset={16}>
          <p className="text-sm md:text-base font-mono uppercase tracking-wider text-cobalt font-semibold mb-3">
            {dict.hero.greeting}
          </p>
        </Reveal>

        <Reveal delay={0.15} yOffset={20}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink max-w-3xl leading-[1.1]">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={0.2} yOffset={20}>
          <h2 className="mt-4 text-xl sm:text-2xl font-serif text-ink-muted max-w-2xl font-normal">
            {localizedRole}
          </h2>
        </Reveal>

        <Reveal delay={0.25} yOffset={24}>
          <p className="mt-6 text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed">
            {localizedBio}
          </p>
        </Reveal>

        <Reveal delay={0.3} yOffset={24}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cobalt text-white hover:bg-cobalt-hover font-medium text-sm transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <span className="icon-[lucide--mail] size-4 inline-block" aria-hidden="true" />
              <span>{dict.hero.contactBtn}</span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface text-ink hover:text-cobalt hover:border-cobalt/40 font-medium text-sm transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <span>{dict.hero.projectsBtn}</span>
              <span className="icon-[lucide--arrow-down] size-4 inline-block" aria-hidden="true" />
            </a>

            <div className="flex items-center gap-2 ml-auto sm:ml-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl border border-border bg-surface text-ink hover:text-cobalt hover:border-cobalt/40 transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
              >
                <span className="icon-[lucide--github] size-5 inline-block" aria-hidden="true" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl border border-border bg-surface text-ink hover:text-cobalt hover:border-cobalt/40 transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
              >
                <span className="icon-[lucide--linkedin] size-5 inline-block" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
