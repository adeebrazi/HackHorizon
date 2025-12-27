"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import TextBubbleBox from "../assets/webp/TextBubbleBox.webp";

// Section to character expression mapping (using barbarian1-9.webp)
const SECTION_CONFIG = {
  hero: {
    images: [1],
    description: "Welcome to the battlefield, Tech Chief - deploy brains not barbarians!"
  },
  clock: {
    images: [2],
    description: "Step in, Code Knight, your quest begins here!"
  },
  prizepool: {
    images: [3],
    description: "Win prize big enough to make Goblins jealous!"
  },
  tracks: {
    images: [4],
    description: "Choose wisely - This isn't a friendly clan war practice."
  },
  timeline: {
    images: [5],
    description: "The journey map is revealed, follow the path to glory!"
  },
  glimpse: {
    images: [6],
    description: "Hear the legends of past Code Warriors!"
  },
  sponsors: {
    images: [7],
    description: "Join forces with us, mighty Sponsor!"
  },
  collaboration: {
    images: [7],
    description: "Mighty allies unite! Our partners fuel this epic quest!"
  },
  organisers: {
    images: [8],
    description: "Meet the War Council - the brains behind this battle!"
  },
  sponsorus: {
    images: [8],
    description: "Calling all mighty allies, power our event with your resources!"
  },
  faq: {
    images: [9],
    description: "Wisdon scroll, read it before you bother the Elders."
  },
  contact: {
    images: [1],
    description: "Send a Message to the War Chief."
  }
};

// Simplified hook using scroll position
function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of viewport

      let currentSection = "hero";

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionName = element.getAttribute("data-section");
          if (sectionName) {
            currentSection = sectionName;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    // Throttled scroll listener for better performance with passive flag
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener to improve scroll performance
    window.addEventListener("scroll", scrollListener, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return activeSection;
}

export default function VillageGirlAnimation() {
  const activeSection = useActiveSection();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Check if mobile menu is open
  useEffect(() => {
    const checkMenuState = () => {
      const menuOpen = document.body.hasAttribute('data-menu-open');
      setIsMenuOpen(menuOpen);
    };

    // Initial check
    checkMenuState();

    // Watch for changes using MutationObserver
    const observer = new MutationObserver(checkMenuState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-menu-open']
    });

    return () => observer.disconnect();
  }, []);

  // Check if user has scrolled to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      // Check if user is within 100px of the bottom
      const isBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setIsAtBottom(isBottom);
    };

    // Initial check
    handleScroll();

    // Throttled scroll listener
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // Get current section config
  const currentConfig = SECTION_CONFIG[activeSection as keyof typeof SECTION_CONFIG];
  const currentImage = currentConfig?.images[0] || 1;
  const bubbleText = currentConfig?.description || "";

  // Show bubble with delay after section change
  useEffect(() => {
    setShowBubble(false);
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Optimized preloading - preload all barbarian images
  useEffect(() => {
    // Preload all 9 barbarian images
    for (let i = 1; i <= 9; i++) {
      const img = new window.Image();
      img.src = `/VillageBarbarian/barbarian${i}.webp`;
      if (i === 1) {
        img.onload = () => setIsLoaded(true);
      }
    }
  }, []);

  // Don't render if menu is open
  if (isMenuOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.5
          }}
          className="fixed -bottom-[2.5%]  left-0 z-60 pointer-events-none flex "
        >
          {/* Character Image */}
          <AnimatePresence mode="wait" >
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.2
              }}
              className="relative w-32 md:w-40 aspect-1/2 "
            >
          <Image
            src={`/VillageBarbarian/barbarian${currentImage}.webp`}
            alt="Barbarian Character"
            // width={160}
            // height={320}
            fill
            className=" "
            priority
            quality={100}
            sizes="(max-width: 600px) 100vw, 600px"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Speech Bubble - positioned to the right of character */}
      <AnimatePresence mode="wait">
        {showBubble && bubbleText && (
          <motion.div
            key={`bubble-${activeSection}`}
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: 0.1
            }}
            className="relative md:top-8  md:-left-12 top-4 -left-6 "
          >
            <div className="md:w-100 md:h-40 h-24 w-60 relative flex justify-center items-center " >
              <Image src={TextBubbleBox} alt="Text Bubble Box" fill className="object-contain absolute inset-0 z-0  " quality={100} sizes="(max-width: 600px) 100vw, 600px" draggable={false}/>
              <motion.p
                key={bubbleText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 text-black text-center w-full h-full flex justify-center items-center px-12 pt-2 pl-14  text-[9px] md:text-base    uppercase"
              >
                {bubbleText}
              </motion.p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}