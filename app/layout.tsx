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
  title: "Ahmed Hassan | Mid-Level PHP Backend Developer",
  description:
    "Backend Developer with 2 years of experience building scalable, production-ready systems, specialized in RESTful APIs, real-time architecture, and multi-tenant SaaS platforms.",
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
    title: "Ahmed Hassan | Mid-Level PHP Backend Developer",
    description:
      "Backend Developer with 2 years of experience building scalable, production-ready systems, specialized in RESTful APIs, real-time architecture, and multi-tenant SaaS platforms.",
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
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} font-sans bg-[#050d1a] text-slate-100 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
