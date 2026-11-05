import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { EbookProductDetails } from "@/lib/shopify";

export function BookIntroduction({
  product,
  productError,
  productLoading,
}: {
  product: EbookProductDetails | null;
  productError: string;
  productLoading: boolean;
}) {
  return (
    <section className="book-intro section-paper" id="the-book">
      <div className="section-index">
        <span>01</span>
        <span>THE BOOK</span>
      </div>
      <div className="intro-grid">
        <Reveal className="intro-heading">
          <p className="eyebrow">A COLLECTION IN THREE ACTS</p>
          <h2>SOMEWHERE BETWEEN<br /><em>BREAKING</em> AND<br />BECOMING.</h2>
          <div className="hand-note">for the ones still finding their way</div>
        </Reveal>

        <Reveal className="intro-art-wrap" delay={0.12}>
          <div className="intro-art">
            {product?.image ? (
              <Image
                src={product.image.url}
                alt={product.image.altText || `${product.title} cover art`}
                fill
                sizes="(max-width: 760px) 82vw, 27vw"
                quality={85}
              />
            ) : (
              <div className="intro-art-fallback" aria-hidden="true">
                <span>U·U</span>
              </div>
            )}
            <span className="image-caption">THE COVER, UNDER ANOTHER LIGHT</span>
          </div>
          <span className="art-index">FIG. 01 &nbsp; — &nbsp; {product?.title.toUpperCase() || "A COVER REVEALED"}</span>
        </Reveal>

        <Reveal className="intro-text" delay={0.08}>
          <span className="large-quote-mark" aria-hidden="true">“</span>
          {product ? (
            <p>{product.description}</p>
          ) : (
            <p>
              {productLoading
                ? "Loading the book description from Shopify…"
                : productError || "The book description is currently unavailable."}
            </p>
          )}
          <a className="text-link dark-link" href="#the-preview">
            TAKE A CLOSER LOOK <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
      <div className="intro-endnote">A LITTLE LIGHT, LEFT ON.</div>
    </section>
  );
}
