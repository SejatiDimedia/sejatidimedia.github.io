import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/types/portfolio";
import { LOCALES, getLocalized } from "@/lib/i18n";
import { getPortfolioData } from "@/lib/api";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { Experiences } from "@/components/sections/Experiences";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "id";
  const data = await getPortfolioData();
  const localizedRole = getLocalized(data.profile, "role", locale);
  const localizedBio = getLocalized(data.profile, "bio", locale);

  const title = `${data.profile.name} — ${localizedRole}`;
  const description = localizedBio;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "id";
  const data = await getPortfolioData();

  return (
    <div className="space-y-0">
      <Hero locale={locale} profile={data.profile} />
      <FeaturedProjects locale={locale} projects={data.featuredProjects} />
      <OtherProjects locale={locale} projects={data.otherProjects} />
      <Experiences locale={locale} experiences={data.experiences} />
      <Skills locale={locale} skills={data.skills} />
      <Certificates locale={locale} certificates={data.certificates} />
    </div>
  );
}
