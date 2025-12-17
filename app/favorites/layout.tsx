import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Favorite Pillows | Softcool",
  description:
    "View and manage your favorite Softcool pillows and comfort products saved for quick access.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/favorites",
  },
  openGraph: {
    title: "My Favorites | Softcool",
    description:
      "Access your personalized list of favorite Softcool pillows and comfort products.",
    url: "/favorites",
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}


