// --- START OF FILE src/components/About.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Settings2, CalendarDays, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutProps {
  className?: string;
}

// Static, non-translatable data, including icons
const benefitsStaticData = [
  { id: 'selection', icon: <Search /> },
  { id: 'efficiency', icon: <Settings2 /> },
  { id: 'quality', icon: <CalendarDays /> },
];

interface TranslatableBenefit {
  title: string;
  texts: string[];
}

const About: React.FC<AboutProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Combine static and translated data
  const translatedBenefits = t('aboutSection.benefits', { returnObjects: true }) as TranslatableBenefit[];
  const benefits = benefitsStaticData.map((staticBenefit, index) => ({
    ...staticBenefit,
    ...translatedBenefits[index],
  }));

  const imageUrl = "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/about/imagen_presentacion_nosotros.webp"; 

  // The CTA link should point to a language-specific contact section or page
  const ctaLink = `/${currentLang}/#contact`;

  return (
    <section 
      id="about" 
      className={cn('pt-20 md:pt-32 pb-4 md:pb-6 bg-slate-50 dark:bg-slate-800 overflow-hidden', className)}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-green-400">
            {t('aboutSection.title')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-sans leading-relaxed animate-fade-in-up animation-delay-400">
            {t('aboutSection.subtitle')}
          </p>          
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24 items-start">
          <div className="space-y-10 mb-12 lg:mb-0">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.id} 
                className="flex items-start space-x-4 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                  {React.cloneElement(benefit.icon, { size: 28, className: "text-primary dark:text-green-400" })}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-1.5">{benefit.title}</h3>
                  {benefit.texts.map((text, idx) => (
                    <p key={idx} className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed mt-1 first:mt-0">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div 
            className="flex items-center justify-center lg:justify-start animate-fade-in-up"
            style={{ animationDelay: `${600 + benefits.length * 150}ms` }}
          >
            <div className="overflow-hidden rounded-xl shadow-3xl w-full max-w-lg lg:max-w-none mx-auto">
              <img
                src={imageUrl}
                alt={t('aboutSection.imageAlt')}
                className="rounded-lg object-cover w-full h-auto aspect-[4/3] sm:aspect-video lg:aspect-[5/4] max-h-[400px] md:max-h-[450px] lg:max-h-[520px]"
              />
            </div>
          </div>
        </div>

        <div 
          className="mt-12 lg:mt-16 text-center lg:text-left animate-fade-in-up"
          style={{ animationDelay: `${800 + benefits.length * 150}ms` }}
        >
          <Link
            to={ctaLink}
            className="inline-flex items-center text-lg font-semibold text-hero-button-DEFAULT hover:text-hero-button-hover transition-colors duration-300 group"
          >
            {t('aboutSection.cta')}
            <ArrowRight size={22} className="ml-2.5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
// --- END OF FILE src/components/About.tsx ---
