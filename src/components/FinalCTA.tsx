import Image from "next/image";
import { images } from "@/lib/content";
import { ShopifyBuyButton } from "@/components/ShopifyBuyButton";
import { Reveal } from "@/components/Reveal";
import type { EbookProductDetails } from "@/lib/shopify";

export function FinalCTA({
  product,
  available,
  productLoading,
}: {
  product: EbookProductDetails | null;
  available: boolean;
  productLoading: boolean;
}) {
  return (
    <section className="final-cta" id="purchase" aria-labelledby="final-cta-title">
      <Image
        className="final-cta-background"
        src={images.healing}
        alt=""
        fill
        sizes="100vw"
        quality={80}
      />
      <div className="final-cta-shade" />
      <span className="final-cta-orbit final-cta-orbit-one" aria-hidden="true" />
      <span className="final-cta-orbit final-cta-orbit-two" aria-hidden="true" />
      <div className="final-cta-layout">
        <Reveal className="final-cta-content">
          <p className="eyebrow final-cta-eyebrow">
            <span>09 / THE LAST PAGE</span>
            A LAST THOUGHT, BEFORE YOU GO
          </p>
          <h2 id="final-cta-title">
            <span>SOME WORDS</span>
            <span>FIND US WHEN</span>
            <span>WE NEED THEM</span>
            <em>MOST.</em>
          </h2>
          <p className="final-cta-description">
            For the moments we survived, the words we never said, and the hope we are still learning to find.
          </p>
          <ShopifyBuyButton
            className="button button-light"
            available={available}
            productLoading={productLoading}
          />
          <span className="purchase-note">Secure checkout is completed on Shopify.</span>
        </Reveal>
        <Reveal className="final-cta-art" delay={0.12}>
          <div className="final-cta-art-frame">
            {product?.image ? (
              <Image
                className="final-cta-cover"
                src={product.image.url}
                alt={product.image.altText || `${product.title} book cover`}
                fill
                sizes="(max-width: 760px) 140px, (max-width: 1100px) 220px, 320px"
                quality={85}
              />
            ) : (
              <div className="final-cta-cover-fallback">
                <span>A COLLECTION OF</span>
                <strong>Unsent,<br />Unkind</strong>
                <span>MAHEERA BURHAN</span>
              </div>
            )}
          </div>
          <p className="final-cta-art-caption">
            <span>THE COLLECTION</span>
            <span>{product?.title || "Unsent Unkind"}</span>
          </p>
        </Reveal>
      </div>
      <span className="final-cta-side-note" aria-hidden="true">KEEP A LITTLE HOPE.</span>
    </section>
  );
}
