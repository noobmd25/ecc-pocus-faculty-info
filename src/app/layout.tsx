import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Libre_Baskerville,
  Noto_Serif,
  Open_Sans,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${notoSerif.variable} ${libreBaskerville.variable} ${jetbrainsMono.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
