import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pillow Collections & Comfort Products | Softcool",
  description:
    "Browse all Softcool pillows and comfort products by category, price, and features. Discover Doctor Pillow, Paradise, Neem Plus, Heritage, and more best-sellers.",
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    title: "Softcool Pillow Collections",
    description:
      "Explore Softcool’s full pillow collection including orthopedic, cooling, and neem-infused pillows tailored for every sleep style.",
    url: "/collections",
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}


