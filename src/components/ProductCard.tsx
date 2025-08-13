import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  baseRoute: string;
}

const ProductCard: React.FC<Props> = ({ product, baseRoute }) => {
  const cardContent = (
    <div className="group block border border-border rounded-xl overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary/50 hover:shadow-xl hover:scale-[1.02] bg-white dark:bg-slate-900 flex flex-col h-full">
      {/* Imagen */}
      <div className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center bg-white">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 pb-6 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-semibold font-serif text-green-700 group-hover:text-primary transition-colors duration-200 mb-2 whitespace-nowrap">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-snug whitespace-pre-line flex-grow">
          {product.description}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.map((tag, index) => {
              const TagIcon = tag.icon;
              return (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full"
                >
                  {TagIcon && (
                    <TagIcon
                      className={cn(
                        "w-4 h-4 mr-1.5 flex-shrink-0",
                        tag.iconColorClass
                      )}
                    />
                  )}
                  {tag.text}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return baseRoute ? (
    <Link to={`${baseRoute}/${product.id}`}>
      {cardContent}
    </Link>
  ) : (
    <div className="cursor-default">{cardContent}</div>
  );
};

export default ProductCard;
