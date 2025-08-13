// --- START OF FILE src/components/WhyChooseUs.tsx ---

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui-custom/Button';

interface BenefitItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconAriaLabel: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon: Icon, title, description, iconAriaLabel }) => (
  <div className="flex items-start space-x-4">
    <FadeIn delay={100} className="flex-shrink-0">
      <Icon className="w-7 h-7 text-hero-button" aria-label={iconAriaLabel} />
    </FadeIn>
    <FadeIn delay={200} className="flex-grow">
      <h4 className="text-lg font-sans font-semibold text-gray-800 dark:text-gray-100">{title}</h4>
      <p className="mt-1 font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed">{description}</p>
    </FadeIn>
  </div>
);

const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();
  
  // The structure is kept here, but the text is fetched from the translation files.
  // The 'returnObjects' flag tells i18next to return the array from the JSON.
  const benefitsData = t('whyChooseUs.benefits', { returnObjects: true }) as Array<{title: string, description: string, ariaLabel: string}>;
  
  // We map the translated data to include the non-translatable icon.
  const benefits = benefitsData.map(benefit => ({
    ...benefit,
    icon: CheckCircle2,
  }));

  const imageUrl = "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/whychooseus/WhyUs.webp";

  const handleCTAClick = () => {
    const targetElement = document.getElementById('how-it-works');
    if (targetElement) {
      const headerOffset = 80; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="why-choose-us" className="bg-white dark:bg-slate-900 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Columna Izquierda: Texto y Beneficios */}
          <div className="order-2 md:order-1">
            <FadeIn delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-[#205D37] dark:text-green-400">
                {t('whyChooseUs.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-xl font-sans text-neutral-700 dark:text-neutral-300 mb-8 md:mb-10">
                {t('whyChooseUs.subtitle')}
              </p>
            </FadeIn>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <BenefitItem
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  iconAriaLabel={benefit.ariaLabel}
                />
              ))}
            </div>

            <FadeIn delay={400} className="mt-10 flex justify-start">
              <Button
                onClick={handleCTAClick}
                 className={cn(
                          "w-auto font-medium text-base",
                          "px-6 py-2 !rounded-md",
                          "bg-hero-button text-hero-button-foreground",
                          "hover:bg-hero-button-hover",
                          "transition-colors duration-200 ease-in-out",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hero-button/80 dark:focus-visible:ring-offset-slate-900"
                        )}
                aria-label={t('whyChooseUs.ctaAriaLabel')}
              >
                {t('whyChooseUs.ctaButton')}
              </Button>
            </FadeIn>
          </div>

          {/* Columna Derecha: Imagen - Added hidden md:block */}
          <FadeIn delay={300} className="order-1 md:order-2 hidden md:block">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg dark:shadow-slate-700/50 aspect-w-4 aspect-h-3">
              <img
                src={imageUrl}
                alt={t('whyChooseUs.imageAlt')}
                className="w-full h-full object-contain transform transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
// --- END OF FILE src/components/WhyChooseUs.tsx ---
