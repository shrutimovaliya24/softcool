import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/layout-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://softcool.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Softcool Pillows & Comfort Products | Orthopedic & Cooling Pillows in India",
    template: "%s | Softcool",
  },
  description:
    "Softcool offers premium orthopedic and cooling pillows designed for better neck support, spinal alignment, and deeper sleep. Shop best-selling comfort products crafted in India for healthy, refreshing rest.",
  keywords: [
    "Softcool pillows",
    "orthopedic pillows India",
    "cooling pillows",
    "memory foam pillow",
    "neck support pillow",
    "best pillows for sleep",
    "comfort products",
  ],
  applicationName: "Softcool",
  authors: [{ name: "Softcool" }],
  creator: "Softcool",
  publisher: "Softcool",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Softcool",
    title: "Softcool Pillows & Comfort Products",
    description:
      "Discover Softcool orthopedic and cooling pillows engineered for superior comfort, posture support, and cool sleep. Explore our best-selling comfort collection made in India.",
    images: [
      {
        url: "/img/pillow.jpg",
        width: 1200,
        height: 630,
        alt: "Softcool premium pillows and comfort products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Softcool Pillows & Comfort Products",
    description:
      "Premium orthopedic and cooling pillows from Softcool for deeper, more comfortable sleep.",
    images: ["/img/pillow.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    // Use the PNG favicon added under /public/logo/
    icon: "/logo/favicon.png",
  },
  category: "ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
