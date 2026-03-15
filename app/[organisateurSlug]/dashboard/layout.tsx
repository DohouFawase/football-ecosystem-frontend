import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import SideBar from "@/components/ui/sidebar/SideBar";
import Header from "@/components/ui/sidebar/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fucture Hub | Next Gen Dashboard",
  description: "Advanced Sports Management Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-slate-900 overflow-hidden`}
      >
          {/* BACKGROUND LAYERS : On utilise Tailwind brut pour éviter styled-jsx */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-green-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
          </div>

          <div className="flex h-screen w-full overflow-hidden">
            {/* SIDEBAR : Elle gère son propre état client en interne */}
            <SideBar />

            {/* MAIN WRAPPER */}
            <div className="flex-1 flex flex-col min-w-0 relative">
              <Header />

              {/* ZONE DE CONTENU DYNAMIQUE */}
              <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-12 custom-scrollbar">
                <div className="max-w-[1600px] mx-auto mt-6">
                  {/* Animation via Tailwind CSS classes au lieu de styled-jsx */}
                  <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
      </body>
    </html>
  );
}