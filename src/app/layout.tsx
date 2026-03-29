import type { Metadata } from "next";
import BackgroundTerminal from "@/components/BackgroundTerminal";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Herrera | Vibe-Coder & Chef",
  description: "Curaduría digital y gastronómica desde Medellín.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="relative antialiased bg-black selection:bg-lime-400 selection:text-black" suppressHydrationWarning>
        <BackgroundTerminal />
        <div className="grain-overlay grain-overlay-animate" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
