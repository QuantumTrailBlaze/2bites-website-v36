// --- START OF FILE src/components/Community.tsx ---

import React from 'react';
import { useTranslation } from 'react-i18next';
import TestimonialAndPhilosophy from './sections/TestimonialAndPhilosophy';
import { Instagram as InstagramIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommunityProps {
  className?: string;
}

// Static data for the Instagram grid
const instagramImagesStaticData = [
  { 
    id: 'bowl_breakfast', 
    src: "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/instagram/bowl_breakfast.webp", 
    altKey: 'communitySection.imageAlts.bowl',
    gridClass: "col-start-2 row-start-1 row-span-2"
  },
  { 
    id: 'smoothies', 
    src: "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/instagram/smooties.webp", 
    altKey: 'communitySection.imageAlts.smoothies',
    gridClass: "col-start-1 row-start-2"
  },
  { 
    id: 'tea', 
    src: "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/instagram/tea.webp", 
    altKey: 'communitySection.imageAlts.tea',
    gridClass: "col-start-1 row-start-1" 
  },
];

const Community: React.FC<CommunityProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <section 
      id="community" 
      className={cn('py-20 md:py-32 bg-gray-50 dark:bg-slate-900 overflow-hidden', className)}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-baseline">
          
          <TestimonialAndPhilosophy />

          <div className="animate-fade-in-up lg:animation-delay-200">
            <h2 className="text-3xl font-bold font-serif text-primary mb-4"> 
              {t('communitySection.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-8 font-sans leading-relaxed">
              {t('communitySection.subtitle')}
            </p>
            
            <div className="grid grid-cols-[2fr_3fr] grid-rows-2 gap-3 mb-8 aspect-square max-w-sm mx-auto lg:max-w-md lg:mx-0">
              {instagramImagesStaticData.map((img) => (
                <div 
                  key={img.id} 
                  className={cn(
                    "overflow-hidden rounded-xl shadow-lg group",
                    img.gridClass
                  )}
                >
                  <img 
                    src={img.src} 
                    alt={t(img.altKey)} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                  />
                </div>
              ))}
            </div>

            <a
              href="https://instagram.com/2bitesco" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-300 group shadow-md hover:shadow-lg"
            >
              <InstagramIcon size={20} className="mr-2.5 transition-transform duration-300 group-hover:rotate-12" />
              @2bitesco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
// --- END OF FILE src/components/Community.tsx ---
