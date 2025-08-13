import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  threshold?: number; // Intersection Observer threshold
  triggerOnce?: boolean;
  as?: React.ElementType; // Allows specifying the wrapper element type
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  triggerOnce = true,
  as: Component = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          } else if (!triggerOnce) {
            setIsVisible(false); // Re-trigger if element scrolls out and then back in
          }
        });
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, triggerOnce]);

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.17, 0.55, 0.55, 1)', // Smoother ease-out
    transitionDelay: `${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)', // Subtle upward movement
  };

  return (
    <Component ref={elementRef} className={cn(className)} style={style}>
      {children}
    </Component>
  );
};

export default FadeIn;
