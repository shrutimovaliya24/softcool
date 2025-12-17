import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Account | Softcool",
  description:
    "Sign up for a Softcool account using your Google email to save favorites, track orders, and enjoy a smoother checkout.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/signup",
  },
  openGraph: {
    title: "Sign Up | Softcool",
    description:
      "Create your Softcool account to personalize your pillow shopping experience and manage your orders in one place.",
    url: "/signup",
  },
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}


