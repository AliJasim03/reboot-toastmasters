// src/app/layout.tsx - THE FINAL, CORRECTED VERSION

import type { Metadata } from "next";
import { Montserrat, Source_Sans_3, Corinthia, Luxurious_Script } from "next/font/google";
import "./globals.css";

// Configure all fonts with the 'variable' option. This is essential.
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-source-sans-3' });
const corinthia = Corinthia({ subsets: ["latin"], weight: '700', variable: '--font-corinthia' });
const luxuriousScript = Luxurious_Script({ subsets: ["latin"], weight: '400', variable: '--font-luxurious-script' });

export const metadata: Metadata = {
  title: "Reboot Toastmasters",
  description: "Where Leaders Are Made",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    {/*
        This is the magic link:
        1. We spread all the variable-defining classes from next/font onto the body.
           This injects the @font-face rules and defines --font-montserrat, etc.
        2. We apply `font-body` as a utility class, which we defined in globals.css.
           This sets the default font-family to var(--font-source-sans-3).
      */}
    <body className={`${montserrat.variable} ${sourceSans3.variable} ${corinthia.variable} ${luxuriousScript.variable} font-body antialiased`}>
    {children}
    </body>
    </html>
  );
}