"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LegalModal } from "@/app/_components/LegalModal";

export const Footer = () => {
  const [legalType, setLegalType] = useState<"privacy" | "terms" | null>(null);
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Integrations", href: "#integrations" },
      { label: "API Documentation", href: "/docs" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
    ],
    resources: [
      { label: "Help Center", href: "/help" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    {
      label: "FB",
      href: "#",
      svg: (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      ),
    },
    {
      label: "TW",
      href: "#",
      svg: (
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      ),
    },
    {
      label: "IG",
      href: "#",
      svg: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ),
    },
    {
      label: "TK",
      href: "#",
      svg: (
        <>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </>
      ),
    },
    {
      label: "LN",
      href: "#",
      svg: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
  ];

  return (
    <footer className="bg-[#050505] text-white pt-40 pb-12 overflow-hidden border-t border-white/5">
      <Container size="xl">
        {/* SECTION NEWSLETTER - BESPOKE DESIGN */}
        <div className="relative mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8] mb-6 italic">
                Stay in the <br />
                <span className="text-blue-600">Circle.</span>
              </h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Weekly insights on African football tech.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form className="relative flex items-center group">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-transparent border-b border-white/10 py-6 text-sm font-black tracking-widest focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-700"
                />
                <button className="absolute right-0 h-12 w-12 bg-white text-black rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-40">
          {/* Brand */}
          <div className="md:col-span-4 space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-xl rotate-3 italic font-black">
                FE
              </div>
              <span className="text-lg font-black tracking-tighter uppercase leading-none">
                Football <br />{" "}
                <span className="text-slate-500">Ecosystem</span>
              </span>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-slate-500 hover:bg-white hover:text-black transition-all duration-500"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { title: "Product", items: footerLinks.product },
              { title: "Company", items: footerLinks.company },
              { title: "Resources", items: footerLinks.resources },
            ].map((col, i) => (
              <div key={i} className="space-y-8">
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.items.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT RIBBON - DARK VERSION */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 rounded-3xl overflow-hidden mb-20 bg-white/[0.02]">
          {[
            {
              label: "Direct Email",
              value: "HQ@FOOTBALLECO.COM",
              svg: (
                <>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </>
              ),
            },
            {
              label: "Global Line",
              value: "+225 01 23 45 67 89",
              svg: (
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              ),
            },
            {
              label: "Studio HQ",
              value: "ABIDJAN, CI",
              svg: (
                <>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 border-r last:border-r-0 border-white/5 hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="text-blue-600">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.svg}
                  </svg>
                </div>
                <div>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">
                    {item.label}
                  </span>
                  <span className="text-xs font-black text-white uppercase tracking-tighter">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
          <p>© {new Date().getFullYear()} FOOTBALL ECOSYSTEM. DATA SECURED.</p>
          <div className="flex gap-8">
            <button
              onClick={() => setLegalType("privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setLegalType("terms")}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>

            <span className="text-blue-600 italic">Global System Online</span>
          </div>
        </div>
      </Container>
      <LegalModal
        isOpen={!!legalType}
        onClose={() => setLegalType(null)}
        defaultTab={legalType || "privacy"}
      />
    </footer>
  );
};
