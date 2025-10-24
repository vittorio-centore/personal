import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";
import CursorFollower from "@/components/CursorFollower";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vittorio - CS Student & AI Developer",
  description: "Portfolio of Vittorio, Computer Science student at University of Michigan building AI-powered experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased cursor-none md:cursor-none">
        <ThemeProvider>
          <CursorFollower />
          <div className="min-h-screen gradient-bg flex flex-col">
            <Navigation />
            <main className="pt-20 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

