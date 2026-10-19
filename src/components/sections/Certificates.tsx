import React from "react";
import { Certificate, Locale } from "@/types/portfolio";
import { getDictionary } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

interface CertificatesProps {
  locale: Locale;
  certificates: Certificate[];
}

export function Certificates({ locale, certificates }: CertificatesProps) {
  const dict = getDictionary(locale);

  return (
    <section id="certificates" className="py-20 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {dict.certificates.title}
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              {dict.certificates.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <Reveal key={cert.id || cert.title} delay={0.06 * idx}>
              <div className="h-full rounded-xl border border-border/70 bg-surface/70 p-6 flex flex-col justify-between hover:border-cobalt/40 transition-colors shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="p-2 rounded-lg bg-cobalt/10 text-cobalt">
                      <span className="icon-[lucide--award] size-5 inline-block" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-mono text-ink-muted">
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-ink">
                    {cert.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-ink-muted">
                    {cert.issuer}
                  </p>

                  {cert.credentialId && (
                    <p className="mt-3 text-[11px] font-mono text-ink-muted/80">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>

                {cert.credentialUrl && (
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt hover:text-cobalt-hover transition-colors focus-visible:outline-2 focus-visible:outline-cobalt"
                    >
                      <span>{dict.certificates.verifyLink}</span>
                      <span className="icon-[lucide--external-link] size-3.5 inline-block" />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
