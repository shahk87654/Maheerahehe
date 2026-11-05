"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { bookTitle } from "@/lib/content";
import { ShopifyBuyButton } from "@/components/ShopifyBuyButton";

const links = [
  { label: "The Book", href: "#the-book" },
  { label: "The Words", href: "#the-words" },
  { label: "The Author", href: "#the-author" },
];

export function Navigation({
  available,
  productLoading,
}: {
  available: boolean;
  productLoading: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 32);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <a
        className="nav-brand"
        href="#home"
        aria-label={`${bookTitle}, home`}
        onClick={() => setMenuOpen(false)}
      >
        UNSENT <span>UNKIND</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <ShopifyBuyButton
        className="nav-cta"
        available={available}
        productLoading={productLoading}
      />

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <ShopifyBuyButton
              className="mobile-nav-buy"
              onClick={() => setMenuOpen(false)}
              available={available}
              productLoading={productLoading}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
