"use client";

import Link from "next/link";
import { ResizableNavbar } from "./ui/resizable-navbar";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
];

export default function Navigation() {
    // Logo component
    const logo = (
        <Image
            src="/Logo.png"
            alt="Kawasan Digital Logo"
            width={85}
            height={85}
            className="object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
            priority={true}
        />
    );

    // CTA Button component
    const ctaButton = (
        <Link href="/contact"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all">
            Contact Us
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
