import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientLayoutShell from "../components/ClientLayoutShell";

export const metadata: Metadata = {
  title: "TokenAnalyzer | Crypto Insights",
  description: "Real-time token analysis and security insights",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
      >
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}