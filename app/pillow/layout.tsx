import type { Metadata, ResolvingMetadata } from "next";
import type { ReactNode } from "react";
import { allProducts } from "@/lib/products";

type Params = {
  id: string;
};

export async function generateMetadata(
  { params }: { params: Params },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;
  const product = allProducts.find((p) => p.id.toString() === id);

  const baseTitle = product
    ? `${product.name} – Premium Pillow by Softcool`
    : "Pillow Details";

  const description = product
    ? `Buy ${product.name} from Softcool. A premium pillow designed for superior comfort, support, and restful sleep.`
    : "View details for Softcool’s premium pillows designed for comfort, cooling, and healthy sleep.";

  const imageUrl = product?.image ?? "/img/pillow.jpg";

  return {
    title: baseTitle,
    description,
    alternates: {
      canonical: `/pillow/${id}`,
    },
    openGraph: {
      title: baseTitle,
      description,
      url: `/pillow/${id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product ? product.name : "Softcool pillow",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default function PillowLayout({ children }: { children: ReactNode }) {
  return children;
}


