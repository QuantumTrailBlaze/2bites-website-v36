// --- START OF FILE src/pages/Snacks.tsx ---

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/ui-custom/Button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { ArrowLeft, CheckCircle2, Leaf, Snowflake } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContactForm from '@/components/ContactForm';

// Static, non-translatable data for snack products
const productsStaticData = [
  {
    id: 'snack-strawberry',
    imageSrc: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/snacks_naturales/snack_fresas_hero_sd.webp',
  },
  {
    id: 'snack-pineapple',
    imageSrc: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/snacks_naturales/snack_pina_hero_sd.webp',
  },
  {
    id: 'snack-peach',
    imageSrc: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/snacks_naturales/snack_melocoton_hero_sd.webp',
  },
  {
    id: 'snack-banana',
    imageSrc: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/snacks_naturales/snack_platano_hero_sd.webp',
  },
];

const Snacks: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const budgetRequestType = t('snacksPage.form.requestType');

  const openBudgetModal = () => {
    setIsBudgetModalOpen(true);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`/${currentLang}/#products`);
  };

  // Combine static and translated data
  const translatedProducts = t('snacksPage.productList', { returnObjects: true }) as { name: string; description: string; imageAlt: string; }[];
  const translatedTags = t('snacksPage.tags', { returnObjects: true }) as { noCooling: string; vegan: string; };

  const productsData: Product[] = productsStaticData.map((staticProd, index) => ({
    ...staticProd,
    ...translatedProducts[index],
    tags: [
      { text: translatedTags.noCooling, icon: Snowflake, iconColorClass: 'text-blue-500' },
      { text: translatedTags.vegan, icon: Leaf, iconColorClass: 'text-green-600' }
    ],
  }));

  const keyBenefits = t('snacksPage.keyBenefits', { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground"> 
      <Header />
      
      <div className="w-full bg-white border-b border-border/10 shadow-md z-[50] sticky top-[7.5rem] md:top-[8.5rem]">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <Link 
            to={`/${currentLang}/#products`}
            onClick={handleBackClick}
            className="inline-flex items-center text-green-700 hover:underline text-sm gap-1 group transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t('snacksPage.backToProducts')}
          </Link>
        </div>
      </div>
      
      <main className="flex-grow pt-[10.75rem] md:pt-[11.75rem] bg-white text-foreground">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <section className="grid md:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-hero-text mb-6 animate-fade-in-down">
                {t('snacksPage.hero.title')}
              </h1>
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
                {t('snacksPage.hero.subtitle')}
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="animate-fade-in-up animation-delay-400"
                onClick={openBudgetModal}
              >
                {t('snacksPage.hero.ctaButton')}
              </Button>
            </div>
            <div className="flex justify-center md:justify-end animate-fade-in animation-delay-300">
              <img 
                src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/portfolio/snacks_fresas_trozos.webp" 
                alt={t('snacksPage.hero.imageAlt')}
                className="rounded-xl shadow-2xl w-full max-w-md md:max-w-none object-cover aspect-[4/5] md:aspect-auto md:h-auto max-h-[500px]"
              />
            </div>
          </section>
          
          <section className="py-16 md:py-20 border-t border-border/20 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-primary mb-12 md:mb-16">
              {t('snacksPage.productsTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          </section>

          <section className="py-16 md:py-20 border-t border-border/20 animate-fade-in-up animation-delay-200">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-primary mb-12 md:mb-16">
              {t('snacksPage.benefitsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-2">
                  <CheckCircle2 
                    className="w-6 h-6 text-primary flex-shrink-0 mt-1" 
                    aria-hidden="true" 
                  />
                  <span className="text-lg text-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 md:py-20 animate-fade-in-up animation-delay-300">
            <div className="border border-border rounded-xl p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 md:gap-x-12 items-center">
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                  <div className="w-full sm:w-1/2">
                    <img 
                      src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/snacks_naturales/snak_iogurt_inspiration.webp" 
                      alt={t('snacksPage.inspiration.imageAlt1')}
                      className="rounded-lg shadow-md w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <img 
                      src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/product/snacks_naturales/snack_melocoton_inspiration.webp" 
                      alt={t('snacksPage.inspiration.imageAlt2')}
                      className="rounded-lg shadow-md w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center text-center animate-fade-in-up animation-delay-500">
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 md:mb-6">
                    {t('snacksPage.inspiration.title')}
                  </h2>
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 md:mb-8 max-w-md">
                    {t('snacksPage.inspiration.subtitle')}
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={openBudgetModal}
                  >
                    {t('snacksPage.inspiration.ctaButton')}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <Dialog open={isBudgetModalOpen} onOpenChange={setIsBudgetModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <ContactForm 
            formTitle={t('snacksPage.form.title')}
            requestType={budgetRequestType}
            onCloseModal={() => setIsBudgetModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Snacks;
// --- END OF FILE src/pages/Snacks.tsx ---
