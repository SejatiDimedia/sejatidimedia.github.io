import React from "react";
import { Locale } from "@/types/portfolio";
import { LOCALES } from "@/lib/i18n";
import { getPortfolioData } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "id";
  const data = await getPortfolioData();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale={locale} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} profile={data.profile} />
    </div>
  );
}
