import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import InstantSmoothies from "./pages/InstantSmoothies";
import Snacks from "./pages/Snacks";
import Bulk from "./pages/Bulk";
import ScrollToTop from "./components/ScrollToTop";
import UnsubscribePage from "./pages/UnsubscribePage";
import ReceiptPage from "./pages/ReceiptPage"; // Import the new ReceiptPage

const queryClient = new QueryClient();

// This component will manage the language based on the URL parameter
const LanguageManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const supportedLanguages = i18n.options.supportedLngs || ['es', 'ca'];
    // CORRECTED LINE: Replaced && with &&
    if (lang && supportedLanguages.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, location.pathname]);

  return <>{children}</>;
};

const App = () => {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Redirect from the root to the default/detected language */}
            <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
            
            {/* Routes with language parameter */}
            <Route path="/:lang" element={<LanguageManager><Index /></LanguageManager>} />
            <Route path="/:lang/productos/smoothies-instantaneos" element={<LanguageManager><InstantSmoothies /></LanguageManager>} />
            <Route path="/:lang/productos/snacks-naturales" element={<LanguageManager><Snacks /></LanguageManager>} />
            <Route path="/:lang/productos/bulk-horeca" element={<LanguageManager><Bulk /></LanguageManager>} />
            <Route path="/:lang/aviso-legal" element={<LanguageManager><AvisoLegal /></LanguageManager>} />
            <Route path="/:lang/politica-de-privacidad" element={<LanguageManager><PoliticaPrivacidad /></LanguageManager>} />
            <Route path="/:lang/receipt" element={<LanguageManager><ReceiptPage /></LanguageManager>} /> {/* Existing static Receipt Page Route */}
            <Route path="/:lang/receipts/:slug" element={<LanguageManager><ReceiptPage /></LanguageManager>} /> {/* New Dynamic Receipt Page Route */}
            
            {/* Unsubscribe page can be language-agnostic or also have a lang param */}
            <Route path="/unsubscribe" element={<UnsubscribePage />} /> 

            {/* Catch-all Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
