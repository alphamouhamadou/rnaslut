import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "RN-ASLUT — Réseau National de Lutte contre la Tuberculose au Sénégal",
  description: "RN-ASLUT - Réseau National des Associations de Lutte contre la Tuberculose au Sénégal. Ensemble contre la tuberculose depuis 2005.",
  keywords: ["tuberculose", "TB", "Sénégal", "RN-ASLUT", "santé", "association", "lutte", "sensibilisation"],
  icons: { icon: "/img/logo-officiel.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}