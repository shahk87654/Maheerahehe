"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { authorPortrait, bookTitle } from "@/lib/content";
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
  const [firstTitleWord, ...remainingTitleWords] = (product?.title || bookTitle).split(" ");

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-frame" aria-hidden="true">
        <span>ISSUE NO. 01 &nbsp; / &nbsp; A BOOK BY MAHEERA BURHAN</span>
        <span>POETRY FOR THE UNSAID</span>
      </div>

      <div className="hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <motion.p
            className="eyebrow hero-eyebrow"
          >
            A COLLECTION OF EVERYTHING WE NEVER SENT
          </motion.p>
          <h1 id="hero-title" className="hero-title">
            <span className="title-main">{firstTitleWord}</span>
            <span className="title-outline">{remainingTitleWords.join(" ")}</span>
          </h1>
          <div className="hero-bottom">
            <div>
              <p className="hero-byline">A poetry collection by Maheera Burhan</p>
              <p className="hero-tagline">For all the things you never said.</p>
            </div>
            <div className="hero-actions">
              <a className="button button-light" href="#the-book">
                OPEN THE BOOK <ArrowDown size={14} />
              </a>
              <ShopifyBuyButton
                className="text-link light-link"
                available={available}
                productLoading={productLoading}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, y: 22, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-portrait-wrap">
            <Image
              className="hero-portrait"
              src={authorPortrait}
              alt="Maheera Burhan, author of Unsent Unkind"
              fill
              priority
              loading="eager"
              unoptimized
              sizes="(max-width: 760px) 72vw, 36vw"
            />
            <span className="hero-portrait-label">MAHEERA BURHAN &mdash; WRITER, FEELER, PERSON</span>
          </div>
          <div className="book-cover hero-book-cover">
            {product?.image ? (
              <Image
                className="shopify-book-art"
                src={product.image.url}
                alt={product.image.altText || `${product.title} ebook cover`}
                fill
                priority
                loading="eager"
                sizes="(max-width: 760px) 28vw, 180px"
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
          <span className="hero-art-note">a book to feel things to</span>
        </motion.div>
      </div>

      <div className="hero-bottom-edge" aria-hidden="true">
        <span>SCROLL IF YOU FEEL LIKE IT</span>
        <span className="edge-line" />
        <span>TAKE YOUR TIME</span>
      </div>
    </section>
  );
}
