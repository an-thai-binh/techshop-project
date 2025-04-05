import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/component/Header";
import Footer from "@/shared/component/Footer";
import { UIProvider } from "@/shared/context/UIContext";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techshop App",
  description: "Techshop App with Technologies Production",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-full`}>
          <div className="flex flex-col w-full overflow-auto scrollbar-corner-inherit scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-950">
            <UIProvider>
              <Header />
              <main className="flex-grow bg-gray-950">{children}</main>
              <Footer />
            </UIProvider>
          </div>
      </body>
    </html>
  );
}
