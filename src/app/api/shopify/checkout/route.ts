import { createEbookCheckout, ShopifyError } from "@/lib/shopify";

export async function POST() {
  try {
    const checkoutUrl = await createEbookCheckout();
    return Response.json({ checkoutUrl });
  } catch (error) {
    if (error instanceof ShopifyError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Shopify checkout creation failed.", error);
    return Response.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
