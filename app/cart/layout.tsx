import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shopping Cart | Softcool",
  description:
    "Review the Softcool pillows and comfort products in your shopping cart before proceeding to secure checkout.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/cart",
  },
  openGraph: {
    title: "Shopping Cart | Softcool",
    description:
      "Check the items in your Softcool cart, including quantities and pricing, before placing your order.",
    url: "/cart",
  },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}


