"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/app/_components/AuthModal";
import Image from "next/image";

export const Navbar = () => {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
 <header className="fixed top-0 inset-x-0 z-50 px-4 py-4">
      {/* Conteneur interne avec flou pour un effet premium */}
      <div className="mx-auto max-w-7xl bg-white/70 backdrop-blur-md flex items-center justify-between py-4 px-6 rounded-2xl shadow-sm border border-white/20">
        
        {/* Logo */}
        <Link href="/" className="flex items-end gap-2 text-xl font-bold text-gray-800">
          <Image src="/logo.png" width={64} height={64} alt="BallOpen" />
          <p>BallOpen</p>
        </Link>

        {/* Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 font-medium text-slate-600">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-blue-600 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button variant="ghost">{user?.name}</Button>
          ) : (
            <Button onClick={() => openAuth("login")} className="">
              Log In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
