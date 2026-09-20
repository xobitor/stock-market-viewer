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
  title: "Stock Market Viewer",
  description: "Real-time stock market visualizer with interactive charts and data",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b bg-card">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              <span className="text-primary">📈</span> Stock Market Viewer
            </div>
            <div className="flex gap-4">
              <a href="/" className="text-sm hover:underline">Dashboard</a>
            </div>
          </nav>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t py-4 text-center text-sm">
          © 2024 Stock Market Viewer. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
