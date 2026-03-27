import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Central de Sistemas — Grimaldi",
  description:
    "Hub interno de aplicativos web. Centraliza sistemas internos em uma interface mobile-first.",
  icons: {
    icon: "https://res.cloudinary.com/dbit1mc1v/image/upload/v1752521359/ChatGPT_Image_Jul_14_2025_01_55_26_PM_rlyv4w.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Central de Sistemas",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#094279",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="font-[var(--font-inter)] min-h-dvh">
        {children}
      </body>
    </html>
  );
}
