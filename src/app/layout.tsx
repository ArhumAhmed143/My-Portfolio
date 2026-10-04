import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ghulam Ahmed | Software Department Intern @ Revive Medical Technologies | Full-Stack & Automation",
  description:
    "Portfolio of Ghulam Ahmed — Software Department Intern at Revive Medical Technologies, building scalable web applications, automation systems & AI-powered solutions.",
  keywords: [
    "Ghulam Ahmed",
    "Revive Medical Technologies",
    "Software Department Intern",
    "Software Automation",
    "Full-Stack Developer",
    "Software Engineer",
    "Automation Engineer",
    "AI Developer",
    "Render",
    "Brevo",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Ghulam Ahmed" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#0f0f23] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
