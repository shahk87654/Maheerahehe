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
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);
  const [paperStyle, setPaperStyle] = useState<"ivory" | "lavender" | "night">("ivory");
  const activePage = previewPages[currentPage];

  const changePage = (direction: -1 | 1) => {
    setTurnDirection(direction);
    setCurrentPage((page) => (page + direction + previewPages.length) % previewPages.length);
  };

  const goToPage = (page: number) => {
    setTurnDirection(page >= currentPage ? 1 : -1);
    setCurrentPage(page);
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
          <div className={`preview-page preview-page-prose paper-${paperStyle}`}
            aria-label={`Preview page ${formatPageNumber(currentPage + 1)} of ${formatPageNumber(previewPages.length)}`}
            aria-live="polite"
          >
            <span className="preview-page-edge" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false} custom={turnDirection}>
              <motion.div
                className="preview-page-inner"
                key={currentPage}
                custom={turnDirection}
                variants={{
                  initial: (direction: 1 | -1) => ({
                    opacity: 0.65,
                    rotateY: direction > 0 ? -88 : 88,
                    x: direction > 0 ? 32 : -32,
                  }),
                  animate: { opacity: 1, rotateY: 0, x: 0 },
                  exit: (direction: 1 | -1) => ({
                    opacity: 0.65,
                    rotateY: direction > 0 ? 88 : -88,
                    x: direction > 0 ? -32 : 32,
                  }),
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                whileDrag={{ rotateY: turnDirection > 0 ? -8 : 8 }}
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
          <div className="paper-styles" role="group" aria-label="Choose reading paper">
            <span>PAPER</span>
            <button
              className="paper-swatch paper-swatch-ivory"
              type="button"
              aria-label="Warm ivory paper"
              aria-pressed={paperStyle === "ivory"}
              onClick={() => setPaperStyle("ivory")}
            />
            <button
              className="paper-swatch paper-swatch-lavender"
              type="button"
              aria-label="Lavender paper"
              aria-pressed={paperStyle === "lavender"}
              onClick={() => setPaperStyle("lavender")}
            />
            <button
              className="paper-swatch paper-swatch-night"
              type="button"
              aria-label="Night paper"
              aria-pressed={paperStyle === "night"}
              onClick={() => setPaperStyle("night")}
            />
            <span className="paper-style-label">{paperStyle} edition</span>
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
                onClick={() => goToPage(index)}
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
