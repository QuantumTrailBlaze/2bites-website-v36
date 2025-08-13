// --- START OF FILE src/components/Product.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import {
  Card,
  CardTitle,
  CardDescription as ShadcnCardDescription,
} from '@/components/ui/card';
import CustomButton from '@/components/ui-custom/Button';

// Define the static, non-translatable data for our products
const productsStaticData = [
  {
    id: 'smoothies',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/portfolio/Smoothie_flash_1x1.webp',
    href: '/productos/smoothies-instantaneos',
  },
	{
    id: 'horeca',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/portfolio/Fruit_Bites_Cubos_1x1.webp',
    href: '/productos/bulk-horeca',
  },
	{
    id: 'snacks',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/portfolio/snacks_fresas_trozos_1x1.webp',
    href: '/productos/snacks-naturales',
  },
];

interface TranslatableProduct {
  title: string;
  desc: string;
  ctaLabel: string;
}

export default function ProductSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Fetch the array of translated product texts
  const translatedProducts = t('productsSection.productList', { returnObjects: true }) as TranslatableProduct[];
  
  // Combine static data with translated data
  const productos = productsStaticData.map((staticProduct, index) => ({
    ...staticProduct,
    ...translatedProducts[index],
  }));

  return (
    <section id="products" className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-primary dark:text-green-400">
          {t('productsSection.title')}
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 font-sans">
          {t('productsSection.subtitle')}
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p, i) => (
            <FadeIn key={p.id} delay={i * 150}>
              <Card className={cn(
                "bg-card rounded-xl shadow-md hover:shadow-lg",
                "transition-all duration-300 overflow-hidden",
                "flex flex-col group",
                "w-full max-w-[320px] mx-auto",
                "lg:h-[510px]" // Fixed height for large screens
              )}>
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title} // Use the translated title as alt text
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="px-6 py-4 flex flex-col flex-grow">
                  <div className="flex flex-col min-h-[100px]">
                    <CardTitle className="text-xl font-bold font-serif text-gray-800 dark:text-white">
                      {p.title}
                    </CardTitle>
                    <ShadcnCardDescription className="font-sans text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {p.desc}
                    </ShadcnCardDescription>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    {/* Construct the language-aware link */}
                    <Link to={`/${currentLang}${p.href}`} className="self-start">
                      <CustomButton 
                        variant="primary" 
                        className={cn(
                          "w-auto font-medium text-base",
                          "px-6 py-2 !rounded-md",
                          "bg-hero-button text-hero-button-foreground",
                          "hover:bg-hero-button-hover",
                          "transition-colors duration-200 ease-in-out",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hero-button/80 dark:focus-visible:ring-offset-slate-900"
                        )}
                      >
                        {p.ctaLabel}
                      </CustomButton>
                    </Link>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
// --- END OF FILE src/components/Product.tsx ---
