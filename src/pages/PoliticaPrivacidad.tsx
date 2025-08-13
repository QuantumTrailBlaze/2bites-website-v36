// --- START OF FILE src/pages/PoliticaPrivacidad.tsx ---

import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PoliticaPrivacidad: React.FC = () => {
  const { t } = useTranslation();

  // Type definition for our structured content for better type safety
  type PrivacySection = {
    title: string;
    content?: string;
    lines?: string[];
    listItems?: string[];
  };

  const sections = t('privacyPolicyPage.sections', { returnObjects: true }) as PrivacySection[];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow pt-[7rem] md:pt-[8rem]">
        <div className="max-w-prose mx-auto px-4 md:px-6 py-12 space-y-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-hero-text mb-8">
            {t('privacyPolicyPage.title')}
          </h1>
          <p className="text-sm text-foreground/80 text-center mb-16">
            {t('privacyPolicyPage.lastUpdated')}
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-primary mb-4">
                  {section.title}
                </h2>
                
                {/* Render simple content paragraph */}
                {section.content && <p className="text-foreground/80">{section.content}</p>}

                {/* Render lines with potential strong tags */}
                {section.lines && section.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-foreground/80 mt-1">
                    <Trans
                      defaults={line}
                      components={{ 1: <strong className="font-semibold text-foreground" /> }}
                    />
                  </p>
                ))}

                {/* Render list items */}
                {section.listItems && (
                  <ul className="list-disc list-inside space-y-1 mt-4 pl-4 text-foreground/80">
                    {section.listItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
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

export default PoliticaPrivacidad;
// --- END OF FILE src/pages/PoliticaPrivacidad.tsx ---
