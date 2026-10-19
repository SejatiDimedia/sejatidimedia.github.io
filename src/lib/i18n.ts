import { Locale } from "@/types/portfolio";

export const LOCALES: Locale[] = ["id", "en"];
export const DEFAULT_LOCALE: Locale = "id";

export interface Dictionary {
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    certificates: string;
    contact: string;
  };
  hero: {
    greeting: string;
    contactBtn: string;
    projectsBtn: string;
    availableBadge: string;
  };
  projects: {
    featuredTitle: string;
    featuredSubtitle: string;
    otherTitle: string;
    otherSubtitle: string;
    viewCode: string;
    liveDemo: string;
    ndaBadge: string;
    ndaExplanation: string;
    stackLabel: string;
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      cloud: string;
      tools: string;
    };
  };
  certificates: {
    title: string;
    subtitle: string;
    issuedOn: string;
    credentialId: string;
    verifyLink: string;
  };
  footer: {
    builtWith: string;
    allRightsReserved: string;
    backToTop: string;
  };
  common: {
    switchLanguage: string;
    skipToContent: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    nav: {
      about: "Tentang",
      projects: "Proyek",
      experience: "Pengalaman",
      skills: "Keahlian",
      certificates: "Sertifikat",
      contact: "Kontak",
    },
    hero: {
      greeting: "Halo, saya",
      contactBtn: "Hubungi Saya",
      projectsBtn: "Lihat Karya",
      availableBadge: "Tersedia untuk proyek & peluang baru",
    },
    projects: {
      featuredTitle: "Proyek Unggulan",
      featuredSubtitle:
        "Koleksi terpilih dari proyek skala enterprise, platform agency SejatiDimedia, dan arsitektur web modern.",
      otherTitle: "Eksplorasi & Proyek Lainnya",
      otherSubtitle:
        "Kumpulan proyek open-source, alat pengembang, dan microservices mandiri.",
      viewCode: "Sumber Kode",
      liveDemo: "Lihat Demo",
      ndaBadge: "Terikat NDA",
      ndaExplanation:
        "Detail teknis dan repositori dibatasi untuk mematuhi perjanjian kerahasiaan klien.",
      stackLabel: "Teknologi",
    },
    experience: {
      title: "Jejak Pengalaman",
      subtitle:
        "Perjalanan profesional merancang, membangun, dan mengoptimalkan sistem digital berskala tinggi.",
      present: "Saat Ini",
    },
    skills: {
      title: "Keahlian & Domain Teknis",
      subtitle:
        "Kombinasi teknologi frontend, backend berkinerja tinggi, dan otomatisasi infrastruktur cloud.",
      categories: {
        frontend: "Frontend & Antarmuka",
        backend: "Backend & Basis Data",
        cloud: "Cloud & DevOps",
        tools: "Sistem & Alur Kerja",
      },
    },
    certificates: {
      title: "Sertifikasi & Kredensial",
      subtitle:
        "Validasi keahlian industri yang terverifikasi dalam arsitektur cloud dan pengembangan perangkat lunak.",
      issuedOn: "Diterbitkan",
      credentialId: "ID Kredensial",
      verifyLink: "Verifikasi Kredensial",
    },
    footer: {
      builtWith: "Dibangun dengan Next.js statis, Tailwind CSS, & Framer Motion.",
      allRightsReserved: "Hak cipta dilindungi undang-undang.",
      backToTop: "Kembali ke Atas",
    },
    common: {
      switchLanguage: "Ganti ke Bahasa Inggris (Switch to English)",
      skipToContent: "Langsung ke konten utama",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      certificates: "Certificates",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I am",
      contactBtn: "Get in Touch",
      projectsBtn: "View Work",
      availableBadge: "Available for new projects & opportunities",
    },
    projects: {
      featuredTitle: "Featured Projects",
      featuredSubtitle:
        "Selected high-impact enterprise initiatives, SejatiDimedia agency systems, and modern web architectures.",
      otherTitle: "Selected Other Work",
      otherSubtitle:
        "A collection of open-source utilities, developer tooling, and standalone microservices.",
      viewCode: "Source Code",
      liveDemo: "Live Preview",
      ndaBadge: "NDA Protected",
      ndaExplanation:
        "Technical details and code repositories are restricted to comply with client confidentiality agreements.",
      stackLabel: "Technologies",
    },
    experience: {
      title: "Work Experience",
      subtitle:
        "Professional career building, scaling, and architecting resilient digital applications.",
      present: "Present",
    },
    skills: {
      title: "Skills & Technical Stack",
      subtitle:
        "Proficiency across modern frontend ecosystems, robust backend systems, and automated cloud workflows.",
      categories: {
        frontend: "Frontend & Interface",
        backend: "Backend & Databases",
        cloud: "Cloud & DevOps",
        tools: "Systems & Tooling",
      },
    },
    certificates: {
      title: "Certificates & Credentials",
      subtitle:
        "Industry-recognized certifications in cloud architecture and professional software engineering.",
      issuedOn: "Issued",
      credentialId: "Credential ID",
      verifyLink: "Verify Credential",
    },
    footer: {
      builtWith: "Crafted with static Next.js, Tailwind CSS, & Framer Motion.",
      allRightsReserved: "All rights reserved.",
      backToTop: "Back to Top",
    },
    common: {
      switchLanguage: "Beralih ke Bahasa Indonesia",
      skipToContent: "Skip to main content",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

/**
 * Returns localized string based on active locale with graceful fallbacks:
 * 1. Active locale field (e.g., summaryId or summaryEn)
 * 2. Alternate locale field
 * 3. Default generic field (e.g., summary)
 */
export function getLocalized<T extends object>(
  item: T,
  field: string,
  locale: Locale
): string {
  const idKey = `${field}Id`;
  const enKey = `${field}En`;

  const itemRecord = item as Record<string, unknown>;

  if (locale === "id") {
    return (
      (itemRecord[idKey] as string) ||
      (itemRecord[enKey] as string) ||
      (itemRecord[field] as string) ||
      ""
    );
  } else {
    return (
      (itemRecord[enKey] as string) ||
      (itemRecord[idKey] as string) ||
      (itemRecord[field] as string) ||
      ""
    );
  }
}

/**
 * Returns localized array of strings (e.g. highlights)
 */
export function getLocalizedArray<T extends object>(
  item: T,
  field: string,
  locale: Locale
): string[] {
  const idKey = `${field}Id`;
  const enKey = `${field}En`;

  const itemRecord = item as Record<string, unknown>;

  if (locale === "id") {
    return (
      (itemRecord[idKey] as string[]) ||
      (itemRecord[enKey] as string[]) ||
      (itemRecord[field] as string[]) ||
      []
    );
  } else {
    return (
      (itemRecord[enKey] as string[]) ||
      (itemRecord[idKey] as string[]) ||
      (itemRecord[field] as string[]) ||
      []
    );
  }
}
