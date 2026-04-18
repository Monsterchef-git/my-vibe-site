'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const revealAll = () => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
        element.classList.add('active');
      });
    };

    if (reducedMotionQuery.matches) {
      revealAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '60px 0px',
        threshold: 0.01,
      },
    );

    const revealInViewport = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.active)').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight + 60 && rect.bottom > -60) {
          element.classList.add('active');
          observer.unobserve(element);
        }
      });
    };

    const observePendingReveal = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.active)').forEach((element) => {
        observer.observe(element);
      });
    };

    observePendingReveal();
    revealInViewport();
    window.addEventListener('scroll', revealInViewport, { passive: true });
    window.addEventListener('resize', revealInViewport);

    const mutationObserver = new MutationObserver(() => {
      observePendingReveal();
      revealInViewport();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', revealInViewport);
      window.removeEventListener('resize', revealInViewport);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
