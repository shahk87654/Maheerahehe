"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { bookTitle, previewPages } from "@/lib/content";
import { ShopifyBuyButton } from "@/components/ShopifyBuyButton";
import { ShopifyProductInfo } from "@/components/ShopifyProductInfo";
import type { EbookProductDetails } from "@/lib/shopify";

export function BookPreview({
  product,
  productError,
  productLoading,
}: {
  product: EbookProductDetails | null;
  productError: string;
  productLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const activePage = previewPages[currentPage];

  const changePage = (direction: -1 | 1) => {
    setCurrentPage((page) => (page + direction + previewPages.length) % previewPages.length);
  };
  const formatPageNumber = (page: number) => String(page).padStart(2, "0");

  return (
    <section className="preview-section section-paper" id="the-preview">
      <div className="section-index">
        <span>04</span>
        <span>BOOK PREVIEW</span>
      </div>
      <div className="preview-heading">
        <Reveal>
          <p className="eyebrow">A PAGE, HELD OPEN</p>
          <h2>A LITTLE<br /><em>OF THE INSIDE.</em></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="preview-intro">A small glimpse into {bookTitle}. The pages unfold one at a time.</p>
        </Reveal>
      </div>

      <div className="preview-offer-layout">
        <Reveal className="preview-reader" delay={0.12}>
          <div className="preview-side-note">
            <span>{bookTitle.toUpperCase()}</span>
            <span>SELECTED PREVIEW</span>
          </div>
          <div
            className="preview-page preview-page-prose"
            aria-label={`Preview page ${formatPageNumber(currentPage + 1)} of ${formatPageNumber(previewPages.length)}`}
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="preview-page-inner"
                key={currentPage}
                initial={{ opacity: 0, rotateY: -9, x: 18 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 9, x: -18 }}
                transition={{ duration: 0.38, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) changePage(1);
                  if (info.offset.x > 70) changePage(-1);
                }}
              >
                <span className="preview-page-label">{activePage.label}</span>
                <h3>{activePage.title}</h3>
                <div className="preview-prose">
                  {activePage.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <span className="preview-page-number">{formatPageNumber(currentPage + 1)}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="preview-controls">
            <button type="button" onClick={() => changePage(-1)} aria-label="Previous preview page">
              <ArrowLeft size={17} />
            </button>
            <div className="preview-progress-wrap">
              <span>{formatPageNumber(currentPage + 1)}</span>
              <div
                className="preview-progress"
                role="progressbar"
                aria-label="Preview progress"
                aria-valuemin={1}
                aria-valuemax={previewPages.length}
                aria-valuenow={currentPage + 1}
              >
                <span style={{ width: `${((currentPage + 1) / previewPages.length) * 100}%` }} />
              </div>
              <span>{formatPageNumber(previewPages.length)}</span>
            </div>
            <button type="button" onClick={() => changePage(1)} aria-label="Next preview page">
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="preview-page-dots" aria-label="Select preview page">
            {previewPages.map((page, index) => (
              <button
                key={page.label}
                type="button"
                aria-label={`Go to preview page ${index + 1}`}
                aria-current={currentPage === index ? "page" : undefined}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        </Reveal>
        <Reveal className="ebook-offer" delay={0.2}>
          <div className="offer-cover">
            {product?.image ? (
              <Image
                src={product.image.url}
                alt={product.image.altText || `${product.title} ebook cover`}
                fill
                sizes="(max-width: 760px) 42vw, 170px"
                quality={85}
              />
            ) : (
              <div className="offer-cover-fallback">
                {product?.title || (productLoading ? "LOADING" : bookTitle)}
              </div>
            )}
          </div>
          <div className="offer-copy">
            <p className="eyebrow">SHOPIFY DIGITAL EDITION</p>
            <h3>{product?.title || (productLoading ? "Loading ebook…" : "Ebook details unavailable")}</h3>
            {product?.description && (
              <p className="offer-description">{product.description}</p>
            )}
            <ShopifyProductInfo
              product={product}
              error={productError}
              loading={productLoading}
            />
            <ShopifyBuyButton
              className="button button-dark"
              available={product?.available ?? false}
              productLoading={productLoading}
            />
          </div>
          <span className="offer-stamp" aria-hidden="true">A BOOK<br />TO KEEP</span>
        </Reveal>
      </div>
      <p className="preview-disclaimer">A short preview only. The complete ebook is not displayed here.</p>
    </section>
  );
}
