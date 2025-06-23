// hooks/useScrollToTop.js
import { useState, useEffect, useCallback } from 'react';

const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll handler for performance optimization
  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    const threshold = window.innerHeight * 2; // Show after 2 screen heights
    
    setScrollY(currentScrollY);
    setIsVisible(currentScrollY > threshold);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return { isVisible, scrollToTop, scrollY };
};

export default useScrollToTop;
