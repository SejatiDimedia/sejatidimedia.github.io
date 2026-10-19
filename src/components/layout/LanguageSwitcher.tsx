"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/types/portfolio";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname() || "";
  const targetLocale: Locale = currentLocale === "id" ? "en" : "id";

  // Replace active /id/ or /en/ prefix in current path
  const targetPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`;

  return (
    <div className="flex items-center gap-1 p-0.5 rounded-full border border-border bg-surface text-xs font-medium">
      <Link
        href={currentLocale === "id" ? pathname : targetPath}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          currentLocale === "id"
            ? "bg-cobalt text-white font-semibold shadow-xs"
            : "text-ink-muted hover:text-ink"
        }`}
        aria-label="Bahasa Indonesia"
      >
        ID
      </Link>
      <Link
        href={currentLocale === "en" ? pathname : targetPath}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          currentLocale === "en"
            ? "bg-cobalt text-white font-semibold shadow-xs"
            : "text-ink-muted hover:text-ink"
        }`}
        aria-label="English"
      >
        EN
      </Link>
    </div>
  );
}
