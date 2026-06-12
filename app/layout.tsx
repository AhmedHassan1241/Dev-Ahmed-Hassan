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
  title: "Ahmed Hassan | PHP / Laravel Back-End Developer",
  description:
    "Back-End Developer specializing in PHP, Laravel, and MySQL. Building scalable, clean, and maintainable APIs and web applications.",
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
    title: "Ahmed Hassan | PHP / Laravel Back-End Developer",
    description:
      "Back-End Developer specializing in PHP, Laravel, and MySQL. Building clean, scalable APIs.",
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
