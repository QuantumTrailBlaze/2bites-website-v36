import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// import Manifesto from '@/components/Manifesto';
import Product from '@/components/Product';
import Applications from '@/components/Applications'
import About from '@/components/About'; 
import Community from '@/components/Community';
import CtaBeforeFooter from '@/components/CtaBeforeFooter'; 
import Footer from '@/components/Footer';
// import IngredientShowcase from '@/components/IngredientShowcase';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';

const Index = () => {
  const location = useLocation(); // Get location object

  useEffect(() => {
    // This effect handles scrolling to a section if the URL has a hash
    // This is primarily for when navigating from another page to a section on Index.
    const scrollToHashSection = () => {
      if (location.hash) {
        const targetId = location.hash.substring(1); // Remove #
        const targetElement = document.getElementById(targetId);
        const headerElement = document.querySelector('header');

        if (targetElement && headerElement) {
          // Use a timeout to ensure the header has rendered and its height is stable,
          // and the target element is fully in the DOM.
          setTimeout(() => {
            const headerOffset = headerElement.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 150); // Adjusted timeout slightly
        } else if (targetElement) {
          // Fallback if headerElement is not found quickly
          setTimeout(() => {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Default offset
              behavior: 'smooth'
            });
          }, 150);
        }
      }
    };

    scrollToHashSection();

    // The previous global click handler for 'a[href^="#"]' is removed.
    // Navigation link clicks are now handled by the Header component itself.
    // If you have other anchor links within the Index page content that need smooth scrolling,
    // you would add specific handlers or a more refined generic handler here.

  }, [location]); // Re-run this effect if the location (e.g., hash) changes

  return (
    <main className="relative bg-background text-foreground">
      <Header />
      <Hero /> {/* Assumed id="home" is inside Hero or its wrapper */}
			<WhyChooseUs /> {/* Assumed id="why-choose-us" is inside WhyChooseUs or its wrapper */}
      <Product />      {/* Assumed id="products" is inside Product or its wrapper */}
			<Applications /> {/* Assumed id="applications" is inside Applications or its wrapper */}
			<HowItWorks />  {/* Assumed id="how-it-works" is inside HowItWorks or its wrapper */}
      <About />  {/* Assumed id="about" is inside About or its wrapper */}
      <Community /> {/* Assumed id="community" is inside Community or its wrapper */}
      <CtaBeforeFooter /> {/* Assumed id="contact" is inside CtaBeforeFooter or its wrapper */}
      <Footer />
    </main>
  );
};

export default Index;
