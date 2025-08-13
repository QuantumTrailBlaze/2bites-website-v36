import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'hero';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        {
          // Apply general rounding, specific rounding for hero variant will override if needed
          'rounded-md': variant !== 'hero', // Default rounding for other variants
          'rounded-lg': variant === 'hero', // Specific rounding for hero
        },
        {
          'bg-gray-600 text-white hover:bg-gray-700': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input bg-transparent hover:bg-accent/10': variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'text-gray-600 underline-offset-4 hover:underline': variant === 'link',
          // Hero variant styles using colors from tailwind.config.ts
          'bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover shadow-lg transform hover:scale-105': variant === 'hero',
          'h-9 px-4 py-2 text-sm': size === 'sm',
          'h-10 px-5 py-2 text-base': size === 'md', // Ensure consistent base size for md
          'h-12 px-8 py-3 text-lg': size === 'lg', // Made lg button a bit larger
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
