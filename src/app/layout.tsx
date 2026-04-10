import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// @ts-ignore - Next.js handles CSS imports
import "./globals.css";
import LenisProvider from "@/utils/LenisProvider";
import Snowfall from "@/components/ui/HeroSectionElement/Snowfall";
// 🤖 Step 1: Import the O.T.T.O Unit
import Chatbot from "@/components/ui/Chatbot"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clashClan = localFont({
  src: [
    {
      path: "../../public/Clash_Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-clashclan", 
});

export const metadata: Metadata = {
  title: "Hack Horizon 2.0 | Where Innovation Meets Reality",
  description: "A 24-hour hackathon by School of Engineering & IT, ARKA JAIN University × GDG On Campus AJU | Feb 16-17, 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashClan.variable} antialiased`}
      >
        <Snowfall />
        <LenisProvider>
          {children}
        </LenisProvider>

        {/* 🤖 Step 2: Drop O.T.T.O Unit at the bottom of the body */}
        <Chatbot />
      </body>
    </html>
  );
}