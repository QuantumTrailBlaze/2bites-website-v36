// --- START OF FILE src/components/HowItWorks.tsx ---

import React from 'react';
import { useTranslation } from 'react-i18next';
import FadeIn from '@/components/animations/FadeIn';

// Static data (non-translatable) for phases
const phasesStaticData = [
  {
    id: 'selection',
    iconUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_seleccion_corte_web.webp',
  },
  {
    id: 'freezing',
    iconUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_congelacion_rapida_web.webp',
  },
  {
    id: 'sublimation',
    iconUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_sublimacion_web.webp',
  },
  {
    id: 'packaging',
    iconUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_envasado_ecologico_web.webp',
  },
];

// Static data for benefits
const benefitsStaticData = [
  {
    id: 'vitaminas',
    imageUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_vitaminas_intactas.webp',
  },
  {
    id: 'sabor',
    imageUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_sabor_autentico.webp',
  },
  {
    id: 'desperdicio',
    imageUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/howitworks/icono_cero_desperdicio.webp',
  },
];

// Interfaces for type safety
interface TranslatablePhase {
  phaseNumber: string;
  title: string;
  description: string;
  altText: string;
}

interface TranslatableBenefit {
  title: string;
  description: string;
  altText: string;
}

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  // Combine static and translated data for phases
  const translatedPhases = t('howItWorksSection.phases', { returnObjects: true }) as TranslatablePhase[];
  const phases = phasesStaticData.map((staticPhase, index) => ({
    ...staticPhase,
    ...translatedPhases[index],
  }));

  // Combine static and translated data for benefits
  const translatedBenefits = t('howItWorksSection.benefits', { returnObjects: true }) as TranslatableBenefit[];
  const benefits = benefitsStaticData.map((staticBenefit, index) => ({
    ...staticBenefit,
    ...translatedBenefits[index],
  }));

  const benefitsTitleDelay = phases.length * 150 + 200;

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn delay={100}>
          <div className="max-w-7xl mx-auto px-4 text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-green-400">
              {t('howItWorksSection.mainTitle')}
            </h2>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t('howItWorksSection.mainSubtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {phases.map((phase, index) => (
            <FadeIn key={phase.id} delay={(index + 1) * 150 + 100}>
              <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg h-full">
                <img
                  src={phase.iconUrl}
                  alt={phase.altText}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain mb-6 rounded-lg"
                  loading="lazy"
                />
                <h3 className="text-xl md:text-2xl font-serif font-bold text-accent dark:text-green-500 mb-2">
                  {phase.phaseNumber}
                </h3>
                <h4 className="text-base md:text-lg font-serif font-bold text-primary dark:text-green-300 uppercase tracking-wider mb-3">
                  {phase.title}
                </h4>
                <p className="font-sans text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-4 md:pt-6">
          <FadeIn delay={benefitsTitleDelay}>
            <div className="text-center mb-6 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary dark:text-green-400 mb-3">
                {t('howItWorksSection.benefitsTitle')}
              </h3>
              <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                {t('howItWorksSection.benefitsSubtitle')}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.id} delay={benefitsTitleDelay + (index + 1) * 100}>
                <div className="flex flex-col items-center text-center p-4 rounded-lg shadow-sm h-full">
                  <img
                    src={benefit.imageUrl}
                    alt={benefit.altText}
                    className="w-24 h-24 object-contain mb-4"
                    loading="lazy"
                  />
                  <h4 className="text-xl font-serif font-bold text-primary dark:text-green-300 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="font-sans text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
// --- END OF FILE src/components/HowItWorks.tsx ---
