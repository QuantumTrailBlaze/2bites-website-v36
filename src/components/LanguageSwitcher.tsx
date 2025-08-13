import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const languages = [
  { code: 'es', name: 'ES' },
  { code: 'ca', name: 'CA' },  
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (langCode: string) => {
    const currentPath = location.pathname;
    const currentLang = i18n.language;
    // Replace the current language code in the path with the new one
    const newPath = currentPath.startsWith(`/${currentLang}`) 
      ? `/${langCode}${currentPath.substring(currentLang.length + 1)}`
      : `/${langCode}${currentPath}`;
      
    i18n.changeLanguage(langCode);
    navigate(newPath);
  };

  return (
    <div className="flex items-center space-x-1 bg-white/50 dark:bg-slate-800/50 p-1 rounded-md">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? 'secondary' : 'ghost'}
          onClick={() => changeLanguage(lang.code)}
          size="sm"
          className="px-2 py-1 h-auto text-xs font-bold"
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
