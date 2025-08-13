// --- START OF FILE src/components/Header.tsx ---

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher'; // Import the new component

// Use translation keys instead of hardcoded labels
const navLinksDefinition = [
  { href: '#home', labelKey: 'header.nav_home' }, 
  { href: '#why-choose-us', labelKey: 'header.nav_advantages' }, 
  { href: '#products', labelKey: 'header.nav_products' },
  { href: '#applications', labelKey: 'header.nav_applications' },
  { href: '#how-it-works', labelKey: 'header.nav_technology' },  
  { href: '#about', labelKey: 'header.nav_about' },
  { href: '#community', labelKey: 'header.nav_community' },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pathWithHash: string) => {
    e.preventDefault();
    const isHomePage = location.pathname === `/${currentLang}`;
    const hashIndex = pathWithHash.indexOf('#');
    const hash = hashIndex !== -1 ? pathWithHash.substring(hashIndex) : '';
    const targetId = hash.substring(1);

    // CORRECTED LINE: Replaced && with &&
    if (isHomePage && targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      navigate(pathWithHash);
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  const homeLogoLink = `/${currentLang}/#home`;
  const contactLink = `/${currentLang}/#contact`;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-24 md:h-28"> 
        <Link to={homeLogoLink} className="flex items-center space-x-2">
          <img 
            src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/logos/2bitesco_logo.webp" 
            alt="2bites Co Logo" 
            className={cn('h-20 md:h-24 transition-all duration-300')}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinksDefinition.map((link) => {
            const pathWithHash = `/${currentLang}/${link.href}`;
            return (
              <a
                key={link.labelKey}
                href={pathWithHash}
                onClick={(e) => handleLinkClick(e, pathWithHash)}
                className="font-medium text-base hover:text-[#6CBF3E] transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-[#6CBF3E]/50 text-hero-text"
              >
                {t(link.labelKey)}
              </a>
            );
          })}
          <a
            href={contactLink} 
            onClick={(e) => handleLinkClick(e, contactLink)}
            className="ml-2 w-auto self-center font-medium text-base px-5 py-2 !rounded-md bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover transition-colors duration-200 ease-in-out"
          >
            {t('header.contact_button')}
          </a>
          <LanguageSwitcher />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6CBF3E] text-hero-text"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-white transition-opacity duration-300 ease-in-out',
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={() => setIsMobileMenuOpen(false)} 
      >
        <nav 
          className="flex flex-col items-center justify-center h-full space-y-8"
          onClick={(e) => e.stopPropagation()} 
        >
          {navLinksDefinition.map((link) => {
            const pathWithHash = `/${currentLang}/${link.href}`;
            return (
              <a
                key={link.labelKey}
                href={pathWithHash}
                onClick={(e) => handleLinkClick(e, pathWithHash)}
                className="font-semibold text-2xl hover:text-[#6CBF3E] transition-colors duration-200 text-hero-text"
              >
                {t(link.labelKey)}
              </a>
            );
          })}
          <a
            href={contactLink} 
            onClick={(e) => handleLinkClick(e, contactLink)}
            className="mt-6 px-8 py-3 text-lg font-medium text-white bg-[#6CBF3E] rounded-lg hover:bg-[#58a834] transition-colors"
          >
            {t('header.contact_button')}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
// --- END OF FILE src/components/Header.tsx ---
