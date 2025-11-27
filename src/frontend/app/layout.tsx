import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/lib/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultrafit Lab - Seu Personal Trainer Digital",
  description:
    "Planos personalizados de treino e nutrição com tecnologia avançada para alcançar seus objetivos.",
  keywords: [
    "fitness",
    "treino",
    "nutrição",
    "smart training",
    "personal trainer",
  ],
  authors: [{ name: "Ultrafit Lab" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ultrafit-lab.vercel.app",
    title: "Ultrafit Lab - Seu Personal Trainer Digital",
    description:
      "Planos personalizados de treino e nutrição com tecnologia avançada para alcançar seus objetivos.",
    siteName: "Ultrafit Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultrafit Lab",
    description: "Planos personalizados de treino e nutrição com IA",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Pular para o conteúdo principal
        </a>
        <Providers>
          <main id="main-content">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
