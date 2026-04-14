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
    <div className="">
      <div className="bg-gray-200/2 round">
        <div className="">
          <Image src={"/logo.png"} sizes="" alt="IlewQuote" />
        </div>
        <div>
          <nav>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="">
          {isLoggedIn ? (
            <div className="relative">
              <Button
                variant="ghost"
                className=""
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                {user?.name}
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className=""
              onClick={() => openAuth("login")}
            >
              Log In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
