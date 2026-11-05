import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { bookTitle } from "@/lib/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${bookTitle} — A Poetry Collection by Maheera Burhan`,
  description:
    "Unsent Unkind is a poetry collection by Maheera Burhan about trauma, becoming, and the hope found in healing.",
  openGraph: {
    title: bookTitle,
    description: "Some stories are written. Others are survived.",
    type: "website",
    siteName: bookTitle,
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: `A quiet mountain lake — ${bookTitle} by Maheera Burhan`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: bookTitle,
    description: "Some stories are written. Others are survived.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
