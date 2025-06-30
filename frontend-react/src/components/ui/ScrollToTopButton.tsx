import React from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import useScrollToTop from '@/hooks/useScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';  // Make sure framer-motion is installed

import { useChatStore } from '@/store/useChatStore';


const ScrollToTopButton = () => {
const { isVisible, scrollToTop } = useScrollToTop();

const { isChatOpen } = useChatStore();
  return (
    <AnimatePresence>
      {isVisible && !isChatOpen &&(

        <motion.button
          key="scrollToTop"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`

            fixed bottom-30 right-4

            z-[9999]
            w-14 h-14
            rounded-full
            border border-border/40

            bg-primary/90 dark:bg-primary/100

            text-primary-foreground
            backdrop-blur-md
            shadow-xl shadow-ring/40
            focus:outline-none focus:ring-4 focus:ring-ring/40
            overflow-hidden
            group
          `}
        >
          {/* Glowing pulse layer */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />

          {/* Subtle ripple hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/30 blur-sm animate-ripple" />

          {/* Icon container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <ChevronUpIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
