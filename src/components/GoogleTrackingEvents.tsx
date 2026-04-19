'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleTrackingEventsProps {
  gaId?: string;
}

export default function GoogleTrackingEvents({
  gaId,
}: GoogleTrackingEventsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || typeof window.gtag !== 'function') {
      return;
    }

    const search = searchParams.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    window.gtag('config', gaId, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [gaId, pathname, searchParams]);

  useEffect(() => {
    const pushEvent = (eventName: string, eventLabel: string, destination?: string) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          event_category: 'engagement',
          event_label: eventLabel,
          destination,
          location_path: pathname,
        });
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          event_category: 'engagement',
          event_label: eventLabel,
          destination,
          location_path: pathname,
        });
      }
    };

    const classifyClick = (target: HTMLElement): { name: string; label: string } | null => {
      const href = (target as HTMLAnchorElement).href ?? '';
      if (!href) {
        return null;
      }

      if (href.startsWith('mailto:')) {
        return { name: 'mailto_click', label: 'primary_mailto' };
      }

      if (target.matches('header a[href="/contact"]')) {
        return { name: 'cta_contact_click', label: 'top_nav_contact' };
      }

      if (target.matches('nav a[href^="/"], header a[href="/"]')) {
        return {
          name: 'nav_click',
          label: target.textContent?.trim().toLowerCase() || target.getAttribute('href') || 'nav_link',
        };
      }

      if (pathname === '/works' && target.matches('a[href^="http"]')) {
        return { name: 'project_click', label: target.getAttribute('aria-label') || 'project_link' };
      }

      if (pathname === '/contact' && target.matches('a[href^="http"]')) {
        return { name: 'cta_contact_click', label: target.textContent?.trim().toLowerCase() || 'contact_link' };
      }

      return null;
    };

    const handleClick = (event: MouseEvent) => {
      const origin = event.target as HTMLElement | null;
      if (!origin) {
        return;
      }

      const anchor = origin.closest<HTMLElement>('a');
      if (!anchor) {
        return;
      }

      const classified = classifyClick(anchor);
      if (!classified) {
        return;
      }

      pushEvent(
        classified.name,
        classified.label,
        (anchor as HTMLAnchorElement).href ?? undefined,
      );
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}
