'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const check = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.active)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 60 && rect.bottom > 0) {
          el.classList.add('active');
        }
      });
    };

    // Run immediately for elements already in view
    check();

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    // Pick up elements added by client-side navigation
    const mo = new MutationObserver(check);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      mo.disconnect();
    };
  }, []);

  return null;
}
