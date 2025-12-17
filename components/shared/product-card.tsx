import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  badge: string;
  image: string;
  description?: string;
  link?: string;
  badgeStyle?: "blue" | "white";
  showDescription?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  badge,
  image,
  description,
  link,
  badgeStyle = "blue",
  showDescription = false
}: ProductCardProps) {
  const href = link || `/pillow/${id}`;
  const badgeClasses = badgeStyle === "white" 
    ? "bg-[#FDF55A] text-[#0D031A]"
    : "bg-[#FDF55A] text-[#0D031A]";

  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          quality={90}
        />
        {badge && (
          <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${badgeClasses} px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-semibold z-10 font-sans`}>
            {badge}
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-5 text-center grow flex flex-col justify-between">
        <div>
        <h3 className="text-sm sm:text-base font-bold text-[#0D031A] mb-2 sm:mb-3 transition-colors font-sans leading-tight hover:text-[#5298C1]">
          {name}
        </h3>
        {showDescription && description && (
          <p className="text-xs sm:text-sm text-[#0D031A] mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3 font-sans leading-relaxed">{description}</p>
        )}
        </div>
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          {originalPrice && (
            <span className="text-xs sm:text-sm text-[#5A646E] line-through font-sans">
              ₹{originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
          <span className="text-base sm:text-lg font-bold text-[#0D031A] font-sans">
            ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </Link>
  );
}

