import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn'; // Assuming FadeIn component exists at this path

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  animationDelay: number;
}

const ShowcaseCard: React.FC<CardProps> = ({ title, description, imageUrl, altText, animationDelay }) => {
  return (
    <FadeIn delay={animationDelay} className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
      <div className="relative w-full h-60 sm:h-72 md:h-64 lg:h-72"> {/* Consistent image height */}
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-sans font-semibold text-gray-900 mb-3"> {/* Changed from text-2xl to text-xl */}
          {title}
        </h3>
        <p className="text-sm font-sans text-gray-700 leading-relaxed"> {/* Changed from text-base to text-sm */}
          {description}
        </p>
      </div>
    </FadeIn>
  );
};

interface IngredientShowcaseProps {
  className?: string;
}

const IngredientShowcase: React.FC<IngredientShowcaseProps> = ({ className }) => {
  const cardsData = [
    {
      title: 'Ingredientes Frescos',
      description: 'Vibrantes, jugosos y llenos de vida, tal como la naturaleza los ofrece. Pura frescura lista para inspirar.',
      imageUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/images/2bites_fresh_fruits.jpg',
      altText: 'Un tazón de bayas frescas representando ingredientes frescos',
      animationDelay: 200,
    },
    {
      title: 'Liofilizados 2Bites',
      description: 'La misma explosión de sabor y nutrientes, ingeniosamente conservados para tu conveniencia y creatividad culinaria.',
      imageUrl: 'https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/images/2bites_freeze_dried_fruits.jpg',
      altText: 'Frutas liofilizadas de 2Bites mostrando su textura y color vibrante',
      animationDelay: 300,
    },
  ];

  return (
    <section 
      id="comparison" 
      className={cn(
        'py-16 md:py-24 bg-background', // Using bg-background, assuming it's white or very light gray
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn delay={100} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center text-[#205D37]">
            Del Campo a tu Despensa, Sabor Intacto
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            Observa cómo los ingredientes liofilizados conservan textura y sabor al instante.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch"> {/* Added items-stretch for equal height cards */}
          {cardsData.map((card) => (
            <ShowcaseCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              altText={card.altText}
              animationDelay={card.animationDelay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientShowcase;
