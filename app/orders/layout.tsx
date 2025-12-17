import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Orders | Softcool",
  description:
    "View your Softcool order history, track statuses, and open detailed order information for your pillow purchases.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/orders",
  },
  openGraph: {
    title: "My Orders | Softcool",
    description:
      "Access your Softcool order history and review past purchases of pillows and comfort products.",
    url: "/orders",
  },
};

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return children;
}


