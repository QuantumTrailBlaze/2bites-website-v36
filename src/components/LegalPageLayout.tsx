import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ children, title, lastUpdated }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const logoUrl = "https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/logos/2bitesco_logo.webp";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border/30 shadow-sm sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="block hover:opacity-80 transition-opacity" aria-label="Volver a la página de inicio de 2bites">
            <img 
              src={logoUrl} 
              alt="2bites Company Logo" 
              className="h-20 md:h-24 w-auto" // Updated classes to match main page header
            />
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-8 md:mb-12 text-center">{title}</h1>
          <div className="space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
            {children}
          </div>
        </div>
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border/30 text-center bg-background/50">
        <div className="max-w-3xl mx-auto text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 2bites Company. Todos los derechos reservados.</p>
          <p>Última actualización: {lastUpdated}</p>
          <nav className="mt-4 space-x-4">
            <button 
              onClick={() => handleNavigate('/aviso-legal')} 
              className="hover:text-primary transition-colors"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
            >
              Aviso Legal
            </button>
            <span className="text-muted-foreground/50">|</span>
            <button 
              onClick={() => handleNavigate('/politica-de-privacidad')} 
              className="hover:text-primary transition-colors"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
            >
              Política de Privacidad
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LegalPageLayout;
