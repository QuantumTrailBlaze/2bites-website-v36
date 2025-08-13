import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn'; 
import { Snowflake, Timer, ChefHat } from 'lucide-react';

interface BenefitItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon: Icon, title, description, delay }) => (
  <FadeIn delay={delay}>
    <div className="flex flex-col items-center text-center p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out h-full border border-gray-100 transform hover:-translate-y-1">
      <div className="p-4 bg-[#6CBF3E]/10 rounded-full mb-6">
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#6CBF3E]" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold font-heading mb-3 text-[#205D37]">{title}</h3>
      <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  </FadeIn>
);

const Manifesto: React.FC<{ className?: string }> = ({ className }) => {
  const benefits = [
    {
      icon: Snowflake,
      title: 'Sin Desperdicio',
      description: 'Ingredientes siempre frescos y listos para usar, optimizando tu inventario y reduciendo mermas significativamente.',
      delay: 100,
    },
    {
      icon: Timer,
      title: 'Máxima Eficiencia',
      description: 'Acelera la preparación en cocina y simplifica procesos, permitiendo un servicio más ágil y rentable.',
      delay: 200,
    },
    {
      icon: ChefHat,
      title: 'Sabor Sorprendente',
      description: 'Calidad y consistencia excepcionales que elevan tus platos, deleitan a tus clientes y construyen lealtad.',
      delay: 300,
    },
  ];

  return (
    <section 
      id="benefits" 
      className={cn(
        'py-16 md:py-24 bg-white', // REMOVED mt-16
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center text-[#205D37]">
            Ventajas Clave de Nuestros Ingredientes
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            Descubre cómo nuestros ingredientes liofilizados de alta calidad pueden transformar tu cocina profesional, ofreciendo eficiencia, consistencia y un sabor inigualable.
          </p>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {benefits.map((benefit) => (
            <BenefitItem key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
