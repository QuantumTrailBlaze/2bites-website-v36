import React from 'react';
import { Zap, Recycle, Leaf, Package, ShieldCheck, Lightbulb } from 'lucide-react'; // Added more icons for variety
import FadeIn from './animations/FadeIn';

interface TechnologyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const technologyData: TechnologyItem[] = [
  {
    icon: <Zap size={40} className="text-green-600 dark:text-green-400 mb-3" />,
    title: 'Liofilización Avanzada',
    description: 'Tecnología de vanguardia que preserva el 90% de los nutrientes, sabor y color original de los alimentos frescos.',
  },
  {
    icon: <Recycle size={40} className="text-green-600 dark:text-green-400 mb-3" />,
    title: 'Economía Circular',
    description: 'Reducimos el desperdicio alimentario transformando frutas y verduras "imperfectas" en productos de alto valor.',
  },
  {
    icon: <Leaf size={40} className="text-green-600 dark:text-green-400 mb-3" />,
    title: '100% Natural, Sin Aditivos',
    description: 'Nuestros productos son puros, sin azúcares añadidos, conservantes ni colorantes. Solo fruta y verdura real.',
  },
  {
    icon: <ShieldCheck size={40} className="text-green-600 dark:text-green-400 mb-3" />, // Changed icon for variety
    title: 'Calidad y Seguridad', // Changed title for variety
    description: 'Comprometidos con el planeta y tu bienestar, utilizamos envases reciclables y procesos seguros.',
  },
];

const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 text-center mb-12">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-green-400">
            Tecnología & Sostenibilidad
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 font-sans max-w-2xl mx-auto">
            Innovación al servicio del sabor y del planeta. Descubre cómo nuestra tecnología de liofilización y nuestro compromiso con la sostenibilidad marcan la diferencia.
          </p>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"> {/* Updated classes for mobile 2x2 grid */}
          {technologyData.map((item, index) => (
            <FadeIn key={item.title} delay={index * 150 + 300}>
              <div className="flex flex-col items-center text-center p-6 h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-slate-700/50 transition-all duration-300 transform hover:-translate-y-1">
                {item.icon}
                <h3 className="text-lg md:text-xl font-semibold font-serif text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-sans text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
