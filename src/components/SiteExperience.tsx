"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { AuthorSection } from "@/components/AuthorSection";
import { BookIntroduction } from "@/components/BookIntroduction";
import { BookPreview } from "@/components/BookPreview";
import { EmotionalJourney } from "@/components/EmotionalJourney";
import { FeaturedPoetry } from "@/components/FeaturedPoetry";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MobilePurchaseBar } from "@/components/MobilePurchaseBar";
import { Navigation } from "@/components/Navigation";
import type { EbookProductDetails } from "@/lib/shopify";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isEbookProductDetails(value: unknown): value is EbookProductDetails {
  if (!isRecord(value) || !isRecord(value.price)) return false;

  const image = value.image;
  const validImage =
    image === null
    || (isRecord(image)
      && typeof image.url === "string"
      && (typeof image.altText === "string" || image.altText === null)
      && typeof image.width === "number"
      && typeof image.height === "number");

  return typeof value.title === "string"
    && typeof value.handle === "string"
    && typeof value.description === "string"
    && typeof value.available === "boolean"
    && typeof value.price.amount === "string"
    && typeof value.price.currencyCode === "string"
    && validImage;
}

export function SiteExperience() {
  const [product, setProduct] = useState<EbookProductDetails | null>(null);
  const [productError, setProductError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProduct = async () => {
      try {
        const response = await fetch("/api/shopify/product", {
          signal: controller.signal,
        });
        const result: unknown = await response.json();

        if (!response.ok) {
          const error =
            isRecord(result) && typeof result.error === "string"
              ? result.error
              : undefined;
          if (response.status === 404 || response.status === 409) {
            throw new Error("This ebook listing is temporarily unavailable.");
          }
          throw new Error(error || "Unable to load ebook details.");
        }

        if (!isEbookProductDetails(result)) {
          throw new Error("Shopify returned incomplete ebook details.");
        }

        setProduct(result);
      } catch (error) {
        if (!controller.signal.aborted) {
          setProductError(
            error instanceof Error
              ? error.message
              : "Unable to load ebook details.",
          );
        }
      }
    };

    void loadProduct();
    return () => controller.abort();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Navigation available={product?.available ?? false} productLoading={!product && !productError} />
      <MobilePurchaseBar
        available={product?.available ?? false}
        productLoading={!product && !productError}
      />
      <main>
        <Hero
          available={product?.available ?? false}
          product={product}
          productLoading={!product && !productError}
        />
        <BookIntroduction
          product={product}
          productError={productError}
          productLoading={!product && !productError}
        />
        <FeaturedPoetry
          available={product?.available ?? false}
          productLoading={!product && !productError}
        />
        <EmotionalJourney />
        <BookPreview
          product={product}
          productError={productError}
          productLoading={!product && !productError}
        />
        <AuthorSection />
        <FinalCTA
          product={product}
          available={product?.available ?? false}
          productLoading={!product && !productError}
        />
      </main>
      <Footer />
    </MotionConfig>
  );
}
