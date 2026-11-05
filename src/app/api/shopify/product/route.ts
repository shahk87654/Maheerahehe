import { getEbookProductDetails, ShopifyError } from "@/lib/shopify";

export async function GET() {
  try {
    return Response.json(
      await getEbookProductDetails(),
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof ShopifyError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Shopify product lookup failed.", error);
    return Response.json(
      { error: "Unable to load ebook details. Please try again later." },
      { status: 500 },
    );
  }
}
