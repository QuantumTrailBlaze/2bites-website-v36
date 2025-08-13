// --- START OF FILE src/components/Applications.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import FadeIn from './animations/FadeIn';
import CustomButton from '@/components/ui-custom/Button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

// Static, non-translatable data
const sectorsStaticData = [
  {
    id: 'cafeterias',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/applications/Applications_cafeteria_1x1.webp',
    href: '#',
  },
  {
    id: 'gyms',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/applications/Applications_Gym_1x1.webp',
    href: '#',
  },
  {
    id: 'bakery',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/applications/Applications_panaderia_1x1.webp',
    href: '#',
  },
  {
    id: 'cocktails',
    img: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/applications/Applications_Cocktel_1x1.webp',
    href: '#',
  },
];

// Define interfaces for better type safety
interface TranslatableSector {
  title: string;
  desc: string;
  ctaLabel: string;
}

interface SectorData extends TranslatableSector {
  id: string;
  img: string;
  href: string;
}

// Helper function to render a single sector card
const SectorCard = ({ sector, delay, isCarouselItem }: { sector: SectorData, delay: number, isCarouselItem: boolean }) => (
  <FadeIn delay={isCarouselItem ? 0 : delay} className="h-full">
    <Card className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-slate-700/50 overflow-hidden group transition-all duration-300">
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={sector.img}
          alt={sector.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-gray-100">{sector.title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow font-sans">{sector.desc}</p>
        <Link to={sector.href} className="mt-4 self-start">
          <CustomButton 
            variant="primary" 
            className={cn(
              "text-base py-3 !rounded-md", 
              "bg-hero-button text-hero-button-foreground", 
              "hover:bg-hero-button-hover", 
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hero-button/80 dark:focus-visible:ring-offset-slate-900"
            )}
          >
            {sector.ctaLabel}
          </CustomButton>
        </Link>
      </div>
    </Card>
  </FadeIn>
);

export default function ApplicationsSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  const translatedSectors = t('applicationsSection.sectorList', { returnObjects: true }) as TranslatableSector[];
  
  // Combine static data with translated data
  const sectores: SectorData[] = sectorsStaticData.map((staticSector, index) => ({
    ...staticSector,
    ...translatedSectors[index],
  }));

  return (
    <section id="applications" className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-hero-text dark:text-green-400">
          {t('applicationsSection.title')}
        </h2>
        <p className="mt-4 font-sans text-base text-gray-600 dark:text-gray-400">
          {t('applicationsSection.subtitle')}
        </p>
      </div>

      {isMobile === undefined ? (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 invisible"> 
          {sectores.map((s) => (
            <div key={s.id} className="h-full"><Card className="h-[400px] sm:h-[500px] bg-gray-200 dark:bg-slate-700 animate-pulse"></Card></div>
          ))}
        </div>
      ) : isMobile ? (
        <div className="mx-auto w-full px-4 sm:px-0" style={{ maxWidth: 'calc(100% - 2rem)' }}>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {sectores.map((s, i) => (
                <CarouselItem key={s.id} className="basis-full">
                  <div className="p-1 sm:p-2 h-full">
                    <SectorCard sector={s} delay={i * 100} isCarouselItem={true} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectores.map((s, i) => (
            <SectorCard sector={s} delay={i * 100} isCarouselItem={false} key={s.id} />
          ))}
        </div>
      )}
    </section>
  );
}
// --- END OF FILE src/components/Applications.tsx ---
