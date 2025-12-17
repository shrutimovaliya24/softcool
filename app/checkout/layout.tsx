import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout | Secure Pillow Shopping at Softcool",
  description:
    "Securely complete your Softcool order with your preferred payment method and shipping details.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/checkout",
  },
  openGraph: {
    title: "Checkout | Softcool",
    description:
      "Finalize your Softcool pillow and comfort product purchase on our secure checkout page.",
    url: "/checkout",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}


