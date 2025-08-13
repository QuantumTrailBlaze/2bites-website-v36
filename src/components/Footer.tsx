// --- START OF FILE src/components/Footer.tsx ---

import React from 'react';
import { Instagram } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Static data for nav links (IDs won't change)
  const navLinksStatic = [
    { id: 'home' },
    { id: 'products' },
    { id: 'applications' },
    { id: 'about' },
    { id: 'contact' },
  ];

  // Fetch translated labels and combine with static data
  const translatedNavLinks = t('footer.navLinks', { returnObjects: true }) as { label: string }[];
  const navLinks = navLinksStatic.map((link, index) => ({
    ...link,
    ...translatedNavLinks[index],
  }));

  const handleScrollToSection = (id: string, event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => {
    if (event) event.preventDefault();

    const isHomePage = location.pathname === `/${currentLang}`;
    
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // If not on the homepage, navigate to it with the hash
      navigate(`/${currentLang}/#${id}`);
    }
  };

  return (
    <footer id="contact" className="bg-background text-primary">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          
          <div className="space-y-4">
            <span
              onClick={(e) => handleScrollToSection('home', e)}
              className="inline-block text-2xl font-serif font-bold text-primary hover:opacity-80 transition-opacity cursor-pointer"
            >
              2bites company
            </span>
            <p className="text-sm text-[#5C5C5C] leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary tracking-tight">{t('footer.navTitle')}</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={(e) => handleScrollToSection(link.id, e)}
                    className="text-sm text-[#5C5C5C] hover:text-primary transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary tracking-tight">{t('footer.contactTitle')}</h3>
            <ul className="space-y-2.5 text-sm text-[#5C5C5C]">
              <li>
                <a href="mailto:info@2bitesco.com" className="hover:text-primary transition-colors">
                  Email: info@2bitesco.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/34636393260" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  WhatsApp: +34 636 393 260
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <a 
                href="https://instagram.com/2bitesco" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={t('footer.instagramAriaLabel')}
                className="inline-block text-primary hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-xs text-[#5C5C5C] space-y-3 md:space-y-0">
            <p>{t('footer.copyright', { year: currentYear })}</p>
            <div className="space-x-3">
              <Link to={`/${currentLang}/aviso-legal`} className="hover:text-primary transition-colors">{t('footer.legalNotice')}</Link>
              <span className="select-none">·</span>
              <Link to={`/${currentLang}/politica-de-privacidad`} className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// --- END OF FILE src/components/Footer.tsx ---
