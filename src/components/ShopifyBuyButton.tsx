"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function ShopifyBuyButton({
  className,
  onClick,
  available,
  productLoading,
}: {
  className: string;
  onClick?: () => void;
  available: boolean;
  productLoading: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/shopify/checkout", { method: "POST" });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.checkoutUrl) {
        if (response.status === 503) {
          throw new Error("Shopify checkout is being connected. Please check back soon.");
        }
        if (response.status === 404 || response.status === 409) {
          throw new Error("This ebook is not available for purchase right now.");
        }
        throw new Error(result.error || "Unable to start checkout. Please try again.");
      }

      onClick?.();
      window.location.assign(result.checkoutUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <span className="shopify-buy-wrap">
      <button
        className={className}
        type="button"
        onClick={startCheckout}
        disabled={loading || productLoading || !available}
        aria-busy={loading || productLoading}
      >
        {loading
          ? "OPENING CHECKOUT…"
          : productLoading
            ? "LOADING EBOOK…"
            : available
              ? "GET THE EBOOK"
              : "CURRENTLY UNAVAILABLE"}
        <ArrowUpRight size={15} aria-hidden="true" />
      </button>
      {error && <span className="shopify-purchase-error" role="alert">{error}</span>}
    </span>
  );
}
