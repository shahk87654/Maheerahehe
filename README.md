# Unsent Unkind

An artistic landing page and Shopify-hosted ebook checkout for *Unsent Unkind* by Maheera Burhan. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lucide.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connect Shopify

1. In Shopify, create or confirm the **Unsent Unkind** digital ebook product and make it available to the Storefront API sales channel.
2. Create a **Storefront API** access token with product-read and cart/checkout permissions.
3. Copy `.env.example` to `.env.local` and set `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. The provided store domain and product title are already filled in as defaults.
4. Restart the dev server. The ebook offer fetches the live price and availability; purchase buttons create a Shopify cart and send the customer to Shopify-hosted checkout.

The Storefront API token is read only by Next.js route handlers and must not use a `NEXT_PUBLIC_` prefix. **Never put a Shopify Admin API/private access token in this project.** If an Admin API token has been exposed, revoke it in Shopify and create a replacement.

To sell a differently named product, update `SHOPIFY_PRODUCT_TITLE` in `.env.local` to match its exact Shopify product title.

## Validation

Run `npm run lint` and `npm run build`.

The landing page preview remains a short sample only. No custom payment processing, order database, or ebook file delivery is implemented; Shopify manages the hosted checkout and any digital fulfillment configured in the store.
