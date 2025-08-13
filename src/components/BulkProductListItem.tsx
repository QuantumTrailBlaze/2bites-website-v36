import React from 'react';
import { Product } from '@/types/product';
import { Leaf, Snowflake } from 'lucide-react';

interface Props {
  product: Product;
}

const BulkProductListItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-primary/50">
      {/* Image Section */}
      <div className="md:w-1/3 lg:w-2/5 flex-shrink-0 bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="object-cover w-full h-56 md:h-full md:absolute md:inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6 flex flex-col justify-center flex-grow">
        <h3 className="text-xl lg:text-2xl font-semibold font-serif text-green-700 dark:text-green-400 group-hover:text-primary transition-colors duration-200 mb-2">
          {product.name}
        </h3>
        <div 
          className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: product.description.replace(/• /g, '<span class="mr-1.5 text-primary">&#8226;</span>').replace(/\n/g, '<br />') }}
        />

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag, index) => {
              const TagIcon = tag.icon;
              return (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full"
                >
                  {TagIcon && (
                    <TagIcon 
                      className={`w-4 h-4 mr-1.5 flex-shrink-0 ${tag.iconColorClass || ''}`} 
                    />
                  )}
                  {tag.text}
                </span>
              );
            })}
          </div>
        )}
        {/* 
          If you want a CTA button here, uncomment and adjust:
          <div className="mt-auto pt-4">
            <Button variant="outlinePrimary" size="sm">Ver detalles</Button>
          </div> 
        */}
      </div>
    </div>
  );
};

export default BulkProductListItem;
