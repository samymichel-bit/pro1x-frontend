import type { Metadata } from "next";
import "../styles/globals.css";
import BottomNav from "@/components/BottomNav";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "PRO1X — Pronostics Premium",
  description:
    "Une équipe de parieurs professionnels, armée d'outils IA de dernière génération, analyse et publie chaque jour des pronostics premium.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-[100dvh] flex-col bg-surface font-sans text-secondary-800 antialiased">
        <QueryProvider>
          <main className="flex-1 pb-24">{children}</main>
          <BottomNav />
        </QueryProvider>
      </body>
    </html>
  );
}