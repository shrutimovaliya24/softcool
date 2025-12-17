interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative py-8 sm:py-12 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5298C1] mb-3 sm:mb-4 md:mb-5 font-sans animate-fade-in-up leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#0D031A] font-sans animate-fade-in-up-delay leading-relaxed px-4 sm:px-0">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

