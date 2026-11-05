const storefrontApiVersion = "2026-07";

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
};

type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: ShopifyImage | null;
  availableForSale: boolean;
  variants: {
    nodes: ProductVariant[];
  };
};

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type EbookProductDetails = {
  title: string;
  handle: string;
  description: string;
  available: boolean;
  price: ProductVariant["price"];
  image: ShopifyImage | null;
};

export class ShopifyError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ShopifyError";
  }
}

function getShopifyConfig() {
  const domain = (
    process.env.SHOPIFY_STORE_DOMAIN || "maheeraburhan.myshopify.com"
  ).trim().toLowerCase();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  if (!domain || !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain)) {
    throw new ShopifyError("Shopify store domain is not configured.", 503);
  }

  if (!token) {
    throw new ShopifyError(
      "Shopify Storefront API access is not configured yet.",
      503,
    );
  }

  return {
    domain,
    token,
    productTitle: process.env.SHOPIFY_PRODUCT_TITLE?.trim() || "Unsent Unkind",
  };
}

async function storefrontRequest<T>(
  query: string,
  variables: Record<string, string | number>,
): Promise<T> {
  const { domain, token } = getShopifyConfig();
  let response: Response;

  try {
    response = await fetch(
      `https://${domain}/api/${storefrontApiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      },
    );
  } catch {
    throw new ShopifyError("Unable to connect to Shopify. Please try again.", 502);
  }

  if (!response.ok) {
    throw new ShopifyError("Shopify could not complete this request.", 502);
  }

  const result = (await response.json()) as ShopifyResponse<T>;

  if (result.errors?.length) {
    throw new ShopifyError(
      "Shopify could not complete this request. Please try again.",
      502,
    );
  }

  if (!result.data) {
    throw new ShopifyError("Shopify returned an empty response.", 502);
  }

  return result.data;
}

const productQuery = `
  query ProductForSale($search: String!) {
    products(first: 10, query: $search) {
      nodes {
        id
        title
        handle
        description
        availableForSale
        featuredImage {
          url
          altText
          width
          height
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getEbookProduct() {
  const config = getShopifyConfig();
  const data = await storefrontRequest<{
    products: { nodes: ShopifyProduct[] };
  }>(productQuery, { search: `title:"${config.productTitle.replaceAll('"', '\\"')}"` });

  const product = data.products.nodes.find(
    (item) => item.title.toLowerCase() === config.productTitle.toLowerCase(),
  );

  if (!product) {
    throw new ShopifyError(
      `Shopify product "${config.productTitle}" was not found.`,
      404,
    );
  }

  const variant = product.variants.nodes.find((item) => item.availableForSale)
    ?? product.variants.nodes[0];

  if (!variant) {
    throw new ShopifyError("This ebook has no purchasable Shopify variant.", 409);
  }

  return { product, variant };
}

export async function getEbookProductDetails(): Promise<EbookProductDetails> {
  const { product, variant } = await getEbookProduct();

  return {
    title: product.title,
    handle: product.handle,
    description: product.description,
    available: product.availableForSale && variant.availableForSale,
    price: variant.price,
    image: product.featuredImage,
  };
}

const createCartMutation = `
  mutation CreateEbookCart($variantId: ID!) {
    cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: 1 }] }) {
      cart {
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;

export async function createEbookCheckout() {
  const { product, variant } = await getEbookProduct();

  if (!product.availableForSale || !variant.availableForSale) {
    throw new ShopifyError("This ebook is currently unavailable.", 409);
  }

  const data = await storefrontRequest<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: Array<{ message: string }>;
    };
  }>(createCartMutation, { variantId: variant.id });

  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;

  if (data.cartCreate.userErrors.length || !checkoutUrl) {
    throw new ShopifyError(
      data.cartCreate.userErrors[0]?.message
        || "Shopify could not create a checkout. Please try again.",
      502,
    );
  }

  if (new URL(checkoutUrl).protocol !== "https:") {
    throw new ShopifyError("Shopify returned an invalid checkout URL.", 502);
  }

  return checkoutUrl;
}
