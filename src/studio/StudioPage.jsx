/**
 * Sanity Studio Page
 *
 * This component renders the Sanity Studio interface at /admin route
 */

import { useEffect, useRef } from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

export default function StudioPage() {
  const studioRef = useRef(null);

  useEffect(() => {
    // Sanity Studio needs to mount once
    // The Studio component will handle its own rendering
  }, []);

  return (
    <div ref={studioRef} style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  );
}
