import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import BottomNav from "@/components/BottomNav";
import QueryProvider from "@/providers/QueryProvider";
import { MSWProvider } from "@/providers/MSWProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRO1X — Pronostics Premium",
  description: "Une équipe de parieurs professionnels, armée d'outils IA de dernière génération, analyse et publie chaque jour des pronostics premium.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-[100dvh] flex-col bg-surface font-sans text-secondary-800 antialiased">
        <MSWProvider>
          <QueryProvider>
            <main className="flex-1 pb-24">{children}</main>
            <BottomNav />
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
