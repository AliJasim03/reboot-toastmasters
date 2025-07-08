// Updated src/app/layout.tsx - Clean server component
import type { Metadata } from "next";
import { Montserrat, Source_Sans_3, Corinthia, Luxurious_Script } from "next/font/google";
import "./globals.css";

// Configure all fonts with the 'variable' option
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-source-sans-3' });
const corinthia = Corinthia({ subsets: ["latin"], weight: '700', variable: '--font-corinthia' });
const luxuriousScript = Luxurious_Script({ subsets: ["latin"], weight: '400', variable: '--font-luxurious-script' });

export const metadata: Metadata = {
  title: "Reboot Toastmasters Club",
  description: "Where Leaders Are Made - Join Reboot Toastmasters Club for public speaking, leadership development, and personal growth in a supportive environment.",
  keywords: "toastmasters, public speaking, leadership, communication skills, personal development",
  authors: [{ name: "Reboot Toastmasters Club" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={`${montserrat.variable} ${sourceSans3.variable} ${corinthia.variable} ${luxuriousScript.variable} font-body antialiased bg-fair-gray text-rich-black`}>
    {children}
    </body>
    </html>
  );
}