import React from "react";
import { Locale, Profile } from "@/types/portfolio";
import { getDictionary, getLocalized } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  profile: Profile;
}

export function Footer({ locale, profile }: FooterProps) {
  const dict = getDictionary(locale);
  const localizedRole = getLocalized(profile, "role", locale);

  return (
    <footer id="contact" className="border-t border-border/80 bg-surface/60 py-16 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-ink">
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {localizedRole} &bull; {profile.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cobalt text-white hover:bg-cobalt-hover text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <span className="icon-[lucide--mail] size-4 inline-block" aria-hidden="true" />
              <span>{profile.email}</span>
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center justify-center p-2 rounded-lg border border-border bg-surface text-ink hover:text-cobalt hover:border-cobalt transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <span className="icon-[lucide--github] size-5 inline-block" aria-hidden="true" />
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center justify-center p-2 rounded-lg border border-border bg-surface text-ink hover:text-cobalt hover:border-cobalt transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <span className="icon-[lucide--linkedin] size-5 inline-block" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. {dict.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            <span>{dict.footer.builtWith}</span>
            <a
              href="#"
              className="hover:text-ink transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <span>{dict.footer.backToTop}</span>
              <span className="icon-[lucide--arrow-up] size-3.5 inline-block" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
