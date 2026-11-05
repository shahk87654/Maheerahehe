"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { bookTitle } from "@/lib/content";
import { ShopifyBuyButton } from "@/components/ShopifyBuyButton";

export function MobilePurchaseBar({
  available,
  productLoading,
}: {
  available: boolean;
  productLoading: boolean;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [atClosingSection, setAtClosingSection] = useState(false);

  useEffect(() => {
    const updateScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.65);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const closingSections = [
      document.getElementById("purchase"),
      document.querySelector(".site-footer"),
    ].filter((section): section is HTMLElement => section instanceof HTMLElement);
    const observer = closingSections.length > 0
      ? new IntersectionObserver(
          (entries) =>
            setAtClosingSection(entries.some((entry) => entry.isIntersecting)),
          { threshold: 0.25 },
        )
      : null;

    closingSections.forEach((section) => observer?.observe(section));

    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {pastHero && !atClosingSection && (
        <motion.aside
          className="mobile-purchase-bar"
          aria-label={`${bookTitle} ebook`}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mobile-purchase-copy">
            <span>{bookTitle.toUpperCase()}</span>
            <small>DIGITAL EDITION</small>
          </div>
          <ShopifyBuyButton
            className="mobile-purchase-button"
            available={available}
            productLoading={productLoading}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
