import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";

export const metadata: Metadata = {
  title: "Timur Dian Radha Sejati — Fullstack Software Engineer",
  description:
    "Personal portfolio of Timur Dian Radha Sejati: Fullstack Software Engineer and Web Architect showcasing featured enterprise projects, work experience, technical skills, and certifications.",
  keywords: [
    "Timur Dian Radha Sejati",
    "Software Engineer",
    "Web Architect",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "SejatiDimedia",
  ],
  authors: [{ name: "Timur Dian Radha Sejati" }],
  metadataBase: new URL("https://timurdian.github.io"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    siteName: "Timur Dian Radha Sejati Portfolio",
    title: "Timur Dian Radha Sejati — Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer and Web Architect showcasing high-impact projects, experiences, and technical skills.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-canvas text-ink antialiased selection:bg-cobalt selection:text-white">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
