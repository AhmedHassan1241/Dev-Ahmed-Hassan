import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Ahmed Hassan | Mid-Level PHP/Laravel Backend Developer",
  description:
    "PHP/Laravel Backend Developer with 2 years experience building scalable, production-ready systems. Specialized in RESTful APIs, real-time features, and multi-tenant SaaS architecture.",
  keywords: [
    "PHP developer",
    "Laravel developer",
    "Back-End developer",
    "Ahmed Hassan",
    "MySQL developer",
    "RESTful API",
    "Egypt developer",
  ],
  authors: [{ name: "Ahmed Hassan" }],
  openGraph: {
    title: "Ahmed Hassan | Mid-Level PHP/Laravel Backend Developer",
    description:
      "PHP/Laravel Backend Developer with 2 years experience building scalable, production-ready systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#050d1a] text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
