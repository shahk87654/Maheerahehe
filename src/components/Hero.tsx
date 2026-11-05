"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { bookTitle, images } from "@/lib/content";
import { ShopifyBuyButton } from "@/components/ShopifyBuyButton";
import type { EbookProductDetails } from "@/lib/shopify";

export function Hero({
  product,
  available,
  productLoading,
}: {
  product: EbookProductDetails | null;
  available: boolean;
  productLoading: boolean;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const reduceMotion = useReducedMotion();
  const [firstTitleWord, ...remainingTitleWords] = (product?.title || bookTitle).split(" ");

  return (
    <section className="hero" id="home" aria-labelledby="hero-title" ref={heroRef}>
      <motion.div
        className="hero-image-layer"
        style={{ y: reduceMotion ? 0 : imageY }}
        aria-hidden="true"
      >
        <Image
          className="hero-image"
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
        />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-frame" aria-hidden="true">
        <span>AN INDEPENDENT POETRY COLLECTION</span>
        <span>LETTERS NEVER SENT</span>
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            A COLLECTION OF EVERYTHING WE NEVER SENT
          </motion.p>
          <h1 id="hero-title" className="hero-title">
            <motion.span
              className="title-main"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {firstTitleWord}
            </motion.span>
            <motion.span
              className="title-outline"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {remainingTitleWords.join(" ")}
            </motion.span>
          </h1>
          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <div>
              <p className="hero-byline">A poetry collection by Maheera Burhan.</p>
              <p className="hero-tagline">Some stories are written. Others are survived.</p>
            </div>
            <div className="hero-actions">
              <a className="button button-light" href="#the-book">
                EXPLORE THE BOOK <ArrowDown size={14} />
              </a>
              <ShopifyBuyButton
                className="text-link light-link"
                available={available}
                productLoading={productLoading}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, y: 22, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 1.15, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="book-cover hero-book-cover">
            {product?.image ? (
              <Image
                className="shopify-book-art"
                src={product.image.url}
                alt={product.image.altText || `${product.title} ebook cover`}
                fill
                priority
                loading="eager"
                sizes="(max-width: 760px) 36vw, 260px"
                quality={85}
              />
            ) : (
              <div className="cover-fallback" aria-label="Shopify ebook cover">
                <span>{productLoading ? "LOADING SHOPIFY COVER" : "COVER ART"}</span>
                <strong>{product?.title || bookTitle}</strong>
                <i>MAHEERA BURHAN</i>
              </div>
            )}
          </div>
          <span className="hero-art-note">A coming-of-age, in words.</span>
        </motion.div>
      </div>

      <div className="hero-bottom-edge" aria-hidden="true">
        <span>SCROLL TO FEEL</span>
        <span className="edge-line" />
        <span>01 — 09</span>
      </div>
    </section>
  );
}
