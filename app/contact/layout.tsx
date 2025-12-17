import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Softcool | Customer Support & Distributorship Enquiries",
  description:
    "Get in touch with Softcool for product questions, order support, bulk purchases, or distributorship opportunities across India.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Softcool",
    description:
      "Reach Softcool’s team for pillow recommendations, order assistance, and distributorship enquiries.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}


