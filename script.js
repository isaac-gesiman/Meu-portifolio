/**
 * Isaac Gesiman Portfolio - JavaScript
 * GSAP Animations: Text Scramble, Typewriter, Decoded, NeonSign
 */

(function() {
  'use strict';

  // =============================================
  // GSAP Plugin Registration
  // =============================================
  gsap.registerPlugin(TextPlugin, ScrollTrigger);

  // =============================================
  // Configuration
  // =============================================
  const CONFIG = {
    hero: {
      titleText: 'Isaac Gesiman',
      subtitleText: 'Desenvolvedor Front-End & Full Stack | Criando experiências digitais incríveis'
    },
    animation: {
      fadeInDuration: 1,
      staggerDelay: 0.1,
      scrollTriggerStart: 'top 85%',
      scrollTriggerEnd: 'bottom 15%'
    }
  };

  // =============================================
  // DOM Elements
  // =============================================
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');

  // =============================================
  // Hero Animations - Text Scramble Effect
  // =============================================
  function initHeroAnimations() {
    // Set initial state
    heroTitle.style.opacity = 1;
    heroSubtitle.style.opacity = 1;

    // Typewriter effect for title with scramble
    const titleChars = CONFIG.hero.titleText.split('');
    let titleHTML = '';

    titleChars.forEach((char, index) => {
      const delay = index * 0.05;
      const isSpace = char === ' ';
      titleHTML += isSpace
        ? '<span class="char" style="opacity: 0;">&nbsp;</span>'
        : `<span class="char" style="opacity: 0;" data-char="${char}">${char}</span>`;
    });

    heroTitle.innerHTML = titleHTML;

    // Animate each character with typewriter + scramble effect
    const chars = heroTitle.querySelectorAll('.char');

    chars.forEach((char, index) => {
      const originalChar = char.dataset.char || ' ';
      const delay = index * 0.08;

      // Sequence: fade in → scramble → settle
      const tl = gsap.timeline({ delay: delay });

      // Random characters for scramble effect
      const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

      tl.to(char, {
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out'
      })
      .to(char, {
        text: {
          value: () => {
            // Generate random text during scramble
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          },
          type: 'chars'
        },
        duration: 0.05,
        repeat: 3,
        ease: 'none'
      })
      .to(char, {
        text: originalChar,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    // Decoded effect for subtitle (words appear with decode animation)
    const subtitleWords = CONFIG.hero.subtitleText.split(' ');
    let subtitleHTML = '';

    subtitleWords.forEach((word, index) => {
      const wordChars = word.split('').map(char =>
        `<span class="word-char" data-char="${char}">${char}</span>`
      ).join('');
      subtitleHTML += `<span class="word" style="opacity: 0; display: inline-block; margin-right: 0.3em;">${wordChars}</span>`;
    });

    heroSubtitle.innerHTML = subtitleHTML;

    // Animate words appearing with decoded effect
    const words = heroSubtitle.querySelectorAll('.word');

    words.forEach((word, index) => {
      const delay = 1.5 + (index * 0.15);
      const charsInWord = word.querySelectorAll('.word-char');

      // Fade in the word container
      gsap.to(word, {
        opacity: 1,
        duration: 0.3,
        delay: delay,
        ease: 'power2.out'
      });

      // Stagger reveal each character with scramble
      charsInWord.forEach((charEl, charIndex) => {
        const originalChar = charEl.dataset.char;
        const charDelay = delay + (charIndex * 0.03);

        gsap.to(charEl, {
          opacity: 1,
          duration: 0.05,
          delay: charDelay,
          ease: 'power2.out',
          onComplete: () => {
            // NeonSign glow effect after reveal
            gsap.to(charEl, {
              textShadow: '0 0 10px var(--accent), 0 0 20px var(--accent)',
              color: 'var(--accent)',
              duration: 0.2,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(charEl, {
                  textShadow: 'none',
                  color: 'inherit',
                  duration: 0.4,
                  ease: 'power2.out'
                });
              }
            });
          }
        });
      });
    });

    // Floating animation for hero image
    gsap.to('.hero-image', {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });

    // Hero CTA animation
    gsap.to('.hero-cta', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 2.5,
      ease: 'power2.out'
    });
  }

  // =============================================
  // Scroll-triggered Animations
  // =============================================
  function initScrollAnimations() {
    // Fade in elements on scroll (skip cards that have their own stagger)
    const fadeElements = document.querySelectorAll('.fade-in:not(.project-card):not(.contact-link)');

    fadeElements.forEach(el => {
      gsap.fromTo(el,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: CONFIG.animation.fadeInDuration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: CONFIG.animation.scrollTriggerStart,
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    // Stagger animation for project cards
    gsap.fromTo('.project-card',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#projects',
          start: CONFIG.animation.scrollTriggerStart,
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Stagger animation for extra cards
    gsap.fromTo('.extra-card',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#skills',
          start: CONFIG.animation.scrollTriggerStart,
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Contact links stagger
    gsap.fromTo('.contact-link',
      {
        opacity: 0,
        scale: 0.9
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '#contact',
          start: CONFIG.animation.scrollTriggerStart,
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Navbar blur effect on scroll
    gsap.to('.navbar', {
      backgroundColor: 'rgba(15, 23, 42, 0.98)',
      backdropFilter: 'blur(16px)',
      scrollTrigger: {
        trigger: 'body',
        start: '100px top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // =============================================
  // Project Card Hover Effects
  // =============================================
  function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.25)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });
  }


  // =============================================
  // Copy Contact Info
  // =============================================
  function copyContactInfo() {
    const contactInfo = `Isaac Gesiman

GitHub: https://github.com/isaac-gesiman
Email: isaac.gesiman@email.com
Telefone: (84) 99708-4078`;

    navigator.clipboard.writeText(contactInfo).then(() => {
      showCopyFeedback();
    }).catch(err => {
      console.error('Erro ao copiar: ', err);
      // Fallback for older browsers
      fallbackCopyText(contactInfo);
    });
  }

  function showCopyFeedback() {
    const button = event.target.closest('.contact-link') || event.target;
    if (button.tagName === 'svg') {
      // If clicked on SVG, get parent button
      return;
    }

    const originalHTML = button.innerHTML;
    const originalStyle = button.getAttribute('style');

    // Visual feedback
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>Copiado!</span>
    `;
    button.style.background = 'var(--accent)';
    button.style.color = 'white';
    button.style.borderColor = 'var(--accent)';

    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.removeAttribute('style');
      if (originalStyle) {
        button.setAttribute('style', originalStyle);
      }
    }, 2500);
  }

  function fallbackCopyText(text) {
    // Create textarea for fallback copy
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Não foi possível copiar automaticamente. Por favor, copie manualmente:\n\n' + text);
    }

    document.body.removeChild(textarea);
  }

  // Make function globally available
  window.copyContactInfo = copyContactInfo;

  // =============================================
  // Smooth Scroll for Navigation
  // =============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          gsap.to(window, {
            scrollTo: {
              y: offsetPosition,
              autoKill: false
            },
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // =============================================
  // Initialize
  // =============================================
  function init() {
    // Wait for DOM and fonts to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initHeroAnimations();
        initScrollAnimations();
        initProjectCardEffects();
        initSmoothScroll();
      });
    } else {
      // Fonts loaded check
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          initHeroAnimations();
          initScrollAnimations();
          initProjectCardEffects();
          initSmoothScroll();
        });
      } else {
        // Fallback if fonts API not supported
        setTimeout(() => {
          initHeroAnimations();
          initScrollAnimations();
          initProjectCardEffects();
          initSmoothScroll();
        }, 100);
      }
    }

    // Handle page visibility for animations
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        ScrollTrigger.getAll().forEach(trigger => trigger.disable());
      } else {
        ScrollTrigger.getAll().forEach(trigger => trigger.enable());
      }
    });
  }

  // Run initialization
  init();

})();