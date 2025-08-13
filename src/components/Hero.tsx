// --- START OF FILE src/components/Hero.tsx ---

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'; // Import DialogTitle
import LeadMagnetForm from '@/components/LeadMagnetForm';
import FreeSampleForm from '@/components/FreeSampleForm';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const desktopBgUrl = "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/backgrounds/2bites_hero_fruit_only_background2.webp";
  const mobileBgUrl = "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/backgrounds/2bites_hero_fruit_only_background2_mov.webp";

  return (
    <section 
      id="home" 
      className={cn( 'relative w-full overflow-hidden', className )}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={isMobile ? mobileBgUrl : desktopBgUrl} 
          alt={t('hero.title')} // Use translated alt text
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/15"></div> 
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 md:pt-40 lg:pt-44 pb-36 md:pb-96">
        <div className="max-w-[900px] mx-auto text-center"> 
          <FadeIn delay={100}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-hero-text leading-tight mb-4 sm:mb-6">
              {t('hero.title')}
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-base sm:text-lg md:text-xl text-hero-text/90 mb-6 sm:mb-8 md:mb-10">
              {t('hero.subtitle')}
            </p>
          </FadeIn>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <FadeIn delay={300} className="w-full sm:w-auto">
              <Dialog open={isSampleModalOpen} onOpenChange={setIsSampleModalOpen}>
                <DialogTrigger asChild>
                  <button className="w-full bg-hero-button hover:bg-hero-button-hover text-hero-button-foreground font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-md sm:text-lg">
                    {t('hero.cta_sample')}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  {/* ADDED for accessibility */}
                  <DialogTitle className="sr-only">{t('freeSampleForm.header.title')}</DialogTitle>
                  <FreeSampleForm onFormSubmit={() => setIsSampleModalOpen(false)} />
                </DialogContent>
              </Dialog>
            </FadeIn>
            <FadeIn delay={400} className="w-full sm:w-auto">
              <Dialog open={isCatalogModalOpen} onOpenChange={setIsCatalogModalOpen}>
                <DialogTrigger asChild>
                  <button className="w-full bg-hero-button hover:bg-hero-button-hover text-hero-button-foreground font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-md sm:text-lg">
                    {t('hero.cta_catalog')}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                   {/* ADDED for accessibility */}
                  <DialogTitle className="sr-only">{t('leadMagnetForm.header.title')}</DialogTitle>
                  <LeadMagnetForm onFormSubmit={() => setIsCatalogModalOpen(false)} />
                </DialogContent>
              </Dialog>
            </FadeIn>
          </div>

          <FadeIn delay={500} className="mt-8 text-center">
             <button
                onClick={() => { /* scroll logic */ }}
                className="font-medium text-hero-text hover:text-hero-text/80 underline underline-offset-4"
              >
                {t('hero.explore_products')}
              </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
// --- END OF FILE src/components/Hero.tsx ---
