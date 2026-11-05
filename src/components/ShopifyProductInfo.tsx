import type { EbookProductDetails } from "@/lib/shopify";

export function ShopifyProductInfo({
  product,
  error,
  loading,
}: {
  product: EbookProductDetails | null;
  error: string;
  loading: boolean;
}) {
  if (product) {
    const formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: product.price.currencyCode,
    }).format(Number(product.price.amount));

    return (
      <p className="shopify-product-info" aria-live="polite">
        <span className="offer-price">{formattedPrice}</span>
        <span>{product.available ? " · Available as an ebook" : " · Currently unavailable"}</span>
      </p>
    );
  }

  if (loading) {
    return <p className="shopify-product-loading" aria-live="polite">Loading price and availability from Shopify…</p>;
  }

  return <p className="shopify-product-error" role="status">{error || "Shopify product details are unavailable."}</p>;
}
