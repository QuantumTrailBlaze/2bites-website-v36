// --- START OF FILE src/components/sections/TestimonialAndPhilosophy.tsx ---

import React from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialAndPhilosophy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold font-serif text-hero-text mb-4">
        {t('testimonial.title')}
      </h2>
      <p className="text-[1.125rem] leading-[1.625] text-gray-700 dark:text-gray-300 mb-8 font-sans">
        {t('testimonial.subtitle')}
      </p>
      <div className="bg-[#E6F4EA] dark:bg-primary/10 p-6 sm:p-8 rounded-xl shadow-lg">
        <blockquote className="relative">
          <p className="text-xl md:text-2xl font-medium font-serif text-primary dark:text-green-300 leading-snug">
            {t('testimonial.quote')}
          </p>
          <footer className="mt-4">
            <p className="text-md text-primary/80 dark:text-green-300/80 font-sans">{t('testimonial.author')}</p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default TestimonialAndPhilosophy;
// --- END OF FILE src/components/sections/TestimonialAndPhilosophy.tsx ---
