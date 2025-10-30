import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'auto' }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // scroll to top on route change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior });
    }
  }, [pathname, behavior]);

  return null;
}
