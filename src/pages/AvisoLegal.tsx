// --- START OF FILE src/pages/AvisoLegal.tsx ---

import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AvisoLegal: React.FC = () => {
  const { t } = useTranslation();

  type LegalSection = {
    title: string;
    content: string;
    listItems?: string[];
  };

  const sections = t('legalNoticePage.sections', { returnObjects: true }) as LegalSection[];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow bg-background pt-[7rem] md:pt-[8rem]">
        <div className="max-w-prose mx-auto px-4 md:px-6 py-12 space-y-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-hero-text mb-8">
            {t('legalNoticePage.title')}
          </h1>
          <p className="text-sm text-foreground/80 text-center mb-16">
            {t('legalNoticePage.lastUpdated')}
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-primary mt-6 mb-4">
                  {section.title}
                </h2>
                <p className="text-foreground/80">{section.content}</p>
                
                {section.listItems && (
                  <ul className="list-disc list-inside space-y-1 my-4 pl-4 text-foreground/80">
                    {section.listItems.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Trans
                          defaults={item}
                          components={{ 1: <strong className="font-semibold text-foreground" /> }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AvisoLegal;
// --- END OF FILE src/pages/AvisoLegal.tsx ---
