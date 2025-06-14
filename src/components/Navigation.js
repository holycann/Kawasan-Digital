"use client";

import Link from "next/link";
import { ResizableNavbar } from "./ui/resizable-navbar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  // Logo component
  const logo = (
    <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-heading">
      Kawasan Digital
    </span>
  );

  // CTA Button component
  const ctaButton = (
    <Link 
      href="/contact"
      className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all"
    >
      Get Started
    </Link>
  );

  return (
    <ResizableNavbar 
      navItems={navLinks} 
      logo={logo} 
      ctaButton={ctaButton} 
    />
  );
} 