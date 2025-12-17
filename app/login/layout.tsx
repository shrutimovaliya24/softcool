import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Softcool",
  description:
    "Log in to your Softcool account to view orders, manage favorites, and enjoy a faster checkout experience.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Login | Softcool",
    description:
      "Access your Softcool account to track orders and manage your pillow preferences.",
    url: "/login",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}


