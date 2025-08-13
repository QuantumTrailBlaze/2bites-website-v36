// --- START OF FILE src/components/CtaBeforeFooter.tsx ---

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle, // Import DialogTitle
} from "@/components/ui/dialog";
import ContactForm from '@/components/ContactForm';
import { cn } from '@/lib/utils';

const CtaBeforeFooter: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formTitle = t('ctaBeforeFooter.formTitle');

  return (
    <section className="bg-[#f1fdf3] dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 dark:text-green-400">
          {t('ctaBeforeFooter.title')}
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
          {t('ctaBeforeFooter.subtitle')}
        </p>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="brand"
              size="lg"
              className={cn(
                "mt-6 w-auto font-medium text-base",
                "px-6 py-2 !rounded-md",
                "bg-hero-button text-hero-button-foreground",
                "hover:bg-hero-button-hover",
                "transition-colors duration-200 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hero-button/80 dark:focus-visible:ring-offset-slate-900"
              )}
            >
              {t('ctaBeforeFooter.buttonText')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] p-0 max-h-[90vh] overflow-y-auto">
            {/* ADDED for accessibility */}
            <DialogTitle className="sr-only">{formTitle}</DialogTitle>
            
            <div className="p-6 md:p-8">
              <ContactForm
                formTitle={formTitle}
                requestType={formTitle}
                onFormSubmit={() => {}}
                onCloseModal={() => setIsModalOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CtaBeforeFooter;
// --- END OF FILE src/components/CtaBeforeFooter.tsx ---
