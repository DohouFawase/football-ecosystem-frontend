"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CreateOrgModal } from "@/app/_components/CreateOrgModal";
import { AuthModal } from "@/app/_components/AuthModal";

export const Hero = () => {
  const { isLoggedIn, login } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  return (
    <section className="relative bg-white pt-24 pb-32 overflow-hidden">
      {/* Background Decor - Un aspect "Tech" avec des cercles et une grille */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-[20%] -left-[5%] w-[300px] h-[300px] bg-slate-100 rounded-full blur-2xl opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <Container size="xl" className="relative z-10">
        {isLoggedIn ? (
          /* ==========================================
             LOGGED IN: THE PROFESSIONAL COMMANDER
             ========================================== */
          /* ==========================================
   LOGGED IN: THE PROFESSIONAL COMMANDER (EN)
   ========================================== */
          <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="space-y-12">
              {/* Operational Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                System Operational
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                  Drive your <br />
                  <span className="text-blue-600 underline decoration-slate-200 underline-offset-8">
                    organization.
                  </span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
                  Welcome to your control tower. Manage your competitions,
                  centralize your talent pool, and deploy your global scouting
                  network.
                </p>
              </div>

              {/* CORE ACTIONS */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-slate-900 text-white hover:bg-blue-600 px-8 h-16 rounded-2xl shadow-2xl shadow-slate-200 transition-all group"
                >
                  <svg
                    className="mr-2 group-hover:rotate-90 transition-transform"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Create New Organization
                </Button>

                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-900 hover:bg-slate-50 h-16 rounded-2xl px-8 font-bold"
                >
                  Open Dashboard
                </Button>
              </div>

              {/* STRATEGIC NAVIGATION GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-100">
                {[
                  {
                    title: "Leagues & Cups",
                    desc: "Manage your championships and schedules.",
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17M14 14.66V17M18 9.22V14.66a6 6 0 0 1-12 0V9.22c0-1.5 1-3.22 3-3.22h6c2 0 3 1.72 3 3.22Z" />
                      </svg>
                    ),
                    color: "text-amber-500",
                  },
                  {
                    title: "Talent Database",
                    desc: "Access the list of certified players.",
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                    color: "text-blue-600",
                  },
                  {
                    title: "Scouting Network",
                    desc: "Connect with certified FIFA agents.",
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m16 12-4-4-4 4M12 8v8" />
                      </svg>
                    ),
                    color: "text-emerald-600",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div
                      className={`mb-5 transform group-hover:scale-110 transition-transform ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-black text-slate-900 text-xl mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             PUBLIC VIEW: THE MINIMALIST PITCH
             ========================================== */
          <div className="flex flex-col items-start text-left space-y-12">
            <div className="space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="text-blue-600 text-sm font-bold uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 inline-block rounded">
                The African Football Ecosystem
              </div>

              <div className="max-w-5xl space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter leading-[0.95]">
                  Where Football <br />
                  Meets{" "}
                  <span className="relative inline-block">
                    Data.
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-600/10 -z-10"></span>
                  </span>
                </h1>
                <p className="text-2xl text-slate-500 max-w-3xl font-normal leading-relaxed">
                  The most advanced digital platform for leagues, clubs, and
                  talent discovery across the continent. Simple. Powerful.
                  Global.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full pt-4 animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
              <Button
                size="lg"
                onClick={() => openAuth("register")}
                className="px-12 h-16 text-lg bg-blue-600 hover:bg-slate-900 text-white rounded-full border-none transition-all duration-500 transform hover:-translate-y-1 shadow-lg shadow-blue-200"
              >
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-16 text-lg text-slate-900 hover:bg-slate-100 font-bold px-8 rounded-full flex items-center gap-3 transition-all group"
              >
                Watch System Demo
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Button>
            </div>

            {/* Industrial Style Stats avec Count Animation (Simulée) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full pt-20 border-t border-slate-100 animate-in fade-in duration-1000 delay-500 fill-mode-both">
              {[
                { val: "100k", label: "Digital Identities" },
                { val: "500+", label: "Annual Leagues" },
                { val: "24/7", label: "Live Scoring" },
                { val: "50+", label: "Top Partners" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="hover:translate-x-1 transition-transform cursor-default"
                >
                  <p className="text-4xl font-bold text-slate-900 tracking-tighter">
                    {stat.val}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 border-l-2 border-blue-600 pl-3">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
      <CreateOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </section>
  );
};
